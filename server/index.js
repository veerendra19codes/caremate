const express = require("express");
const authRoutes = require("./routes/auth");
const todoRoutes = require("./routes/todo");
const userRoutes = require("./routes/user");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { authMiddleware } = require("./middleware");
const { User } = require("./models/user");
dotenv.config();
const Razorpay = require('razorpay');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');


const { Server } = require("socket.io");

const io = new Server(8000, {
    cors: true,
});

const emailToSocketIdMap = new Map();
const socketIdToEmailMap = new Map();

io.on("connection", (socket) => {
    console.log(`Socket connected:`, socket.id);

    socket.on("room:join" , (data) => {
        console.log("data: ", data);
        const { email, room } = data;

        emailToSocketIdMap.set(email, socket.id);
        socketIdToEmailMap.set(socket.id, email);

        io.to(room).emit("user:joined", {email, id:socket.id});
        socket.join(room);

        io.to(socket.id).emit("room:join", data);
    });

    socket.on("user:call", ({ to, offer }) => {
        io.to(to).emit("incoming:call", { from: socket.id, offer});
    })

    socket.on("call:accepted", ({ to, ans }) => {
        io.to(to).emit("call:accepted", { from: socket.id, ans});
    })

    socket.on("peer:nego:needed", ({ to, offer }) => {
        io.to(to).emit("peer:nego:needed",  { from : socket.id, offer})
    })

    socket.on("peer:nego:done", ({ to, ans}) => {
        io.to(to).emit("peer:nego:final", { from : socket.id, ans });
    })

})

const { validateWebhookSignature } = require('razorpay/dist/utils/razorpay-utils');

const app = express();

// Twilio setup
const accountSid = process.env.TWILIO_ACCOUT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN; 
const client = require('twilio')(accountSid, authToken);

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", authRoutes);
app.use("/api/todo", todoRoutes);
app.use("/api/user", authMiddleware, userRoutes);

// Serve static files
app.use(express.static(path.join(__dirname)));

// Razorpay instance initialization
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});

// POST: Verify Payment
app.post('/verify-payment', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  
  // Use Razorpay secret from environment variables
  const secret = process.env.RAZORPAY_SECRET;
  const body = razorpay_order_id + '|' + razorpay_payment_id;

  try {
    // Validate the signature using Razorpay's utility
    const isValidSignature = validateWebhookSignature(body, razorpay_signature, secret);
    if (isValidSignature) {
      // Update the order with payment details
      const orders = readData();
      const order = orders.find(o => o.order_id === razorpay_order_id);
      if (order) {
        order.status = 'paid';
        order.payment_id = razorpay_payment_id;
        writeData(orders);
      }
      res.status(200).json({ status: 'ok' });
      console.log("Payment verification successful");
    } else {
      res.status(400).json({ status: 'verification_failed' });
      console.log("Payment verification failed");
    }
 } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Error verifying payment' });
  }
});

// POST: Create Order
app.post('/create-order', async (req, res) => {
  try {
    const { amount, currency, receipt, notes } = req.body;

    // Options for the Razorpay order creation
    const options = {
      amount: amount * 100, // Amount in the smallest currency unit
      currency: currency,
      receipt: receipt,
      notes: notes,
    };

    // Create a new order
    const order = await razorpay.orders.create(options);

    // Read currently existing orders, add new order, and write back to the file
    const orders = readData();
    orders.push({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      status: 'created'
    });
    writeData(orders);
  res.json(order); // Send the created order in response
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// GET: Payment Success Page
app.get('/payment-success', (req, res) => {
  res.sendFile(path.join(__dirname, 'success.html')); // Corrected the path
});

// Function to read data from the JSON file
const readData = () => {
  if (fs.existsSync('orders.json')) {
    const data = fs.readFileSync('orders.json');
    return JSON.parse(data);
  } else {
    return [];
  }
};

// Function to write data to the JSON file
const writeData = (data) => {
  fs.writeFileSync('orders.json', JSON.stringify(data, null, 2));
};

// Initialize orders.json if it doesn't exist
if (!fs.existsSync('orders.json')) {
  writeData([]);
}


app.get("/api/findCaretaker", async (req, res) => {
    console.log("helo")
    const { id } = await req.body;
    console.log("id of caretaker: ", id);
    const user = await User.findOne({ _id: id });
    console.log("user: ", user);
    return res.status(200).json(user);
})

// API to handle the SOS request
app.post('/api/send-sos', (req, res) => {
  const emergencyPhoneNumber =  process.env.EMERGENCY_NUMBER// Replace with actual family number
  
  client.messages
    .create({
      body: 'Emergency! SOS Alert sent from the SOS App.',
      from: process.env.FROM_NUMBER, // Replace with your Twilio number
      to: emergencyPhoneNumber
    })
    .then(message => {
      console.log('SOS sent:', message.sid);
      res.json({ success: true });
    })
    .catch(error => {
      console.error('Error sending SMS:', error);
      res.json({ success: false });
    });
});



mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("connected to db"))
.catch((err) => console.log("error in connecting to db: ", err))

app.get("/", (req, res) => {
  res.send("helo world")
})

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log("server listening at port 3001")
})