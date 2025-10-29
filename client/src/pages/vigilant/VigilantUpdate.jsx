import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { useAuth } from "../../context/AuthContext";
import bcrypt from "bcryptjs";
import "./VigilantUpdate.css";
import assets from "../../../src/assets";

export default function VigilantUpdate() {

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
    }, []);

    const onSubmit = handleSubmit((data) => {
        if (data.password) {
            const salt = bcrypt.genSaltSync(10);
            data.password = bcrypt.hashSync(data.password, salt);
        }
        if (params.id) {
            updateProfile(params.id, data);
            navigate("/profileVigilant");
        }
    });

    return (
        <div className="vigilant-update-container">
            {/* Header */}
            <header className="vigilant-update-header">
                <div></div>
                <Link to="/vigilant">
                    <img src={assets.casa} alt="Inicio" className="menu-icon" />
                </Link>
            </header>

            {/* Form Section */}
            <form onSubmit={onSubmit} className="vigilant-update-form">
                <div className="form-group">
                    <label htmlFor="name">Nombre</label>
                    <input
                        id="name"
                        type="text"
                        {...register("name", { required: true })}
                        placeholder="Nombre nuevo"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="username">Usuario</label>
                    <input
                        id="username"
                        type="text"
                        {...register("username", { required: true })}
                        placeholder="Usuario nuevo"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Correo</label>
                    <input
                        id="email"
                        type="email"
                        {...register("email", { required: true })}
                        placeholder="Correo nuevo"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input
                        id="password"
                        type="password"
                        {...register("password", { required: true })}
                        placeholder="Contraseña nueva"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="telephone">Teléfono</label>
                    <input
                        id="telephone"
                        type="text"
                        {...register("telephone", { required: true })}
                        placeholder="Teléfono actualizado"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="age">Edad</label>
                    <input
                        id="age"
                        type="number"
                        {...register("age", { required: true })}
                        placeholder="Edad actualizada"
                    />
                </div>
                <button type="submit" className="submit-button">Actualizar datos</button>
            </form>
        </div>
    );
}