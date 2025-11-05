import Popup from "reactjs-popup";
import TableCard from "./TableRow";
import TableView from "./TableView";
import UpadteTaskForm from "../forms/UpdateTaskForm";
import { useState } from "react";

export default function TaskTableUserNormal({ tasks }) {
    const [editing, editTask] = useState();
    const closePopup = () => editTask(null);

    const fields = {
        title: { width: 300 },
        desc: { width: 300 },
        date: { width: 300 },
        user: { width: 300 },
        image: { width: 300 },
        delete: { width: 50 }
    };

    return (
        <>
            <TableView fields={fields}>
                {tasks.map(i =>
                    <TableCard key={i._id}>
                        <h2 className="text-[1.5rem] text-dark-gray font-bold">{i.title2}</h2>
                        <p className="text-[1rem] text-light-gray">{i.description2}</p>
                        <p className="text-[1rem] text-light-gray">Publicado: {new Date(i.date2).toLocaleDateString()}</p>
                        <p className="text-[1rem] text-light-gray">ID usuario: {i.user}</p>
                        <img className="" src={i.image} alt="Task Image" />
                        <span className="flex flex-row gap-16 justify-evenly">
                        </span>
                    </TableCard>
                )}
            </TableView>
            <Popup open={editing != null} onClose={closePopup} lockScroll={true} position="top center" closeOnDocumentClick={false} modal={true}
                overlayStyle={{ background: 'rgba(0,0,0,0.5)' }} contentStyle={{ maxHeight: '95%', overflow: 'auto' }}>
                <UpadteTaskForm task={editing} close={closePopup} />
            </Popup>
        </>

    );
}