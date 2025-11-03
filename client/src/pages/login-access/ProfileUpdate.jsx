import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { useAuth } from "../../context/AuthContext";
import bcrypt from "bcryptjs";
import assets from "../../../src/assets";
import Swal from "sweetalert2";
import "./ProfileUpdate.css";

export default function ProfileUpdate() {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const { getOneProfile, updateProfile } = useAuth();
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function loadProfile() {
            if (params.id) {
                const profile = await getOneProfile(params.id);
                setValue("name", profile.name);
                setValue("username", profile.username);
                setValue("email", profile.email);
                setValue("password", profile.password);
                setValue("telephone", profile.telephone);
                setValue("age", profile.age);
            }
        }
        loadProfile();
    }, [params.id, setValue, getOneProfile]);

    const onSubmit = handleSubmit(async (data) => {
        const payload = { ...data };

        if (!payload.password || payload.password.trim() === "") {
            delete payload.password;
        }

        if (params.id) {
            await updateProfile(params.id, payload);
            Swal.fire({
                title: '¡Perfil actualizado!',
                text: 'Tus datos han sido actualizados correctamente.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                navigate("/profile");
            });
        }
    });

    return (
        <div>
            <div>
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
            <div>
                <form onSubmit={onSubmit}>
                    <input type="text" {...register("name", { required: true })}
                        className=""
                        placeholder="Nombre nuevo"
                    />
                    <input type="text" {...register("username", { required: true })}
                        className=""
                        placeholder="Usuario nuevo"
                    />
                    <input type="email" {...register("email", { required: true })}
                        className=""
                        placeholder="Correo nuevo"
                    />
                    <input type="password" {...register("password", { required: true })}
                        className=""
                        placeholder="Contraseña nueva"
                    />
                    <input type="text" {...register("telephone", { required: true })}
                        className=""
                        placeholder="Teléfono actualizado"
                    />
                    <input type="number" {...register("age", { required: true })}
                        placeholder="Edad actualizada"
                    />
                    <button type="submit">Actualizar datos</button>
                </form>
            </div>
        </div>
    )
};
