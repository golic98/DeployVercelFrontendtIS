import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext"; 
import "./Vigilant.css";
import assets from "../../../src/assets";

function Vigilant() {
    const { logout, user } = useAuth(); 
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const handleLogout = () => {
        logout(); 
        navigate("/"); 
    };

    return (
        <div>
            <header>
                <div className="logo-container">
                    
                </div>
                <div className="profile-menu">
                    <button
                        className="profile-button"
                        onClick={toggleMenu}
                        onBlur={() => setTimeout(() => setIsMenuOpen(false), 200)}
                    >
                        <img
                            src={assets.usuario1}
                            alt="Perfil"
                            className="profile-icon"
                        />
                    </button>
                    {isMenuOpen && (
                        <div className={`dropdown-menu ${isMenuOpen ? "open" : ""}`}>
                            <Link to="/profileVigilant" className="menu-item">
                                <img
                                    src={assets.ojo}
                                    alt="Ver perfil"
                                    className="menu-item-icon"
                                />
                                Ver perfil
                            </Link>
                            <button
                                onClick={handleLogout} 
                                className="menu-item"
                            >
                                <img
                                    src={assets.cerrarSesion}
                                    alt="Cerrar sesión"
                                    className="menu-item-icon"
                                />
                                Cerrar sesión
                            </button>
                        </div>
                    )}
                </div>
            </header>
            <main>
                <div className="welcome-container">
                    <h2 className="welcome-text">Bienvenido {user.username}</h2>
                </div>
                <div className="container">
                    <Link to="/visits" className="card">
                        <div className="card-content">
                            <img
                                src={assets.tarjetaDeIdentificacion}
                                alt="Registro de visitas"
                                className="card-img"
                            />
                            <p className="card-text">Registro de visitas</p>
                        </div>
                    </Link>
                    <Link to="/schedules" className="card">
                        <div className="card-content">
                            <img
                                src={assets.calendario}
                                alt="Horarios"
                                className="card-img"
                            />
                            <p className="card-text">Horarios</p>
                        </div>
                    </Link>
                </div>
            </main>
        </div>
    );
}

export default Vigilant;