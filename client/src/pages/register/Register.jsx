import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router";
import assets from "../../../src/assets";
import "./Register.css";

function Register({ onClose }) {
    const [mostrarPassword, setMostrarPassword] = useState(false);
    const [verPassword, setVerPassword] = useState(false);
    const [verConfirmPassword, setVerConfirmPassword] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signup, isAuthenticate, errors: registerErrors } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticate) {
            navigate("/login");
        }
    }, [isAuthenticate, navigate]);

    const onSubmit = handleSubmit(async (values) => {
        if (!mostrarPassword) {
            setMostrarPassword(true);
        } else {
            if (values.password !== values.confirmPassword) {
                alert("Las contraseñas no coinciden.");
                return;
            }

            try {
                const payload = {
                    name: values.name,
                    username: values.username,
                    email: values.email,
                    telephone: values.telephone,
                    age: values.age,
                    role: values.role,
                    password: values.password,
                };

                signup(payload);
            } catch (error) {
                console.error("Error al crear cuenta:", error);
            }
        }
    });

    return (
        <div className="register-modal-overlay">
            <div className="register-modal">
                {(registerErrors ?? []).map((error, i) => (
                    <div key={i} className="register-error">
                        {error}
                    </div>
                ))}
                {mostrarPassword && (
                    <button
                        className="register-back-button"
                        onClick={() => setMostrarPassword(false)}
                    >
                        ←
                    </button>
                )}

                <h2 style={{color: "white"}} className="register-title">Crea tu cuenta</h2>

                <form onSubmit={onSubmit} className="register-form">
                    <input
                        type="text"
                        {...register("name", { required: true })}
                        className="register-input"
                        placeholder="Nombre"
                    />
                    {errors.name && <p className="register-error-text">El nombre es requerido</p>}

                    <input
                        type="text"
                        {...register("username", { required: true })}
                        className="register-input"
                        placeholder="Nombre de Usuario"
                    />
                    {errors.username && <p className="register-error-text">El usuario es requerido</p>}

                    <input
                        type="email"
                        {...register("email", { required: true })}
                        className="register-input"
                        placeholder="Correo Electrónico"
                    />
                    {errors.email && <p className="register-error-text">El email es requerido</p>}
                    <input
                        type="telephone"
                        {...register("telephone", { required: true })}
                        className="register-input"
                        placeholder="Teléfono"
                    />
                    {errors.telephone && <p className="register-error-text">El teléfono es requerido</p>}

                    <input
                        type="number"
                        {...register("age", { required: true })}
                        className="register-input"
                        placeholder="Ingrese su edad"
                        min="0"
                        step="1"
                    />
                    {errors.age && <p className="register-error-text">La edad es requerida</p>}

                    {mostrarPassword && (
                        <>
                            <div className="register-password-container">
                                <input
                                    type={verPassword ? "text" : "password"}
                                    {...register("password", { required: true })}
                                    placeholder="Contraseña"
                                    className="register-input"
                                />
                                <img
                                    src={assets.ojo}
                                    alt="Mostrar contraseña"
                                    className="register-password-toggle"
                                    onClick={() => setVerPassword(!verPassword)}
                                />
                                {errors.password && <p className="register-error-text">La contraseña es requerida</p>}
                            </div>
                            <div className="register-password-container">
                                <input
                                    type={verConfirmPassword ? "text" : "password"}
                                    {...register("confirmPassword", { required: true })}
                                    placeholder="Confirmar Contraseña"
                                    className="register-input"
                                />
                                <img
                                    src={assets.ojo}
                                    alt="Mostrar confirmación"
                                    className="register-password-toggle"
                                    onClick={() => setVerConfirmPassword(!verConfirmPassword)}
                                />
                                {errors.confirmPassword && (
                                    <p className="register-error-text">La confirmación de la contraseña es requerida</p>
                                )}
                            </div>
                        </>
                    )}

                    <button style={{background: "white", color: "black"}} type="submit" className="register-next-button">
                        {mostrarPassword ? "Registrar" : "Siguiente"}
                    </button>
                </form>
                <p style={{color: "white"}}>¿Ya tienes cuenta? <Link to={"/login"} style={{color: "white"}} className="register-login-link">Inicia sesión</Link> </p>
                <button style={{padding: "8px"}} onClick={onClose}>Cancelar</button>
            </div>
        </div>
    );
}

export default Register;