import "./TaskCard.css";

function TaskCard({task}) {
    return (
        <div className="task-card-container">
            <div className="card">
                <h2>Titulo: {task.title}</h2>
                <p>Descripción: {task.description}</p>
                <p>Fecha de publicación: {new Date(task.date).toLocaleDateString()}</p>
                <p>ID usuario: {task.user}</p>
                <div className="imagen-card">
                    <img src={task.image} width={200} height={200} />
                </div>
            </div>
        </div>
    )
}

export default TaskCard;