import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import "./Login.css";
import ResetPassword from "../login-access/ResetPassword";

function Login({ onClose }) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signin, errors: signinErrors, isAuthenticate, user } = useAuth();
    const [showResetPassword, setReserPasswordModal] = useState(false);
    const navigate = useNavigate();

    const handleReserPasswordClick = () => {
        setReserPasswordModal(true);
    };

    const handleCloseReserPasswordClick = () => {
        setReserPasswordModal(false);
        onClose();
    };

    const onSubmit = handleSubmit((data) => {
        signin(data);
    });

    useEffect(() => {
        if (isAuthenticate && user?.role) {
            switch (user.role) {
                case "admin":
                    navigate("/admin");
                    break;
                case "vigilant":
                    navigate("/vigilant");
                    break;
                default:
                    navigate("/user");
            }
        }
    }, [isAuthenticate, user, navigate]);

    return (
        <div className="login-modal-overlay">
            <div className="login-modal">
                <h2 className="login-title">Inicia sesión</h2>
                <div className="login-divider">
                    <hr className="login-divider-line" />
                    <hr className="login-divider-line" />
                </div>
                {
                    signinErrors.map((error, i) => (
                        <div className="login-error" key={i}>
                            {error}
                        </div>
                    ))
                }
                <form onSubmit={onSubmit} className="login-form">
                    <input type="text" {...register("username", { required: true })}
                        className="login-input"
                        placeholder="Usuario"
                    />
                    {
                        errors.username && (<p className="login-error-text">El usuario es requerido</p>)
                    }
                    <input type="password" {...register("password", { required: true })}
                        className="login-input"
                        placeholder="Contraseña"
                    />
                    {
                        errors.password && (<p className="login-error-text">La contraseña es requerida</p>)
                    }
                    <button style={{background: "white", color: "black"}} type="submit" className="login-button">Aceptar</button>
                </form>
                <p style={{color: "white"}}>¿Olvidaste tu clave? <Link to={"/"} style={{color: "white"}} className="login-register-link" onClick={handleReserPasswordClick}>Cambiar clave</Link></p>
                <p style={{color: "white"}}>¿No tienes cuenta? <Link to={"/register"} style={{color: "white"}} className="login-register-link">Ve a registrarte</Link> </p>
                <button style={{padding: "8px"}} onClick={onClose}>Cancelar</button>
            </div>
            {showResetPassword && <ResetPassword onClose={handleCloseReserPasswordClick} />}
        </div>

    );
}

export default Login;