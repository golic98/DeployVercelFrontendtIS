import { Link } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import { useTask } from "../../context/TaskContext";
import { useEffect, useState } from "react";
import TaskCard from "../../components/TaskCard.jsx";
import assets from "../../../src/assets";
import "./LoginAccess.css";

function UserReport() {

    const { register, handleSubmit, setValue } = useForm();
    const { createTask, getTaskAdmin, tasksAdmin } = useTask();
    const { logout, user } = useAuth();
    const [imageBase64, setImageBase64] = useState("");
    const [imageError, setImageError] = useState("");

    useEffect(() => {
        getTaskAdmin();
    }, []);

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

    const onSubmit = handleSubmit((data) => {
        if (imageBase64) {
            const formData = { ...data, image: imageBase64 };
            createTask(formData);
        } else {
            setImageError("La imagen no es válida o no se ha seleccionado ninguna.");
        }
    });

    const handleReload = () => {
        window.location.reload();
    };

    function toggleMenu() {
        setMenuOpen(!menuOpen);
    }

    return (
        <div>
            <div className="header-login-access">
                <nav className="user-home-navbar">
                    <div className="user-home-navbar-left">
                        <Link>
                            
                        </Link>
                    </div>
                    <div className="user-home-navbar-right">
                        <Link to="/user">
                            <img
                                src={assets.casa}
                                alt="Inicio"
                                className="user-home-icono"
                            />
                        </Link>
                        <div className="user-home-dropdown">
                            <Link to="/profile">
                                <img
                                    src={assets.usuario1}
                                    alt="Usuario"
                                    className="user-home-icono-usuario"
                                />
                            </Link>
                        </div>
                    </div>
                </nav>
            </div>
            <br />
            <div className="add-topic">
                <form onSubmit={onSubmit}>
                    <div>
                        <input
                            type="text"
                            placeholder="Ingrese el titulo de su reporte"
                            {...register("title")}
                            autoFocus
                        />
                    </div>
                    <div>
                        <textarea
                            rows={3}
                            placeholder="Descripción"
                            {...register("description")}
                        ></textarea>
                    </div>
                    <div>
                        <input
                            type="file"
                            onChange={handleImageChange}
                        />
                        {imageError && <p style={{ color: "red" }}>{imageError}</p>} { }
                    </div>
                    <button type="submit">Publicar</button>
                </form>
            </div>
            <div>
                {
                    tasksAdmin.map(task => (<TaskCard task={task} key={task._id} />))
                }
            </div>
        </div>
    )
}

export default UserReport;