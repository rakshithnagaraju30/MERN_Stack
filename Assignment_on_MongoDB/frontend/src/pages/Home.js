import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Home.css";

function Home() {

    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isEditing, setIsEditing] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [search, setSearch] = useState("");

    //API urls
    // const DEPLOYED_API = "https://todolistapp-3wft.onrender.com";
    const LOCAL_API = "http://localhost:4000";
    useEffect(() => {
        const getTasks = async () => {
            try {
                const response = await axios.get(
                    `${LOCAL_API}/api/tasks`
                );

                setTasks(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getTasks();
    }, []);

    // Search tasks
    const searchTasks = async (search) => {
        setSearch(search);
        setError("");

        try {
            const response = await axios.get(
                `${LOCAL_API}/api/tasks/search?q=${encodeURIComponent(search)}`
            );

            setTasks(response.data);
        } catch (err) {
            setError(err.message);
        }
    };
    // Add a new task
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post(
                `${LOCAL_API}/api/tasks`,
                {
                    title,
                    description
                }
            );

            const newTask = response.data;

            setTasks((prevTasks) => [newTask, ...prevTasks]);

            setTitle("");
            setDescription("");
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDescriptionKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            e.currentTarget.form.requestSubmit();
        }
    };

    const handleEdit = (task) => {
        setIsEditing(task._id);
        setEditTitle(task.title);
        setEditDescription(task.description);
    };

    //update task
    const updateTask = async (id, title, description) => {
        try {
            const response = await axios.put(
                `${LOCAL_API}/api/tasks/${id}`,
                {
                    title,
                    description
                }
            );

            const updatedTask = response.data;

            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task._id === id ? updatedTask : task
                )
            );
            setIsEditing(null);
        } catch (err) {
            setError(err.message);
        }
    };

    // Delete task
    const deleteTask = async (id) => {
        try {
            await axios.delete(
                `${LOCAL_API}/api/tasks/${id}`
            );

            setTasks((prevTasks) =>
                prevTasks.filter((task) => task._id !== id)
            );

        } catch (err) {
            setError(err.message);
        }
    };


    return (
        <div className="home">
            <h1>To Do list</h1>

            {/* Add Task Form */}
            <form className="task-form" onSubmit={handleSubmit}>
                <h2>Add a New Task</h2>

                <input
                    type="text"
                    placeholder="Enter task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                <textarea
                    placeholder="Enter task description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    onKeyDown={handleDescriptionKeyDown}
                    required
                />

                <button type="submit">Add Task</button>
            </form>

            {error && <p className="message error">{error}</p>}

            {/* Search Tasks */}
            <input
                className="search-bar"
                type="text"
                placeholder="Search tasks..."
                value={search}
                onChange={(e) => searchTasks(e.target.value)}
            />


            {/* Display Tasks */}
            <h2 className="task-heading">My Tasks</h2>

            {loading && (
                <p className="message">Loading tasks...</p>
            )}

            {!loading && tasks.length === 0 && (
                <p className="message">No tasks found.</p>
            )}

            {!loading && tasks.length > 0 && (
                <div className="tasks-container">
                        {tasks.map((task) => (
    <div className="task-card">

    {isEditing === task._id ? (
        <>
            <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
            />

            <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
            />

            <div className="task-card-actions">
                <button
                    className="save-btn"
                    onClick={() =>
                        updateTask(
                            task._id,
                            editTitle,
                            editDescription
                        )
                    }
                >
                    Save
                </button>

                <button
                    className="cancel-btn"
                    onClick={() => setIsEditing(null)}
                >
                    Cancel
                </button>
            </div>
        </>
    ) : (
        <>
            <h3>{task.title}</h3>

            <p>{task.description}</p>

            <div className="task-card-actions">
                <button
                    className="edit-btn"
                    onClick={() => handleEdit(task)}
                >
                    Edit
                </button>

                <button
                    className="delete-btn"
                    onClick={() => deleteTask(task._id)}
                >
                    Delete
                </button>
            </div>
        </>
    )}

</div>  
))}
                </div>
            )}
        </div>
    );
}


export default Home;
