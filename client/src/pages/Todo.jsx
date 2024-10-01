import axios from 'axios';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function TodoList() {
    const navigate = useNavigate();

    const [incompletetasks, setIncompletetasks] = useState([]);
    const [completetasks, setCompletetasks] = useState([]);

    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskDeadline, setTaskDeadline] = useState('');
    const [taskCategory, setTaskCategory] = useState('');
    const [showCompleted, setShowCompleted] = useState(false);
    const [editingTask, setEditingTask] = useState({});

    function convertISOToDate(isoDateStr) {
        const date = new Date(isoDateStr);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();

        return `${year}-${month}-${day}`;
    }

    //getting data from backend
    const fetchIncompleteTasks = async () => {
        try {
            const token = localStorage.getItem("usertoken");
            console.log("token: ", token);

            const apiUrl = import.meta.env.VITE_BACKEND_URL;
            const response = await axios({
                url: `${apiUrl}/api/todo/tasks/incomplete`,
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + token,
                }
            });
            console.log("response: ", response);
            setIncompletetasks(response.data.tasks);
            // Update the endpoint based on your backend
            // const data = await response.json();
            // setIncompletetasks(data.tasks);
            console.log("added through backend")
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    //getting data from backend
    const fetchCompleteTasks = async () => {
        try {
            const token = localStorage.getItem("usertoken");
            console.log("token: ", token);

            const apiUrl = import.meta.env.VITE_BACKEND_URL;
            const response = await axios({
                url: `${apiUrl}/api/todo/tasks/complete`,
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + token,
                }
            });
            console.log("response: ", response);
            setCompletetasks(response.data.tasks);
            // Update the endpoint based on your backend
            // const data = await response.json();
            // setIncompletetasks(data.tasks);
            console.log("added through backend")
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    useEffect(() => {
        fetchCompleteTasks();
        fetchIncompleteTasks();
    }, []);


    // Toggle completion status
    const toggleTaskCompletion = (task) => {
        try {
            const apiUrl = import.meta.env.VITE_BACKEND_URL;
            const token = localStorage.getItem("usertoken");

            const res = axios({
                url: `${apiUrl}/api/todo/edit/status`,
                method: "PUT",
                data: {
                    task
                },
                headers: {
                    "Authorization": "Bearer " + token
                }
            })
            console.log("res: ", res);
            fetchCompleteTasks();
            fetchIncompleteTasks();
        } catch (error) {
            console.log("error in completing a task: ", error);
        }
    };

    // Start editing task
    const startEditing = (task) => {
        setEditingTask(task);
        setTaskName(task.name);
        setTaskDescription(task.description);
        setTaskDeadline(task.deadline);
        setTaskCategory(task.category);
    };

    // Save edited task
    const saveEdit = async () => {

        if (editingTask) {

            console.log("editingTask: ", editingTask);

            const token = localStorage.getItem("usertoken");

            const apiUrl = import.meta.env.VITE_BACKEND_URL;
            const res = await axios({
                url: `${apiUrl}/api/todo/edit`,
                method: 'PUT',
                data: {
                    _id: editingTask._id,
                    name: editingTask.name,
                    description: editingTask.description,
                    category: editingTask.category,
                    status: editingTask.status,
                    deadline: convertISOToDate(editingTask.deadline),
                },
                headers: {
                    "Authorization": "Bearer " + token
                }
            })

            console.log("res: ", res);
            setEditingTask({});
            fetchIncompleteTasks();
            // resetForm();
        }
    };

    // Reset form inputs
    const resetForm = () => {
        setTaskName('');
        setTaskDescription('');
        setTaskDeadline('');
        setTaskCategory('');
    };



    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8">
            <div className="max-w-6xl mx-auto space-y-4 md:space-y-8">

                {/* Toggle between active and completed tasks */}
                <div className="bg-white shadow-lg rounded-lg p-4">
                    <div className="flex justify-between">
                        <div>
                            <button
                                onClick={() => setShowCompleted(false)}
                                className={`py - 2 px-4 rounded-md ${!showCompleted ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                            >
                                Active Tasks
                            </button>
                            <button
                                onClick={() => setShowCompleted(true)}
                                className={`py - 2 px-4 rounded-md ${showCompleted ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                            >
                                Completed Tasks
                            </button>
                        </div>
                        <button
                            onClick={() => navigate('/add-task')}
                            className="py-2 px-4 bg-green-500 text-white rounded-md"
                        >
                            Add New Task
                        </button>
                    </div>
                </div>

                {/* Task list */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {(showCompleted ? completetasks : incompletetasks).map((task) => (
                        <div key={task._id} className="bg-white shadow-lg rounded-lg">
                            <div className="p-4">
                                {editingTask && editingTask._id === task._id ? (
                                    <div className="space-y-4">
                                        {/* Editable inputs for name, description, deadline, and category */}
                                        <input
                                            value={taskName}
                                            onChange={(e) => setTaskName(e.target.value)}
                                            placeholder="Task Name"
                                            className="w-full p-2 border rounded"
                                        />
                                        <textarea
                                            value={taskDescription}
                                            onChange={(e) => setTaskDescription(e.target.value)}
                                            placeholder="Task Description"
                                            className="w-full p-2 border rounded"
                                        />
                                        <input
                                            type="date"
                                            value={convertISOToDate(taskDeadline)}
                                            onChange={(e) => setTaskDeadline(e.target.value)}
                                            className="w-full p-2 border rounded"
                                        />
                                        <input
                                            value={taskCategory}
                                            onChange={(e) => setTaskCategory(e.target.value)}
                                            placeholder="Task Category"
                                            className="w-full p-2 border rounded"
                                        />
                                        <button onClick={saveEdit} className="py-2 px-4 bg-blue-500 text-white rounded">Save</button>
                                    </div>
                                ) : (
                                    <div className="flex justify-between">
                                        <div>
                                            <input
                                                type="checkbox"
                                                checked={task.completed}
                                                onChange={() => toggleTaskCompletion(task)}
                                                className="mr-2"
                                            />
                                            <span className={`${task.completed ? 'line-through text-gray-500' : ''}`}>{task.name}</span>
                                        </div>
                                        <div className="text-sm">
                                            <p>Deadline: {convertISOToDate(task.deadline)}</p>
                                            <p>Category: {task.category}</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Task action buttons */}
                            < div className="flex justify-end p-2 bg-gray-50 space-x-2" >
                                <button onClick={() => startEditing(task)} className="py-1 px-2 bg-yellow-500 text-white rounded">
                                    Edit
                                </button>
                                <button onClick={() => deleteTask(task.id)} className="py-1 px-2 bg-red-500 text-white rounded">
                                    Delete
                                </button>
                            </div>
                        </div >
                    ))
                    }
                </div >
            </div >
        </div >
    );
}