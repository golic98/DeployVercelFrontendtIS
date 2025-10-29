import { MdDelete, MdModeEdit } from "react-icons/md";
import Popup from "reactjs-popup";
import TableCard from "./TableRow";
import TableView from "./TableView";
import UpadteTaskForm from "../forms/UpdateTaskForm";
import { useState } from "react";
import { useTask } from "../../context/TaskContext";

export default function TaskTable({ tasks }) {
    const { deleteTask2 } = useTask();
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
                    <TableCard key={i.id}>
                        <h2 className="text-[1.5rem] text-dark-gray font-bold">{i.title2}</h2>
                        <p className="text-[1rem] text-light-gray">{i.description2}</p>
                        <p className="text-[1rem] text-light-gray">Publicado: {new Date(i.date).toLocaleDateString()}</p>
                        <p className="text-[1rem] text-light-gray">ID usuario: {i.user}</p>
                        <img className="" src={i.image} alt="Task Image" />
                        <span className="flex flex-row gap-16 justify-evenly">
                            <button className="bg-custom-red text-white py-11 px-16 rounded-[8px]
                        cursor-pointer text-[1rem] font-bold gap-8 duration-300 ease-in-out mt-16
                        hover:bg-dark-red"
                                onClick={() => { deleteTask2(i._id), window.location.reload(); }}>
                                <MdDelete />
                            </button>
                            <button className="bg-custom-blue text-white py-11 px-16 rounded-[8px]
                        cursor-pointer text-[1rem] font-bold gap-8 duration-300 ease-in-out mt-16
                        hover:bg-dark-blue"
                                onClick={() => { editTask(i) }}>
                                <MdModeEdit />
                            </button>

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