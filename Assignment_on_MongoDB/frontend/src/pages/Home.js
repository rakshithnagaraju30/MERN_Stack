import { useState, useEffect} from "react";
import "../styles/Home.css";

function Home() {

    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const getTasks = async () => {
            try {
                const response = await fetch("http://localhost:4000/api/tasks");

                if (!response.ok) {
                    throw new Error("Failed to fetch tasks");
                }

                const data = await response.json();
                setTasks(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getTasks();
    }, []);

    // Add a new task
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("http://localhost:4000/api/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title,
                    description
                })
            });

            if (!response.ok) {
                throw new Error("Failed to add task");
            }

            const newTask = await response.json();

            setTasks((prevTasks) => [newTask, ...prevTasks]);

            setTitle("");
            setDescription("");
        } catch (err) {
            setError(err.message);
        }
    };

    const handleSave = (id) => {
        const updateTask =  async (updatedTitle, updatedDescription ) => {
        try {
                const response = await fetch(`http://localhost:4000/api/tasks/${id}`,
                    {
                        method: "PUT",
                        headers: {
                        "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                        updatedTitle,
                        updatedDescription
                        })
                    }
                );
                if (!response.ok) {
                         throw new Error("Failed to add task");
                }

                const updatedTask = await response.json();
                setTasks((prevTasks) => [updatedTask, ...prevTasks]);

        } catch {}
    }
    updateTask( title, description );
    setIsEditing(false);
    };

    
    // Delete task
    const deleteTask = async (id) => {
        try {
            const response = await fetch(
                `http://localhost:4000/api/tasks/${id}`,
                {
                    method: "DELETE"
                }
            );

            if (!response.ok) {
                throw new Error("Failed to delete task");
            }

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
                    required
                />

                <button type="submit">Add Task</button>
            </form>

            {error && <p className="message error">{error}</p>}

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
                        <div className="task-card" key={task._id}>
                            {/* <span className="edit-button" onClick={() => setIsEditing(!isEditing)}>
                                    {isEditing ? "done" : "edit"}
                                </span> */}

                                <h3>
                                    {task.title}    
                                </h3>

                                <p>
                                    {task.description}
                                </p>
                            <span
                                className="material-symbols-outlined"
                                onClick={() => deleteTask(task._id)}
                            >
                                delete
                            </span>  
                        
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}


export default Home;

