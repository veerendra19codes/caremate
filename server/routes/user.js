const express = require("express");
const { userProfilePostController } = require("../controllers/user");
const { User } = require("../models/user");
// const multer = require("multer")

const profileImageUrls =[
    "https://randomuser.me/api/portraits/men/1.jpg",
    "https://randomuser.me/api/portraits/women/1.jpg",
    "https://randomuser.me/api/portraits/men/2.jpg",
    "https://randomuser.me/api/portraits/women/2.jpg",
    "https://randomuser.me/api/portraits/men/3.jpg",
    "https://randomuser.me/api/portraits/women/3.jpg",
    "https://randomuser.me/api/portraits/men/4.jpg",
    "https://randomuser.me/api/portraits/women/4.jpg",
    "https://randomuser.me/api/portraits/men/5.jpg",
    "https://randomuser.me/api/portraits/women/5.jpg"
]
const getRandomProfileImageUrl = () => {
    const randomIndex = Math.floor(Math.random() * profileImageUrls.length);
    return profileImageUrls[randomIndex];
};

const router = express.Router();

// const imgConfig = multer.diskStorage({
//     destination: (req, file, callback) => {
//         callback(null, "./uploads");
//     },
//     filename: (req, file, callback) => {
//         callback(null, `image-${Date.now()}.${file.originalname}`);
//     },
// });

// img filter to check if user sent image or something else like pdf, word, or something
// const isImage = (req, file, callback) => {
//     if (file.mimetype.startsWith("image")) {
//         callback(null, true);
//     } else {
//         callback(new Error("only image is allowed"));
//     }
// };

// const upload = multer({
//     storage: imgConfig,
//     fileFilter: isImage,
// });

router.put("/profile/client", async (req, res) => {
    console.log("hello in put")
    
    const {name, phoneNumber, address, city, guardianName, guardianPhoneNumber, guardianAddress, guardianCity} =  req.body; // Extracting fields to update
    const profileImageUrl = getRandomProfileImageUrl();
    
    console.log("name: ", name);
    console.log("body:", req.body);
    // try {
    //     // Find the user by ID and update the fields
    //     const updatedUser = await User.findOneAndUpdate({firstName:name}, {
    //         surname,
    //         gender,
    //         age,
    //         phoneNumber,
    //         address,
    //         profileImageUrl, 
    //         lat,
    //         lon
    //         // Update the profile image URL from your libs folder
    //     }); // Return the updated user

    //     if (!updatedUser) {
    //         return res.status(404).json({ message: 'User not found' });
    //     }
    //     console.log("updateduser: ", updatedUser);

    //     // Send the updated user details in the response
    //     res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ message: 'Server error', error: error.message });
    // }

    return res.status(200).json({message:"updated successfully"})
});


router.get("/", async (req, res) => {
    try {
        const userId = await req.userId;

        const user = await User.findById({_id: userId});
        return res.status(200).json(user);
    } catch (error) {
        console.log("error in getting user details: ", error);
    }
})

router.get("/caretakers", async (req, res) => {
    try {
        const caretakers = await User.find({ role: "caretaker"});
         if (caretakers.length === 0) {
            return res.status(404).json({ message: "No caretakers found" });
        }
        // console.log("Caretakers: ", caretakers);
        return res.status(200).json(caretakers);
    } catch (error) {
        console.log("error in getting caretakers: ", error);
    }
})

router.put("/bookCareTaker", async (req, res) => {
    const id = await req.body;
    console.log("id: ", id);
    try {
        const response = await User.findByIdAndUpdate({_id: req.userId}, {caretaker: id.id});
        console.log("response: ", response);
        return res.status(200).json(response);
    } catch (error) {
        console.log("error in booking caretaker: ", error);
    }
})

module.exports = router;