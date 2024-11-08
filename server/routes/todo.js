const express = require("express");// Make sure your Task model is defined in models/user
const { todoGetIncompleteController, todoPostController, todoPutController, todoGetCompleteController, todoCompleteEditController} = require("../controllers/todo");
const { authMiddleware } = require("../middleware");
const router = express.Router();

// GET /api/tasks - Fetch all tasks for the user
router.get("/tasks/incomplete",authMiddleware, todoGetIncompleteController);
router.get("/tasks/complete",authMiddleware, todoGetCompleteController);

// POST /api/tasks - Add a new task
router.post("/tasks",authMiddleware, todoPostController);

router.put("/edit",authMiddleware, todoCompleteEditController);
router.put("/edit/status",authMiddleware, todoPutController);

module.exports = router;
