import { MdDelete, MdModeEdit } from "react-icons/md";
import Popup from "reactjs-popup";
import TableCard from "./TableRow";
import TableView from "./TableView";
import UpadteReportForm from "../forms/UpdateReportForm";
import { useState } from "react";
import { useTask } from "../../context/TaskContext";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

export default function ReportTable({ reports }) {
    const { deleteTask } = useTask();
    const [editing, editReport] = useState();
    const closePopup = () => editReport(null);
    const navigate = useNavigate();

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
                {reports.map(i =>
                    <TableCard key={i._id}>
                        <h2 className="text-[1.5rem] text-dark-gray font-bold">{i.title}</h2>
                        <p className="text-[1rem] text-light-gray">{i.description}</p>
                        <p className="text-[1rem] text-light-gray">Publicado: {new Date(i.date).toLocaleDateString()}</p>
                        <p className="text-[1rem] text-light-gray">ID usuario: {i.user}</p>
                        <img className="" src={i.image} alt="Report Image" />
                        <span className="flex flex-row gap-16 justify-evenly">
                            <button className="bg-custom-red text-white py-11 px-16 rounded-[8px]
                        cursor-pointer text-[1rem] font-bold gap-8 duration-300 ease-in-out mt-16
                        hover:bg-dark-red"
                                onClick={async () => {
                                    const confirm = await Swal.fire({
                                        title: "¿Eliminar publicación?",
                                        text: "Esta acción no se puede deshacer.",
                                        icon: "warning",
                                        showCancelButton: true,
                                        confirmButtonColor: "#d33",
                                        cancelButtonColor: "#3085d6",
                                        confirmButtonText: "Sí, eliminar",
                                        cancelButtonText: "Cancelar",
                                    });
                                    if (confirm.isConfirmed) {
                                        try {
                                            await deleteTask(i._id);
                                            await Swal.fire({
                                                title: "Eliminado",
                                                text: "La publicación se ha eliminado correctamente.",
                                                icon: "success",
                                                showConfirmButton: false,
                                                timer: 1500,
                                                timerProgressBar: true,
                                            });
                                            await new Promise((resolve) => setTimeout(resolve, 500));
                                            navigate("/admin");

                                        } catch (err) {
                                            console.error(err);
                                            Swal.fire({
                                                title: "Error",
                                                text: "Ocurrió un error al eliminar la publicación.",
                                                icon: "error",
                                                confirmButtonColor: "#d33",
                                            });
                                        }
                                    }
                                }}>
                                <MdDelete />
                            </button>
                            <button className="bg-custom-blue text-white py-11 px-16 rounded-[8px]
                        cursor-pointer text-[1rem] font-bold gap-8 duration-300 ease-in-out mt-16
                        hover:bg-dark-blue"
                                onClick={() => { editReport(i) }}>
                                <MdModeEdit />
                            </button>

                        </span>

                    </TableCard>
                )}
            </TableView>
            <Popup open={editing != null} onClose={closePopup} lockScroll={true} position="top center" closeOnDocumentClick={false} modal={true}
                overlayStyle={{ background: 'rgba(0,0,0,0.5)' }} contentStyle={{ maxHeight: '95%', overflow: 'auto' }}>
                <UpadteReportForm report={editing} close={closePopup} />
            </Popup>
        </>

    );
}