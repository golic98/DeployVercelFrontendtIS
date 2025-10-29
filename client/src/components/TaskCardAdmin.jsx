import { useTask } from "../context/TaskContext";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useParams, Link } from "react-router";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import "./TaskCard.css";

function TaskCardAdmin({ task }) {

    const { setValue } = useForm();
    const { oneTask, deleteTask, updateTask } = useTask();
    const params = useParams();

    const handleReload = () => {
        window.location.reload();
    };

    useEffect(() => {
        async function loadTask() {
            if (params.id) {
                const task = await oneTask(params.id);
                console.log(task);
                setValue("title", task.title);
                setValue("description", task.description);
            }
        }
        loadTask();
    }, []);

    return (
        <div>
            <div className="task-card-container">
                <div className="card">
                    <h2>Titulo: {task.title}</h2>
                    <p>Descripción: {task.description}</p>
                    <p>Fecha de publicación: {new Date(task.date).toLocaleDateString()}</p>
                    <p>ID usuario: {task.user}</p>
                    <div className="imagen-card">
                        <img src={task.image} width={200} height={200} />
                    </div>
                    <div>
                        <button type="submit" onClick={() => { deleteTask(task._id)}}>
                            <MdDelete />
                        </button>
                        <Link to={`/task/${task._id}`}>
                            <MdModeEdit />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaskCardAdmin;