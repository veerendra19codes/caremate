const models = require("../models/user"); 
const Task = models.Task;

const todoPostController = async (req, res) => {
    const userId = req.userId;
    console.log("userId: ", userId);

    const { name, description, deadline, category } = await req.body;
    console.log("name: ", name);

    try {
        // Create a new task using the Task model
        const newTask = await Task.create({
            name,
            description,
            deadline,
            category,
            authorId: userId
        });

        // Save the task to the database
        const savedTask = await newTask.save();

        // Respond with the created task
        res.status(201).json(savedTask);
    } catch (error) {
        console.error("Error adding task:", error);
        res.status(500).send("Server Error");
    }
}

const todoGetIncompleteController =  async (req, res) => {
    try {
        const userId = req.userId;
        console.log("userId: ", userId);
        const tasks = await Task.find({authorId: userId, status:false})
        console.log("tasks: ", tasks);

        res.json({ tasks });
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).send("Server Error");
    }
}

const todoGetCompleteController =  async (req, res) => {
    try {
        const userId = req.userId;
        console.log("userId: ", userId);
        const tasks = await Task.find({authorId: userId, status:true})
        // console.log("tasks: ", tasks);

        res.json({ tasks });
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).send("Server Error");
    }
}

const todoPutController = async (req, res) => {
    console.log("helo")
    const userId = req.userId;
    console.log("userId: ", userId);

    const { task } = await req.body;
    console.log("task: ", task);

    try {
       
        const updatedTask = await Task.findByIdAndUpdate({
            _id: task._id
        }, {
            $set: {
                status: true,
            }
        })
        console.log("updatedTask: ", updatedTask);


        // Respond with the created task
        return res.status(201).json(updatedTask);
    } catch (error) {
        console.error("Error adding task:", error);
        res.status(500).send("Server Error");
    }
}

const todoPutEditController = async (req, res) => {
    console.log("hello")
}

module.exports = {todoPostController, todoGetIncompleteController, todoPutController, todoGetCompleteController, todoPutEditController};