import Popup from "reactjs-popup";
import TaskTable from "../../components/tables/TaskTable";
import assets from "../../assets";
import CreateTaskForm from "../../components/forms/CreateTaskForm";
import { useTask } from "../../context/TaskContext";
import { useEffect } from "react";
import CreateButton from "../../components/CreateButton";

export default function AdminTaskView() {

    const { tasksAdmin2, getTaskAdmin2 } = useTask();
    useEffect(() => {
        getTaskAdmin2();
    }, []);

    return (
        <div className="flex grow-1 flex-col justify-start items-center p-16 w-full h-content box-border">
            <div className="flex justify-center items-center my-16 mx-auto p-16 bg-dark-green w-3/5 rounded-lg shadow-md">
                <h2 className="font-sans text-[1.75rem] font-bold text-white m-0 text-center">Lista de anuncios</h2>
            </div>
            <Popup trigger={<button><CreateButton text="Crear Anuncio" /></button>} lockScroll={true}
                position="top center" closeOnDocumentClick={false} modal={true} overlayStyle={{ background: 'rgba(0,0,0,0.5)' }}
                contentStyle={{ maxHeight: '95%', overflow: 'auto' }}>
                {close => <CreateTaskForm close={close} />}
            </Popup>
            <TaskTable tasks={tasksAdmin2} />

        </div>
    );
}