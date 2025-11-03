import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useTask } from "../../context/TaskContext";
import Swal from "sweetalert2";

export default function CreateReportForm({ close }) {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const { createTask } = useTask();
    const [imageBase64, setImageBase64] = useState("");
    const [imageError, setImageError] = useState("");
    const navigate = useNavigate();

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const validImageTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
            if (!validImageTypes.includes(file.type)) {
                setImageError("Por favor, selecciona un archivo de imagen válido, por ejemplo: JPG, PNG, GIF, WEBP.");
                setImageBase64("");
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageBase64(reader.result);
                setValue("image", reader.result);
                setImageError("");
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = async (data) => {
        if (imageBase64) {
            const formData = { ...data, image: imageBase64 };
            try {
                await createTask(formData);
                Swal.fire({
                    title: "¡Publicación creada!",
                    text: "Tu publicación se ha guardado correctamente.",
                    icon: "success",
                    confirmButtonColor: "#2563eb",
                    confirmButtonText: "Aceptar",
                    background: "#fefefe",
                    color: "#1e293b",
                    timer: 2000,
                    timerProgressBar: true,
                });
                await new Promise((resolve) => setTimeout(resolve, 800));
                navigate("/admin");
            } catch (err) {
                Swal.fire({
                    title: "Error",
                    text: "No se pudo crear la publicación.",
                    icon: "error",
                    confirmButtonColor: "#dc2626",
                });
            }
        } else {
            setImageError("La imagen no es válida o no se ha seleccionado ninguna.");
        }
    };

    return (
        <div className="flex flex-col items-stretch bg-white p-32 rounded-xl shadow-lg w-500 h-full">
            <header className="bg-dark-green p-16 rounded-xl mb-8 text-center shadow-lg">
                <h2 style={{ color: "white" }} className="m-0 text-center text-[1.5rem] text-white">Creación de Reporte</h2>
            </header>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 shadow-lg rounded-xl w-full my-8 mx-0 p-16 bf-white">
                <div className="flex flex-col gap-4">
                    <label htmlFor="title" className="text-[1rem] font-[600] text-dark-slate">Titulo</label>
                    <input type="text" {...register("title", { required: true })}
                        className="p-12 border border-mid-gray rounded-lg font-[1rem]"
                        placeholder="Ingrese el titulo de su reporte"
                    />
                    {
                        errors.name && (<p className="text-red text-[0.8rem]">El titulo es requerido</p>)
                    }
                </div>
                <div className="flex flex-col gap-4">
                    <label htmlFor="description" className="text-[1rem] font-[600] text-dark-slate">Descripcion</label>
                    <textarea type="text" {...register("description")}
                        className="p-12 border border-mid-gray rounded-lg font-[1rem]"
                        placeholder="Ingrese la descripcion de su reporte"
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <label htmlFor="image" className="text-[1rem] font-[600] text-dark-slate">Imagen</label>
                    <input type="file" name="image" onChange={handleImageChange}
                        className="p-12 border border-mid-gray rounded-lg font-[1rem] cursor-pointer hover:bg-mid-gray"
                    />
                    {
                        imageError && (<p className="text-red text-[0.8rem]">{imageError}</p>)
                    }
                </div>

                <div className="flex justify-between gap-16 mt-8">
                    <button
                        type="button"
                        className="bg-custom-gray text-dark-gray py-12 px-16 border-none rounded-md
                        duration-300 ease-in-out cursor-pointer text-[1rem] hover:bg-mid-gray"
                        onClick={() => close()}>
                        Cancelar
                    </button>
                    <button type="submit" className="bg-dark-slate text-white py-12 px-16 border-none
                    duration-300 ease-in-out rounded-md cursor-pointer text-[1rem] hover:bg-custom-slate">
                        Publicar
                    </button>
                </div>
            </form>
        </div>
    );
}