import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Component() {
    const navigate = useNavigate();
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskDeadline, setTaskDeadline] = useState('');
    const [taskCategory, setTaskCategory] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("usertoken");

            const apiUrl = import.meta.env.VITE_BACKEND_URL;
            const response = await axios({
                url: `${apiUrl}/api/todo/tasks`,
                method: 'POST',
                headers: {
                    "Authorization": "Bearer " + token
                },
                data: {
                    name: taskName,
                    description: taskDescription,
                    deadline: taskDeadline,
                    category: taskCategory,
                }
            });
            console.log("response");

            if (response.status == 201) {
                console.log("response: ", response);
                navigate("/todo")
                // Reset form fields after successful submission
                setTaskName('');
                setTaskDescription('');
                setTaskDeadline('');
                setTaskCategory('');

            } else {
                // const errorData = await response.json();
                console.log("response: ", response);
                // console.error('Error:', errorData.message);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };


    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Add New Task</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="taskName">
                            Task Name *
                        </label>
                        <input
                            className="w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            id="taskName"
                            type="text"
                            placeholder="Enter task name"
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="taskDescription">
                            Task Description (optional)
                        </label>
                        <textarea
                            className="w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            id="taskDescription"
                            placeholder="Enter task description"
                            rows={4}
                            value={taskDescription}
                            onChange={(e) => setTaskDescription(e.target.value)}
                        ></textarea>
                    </div>

                    <div className="mb-4">
                        <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="taskDeadline">
                            Task Deadline (optional)
                        </label>
                        <input
                            className="w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            id="taskDeadline"
                            type="date"
                            value={taskDeadline}
                            onChange={(e) => setTaskDeadline(e.target.value)}
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="taskCategory">
                            Category
                        </label>
                        <select
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            id="taskCategory"
                            value={taskCategory}
                            onChange={(e) => setTaskCategory(e.target.value)}
                        >
                            <option value="">Select a category</option>
                            <option value="work">Work</option>
                            <option value="personal">Personal</option>
                            <option value="shopping">Shopping</option>
                        </select>
                    </div>

                    <button
                        className="w-full bg-purple-500 text-white font-bold py-2 px-4 rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                        type="submit"
                    >
                        Add Task
                    </button>
                </form>
            </div>
        </div>
    )
}