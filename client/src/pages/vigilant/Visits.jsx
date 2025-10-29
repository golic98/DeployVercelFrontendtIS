import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useTask } from "../../context/TaskContext";
import { useAuth } from "../../context/AuthContext"; 
import VisitCard from "../../components/VisitCard";
import { Link, useNavigate } from "react-router";
import "./Visits.css";
import assets from "../../../src/assets";

export default function Visits() {
    const { register, handleSubmit } = useForm();
    const { createVisitVigilant, getVisitVigilant, addVisit } = useTask();
    const { logout } = useAuth(); 

    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        getVisitVigilant();
    }, []);

    const onSubmit = handleSubmit((data) => {
        createVisitVigilant(data);
    });

    const handleReload = () => {
        window.location.reload();
    };

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <div>
            <header>
                <div></div>
                <div className="menu">
                    <Link to="/vigilant">
                        <img src={assets.casa} alt="Inicio" className="menu-icon" />
                    </Link>
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
                                    onClick={() => {
                                        logout(); 
                                        navigate("/");
                                    }}
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
                </div>
            </header>

            <div>
                <h3 className="section-title">Registro de visitas</h3>
                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        placeholder="Nombre completo"
                        {...register("visitName")}
                        autoFocus
                        className="input-field"
                    />
                    <input
                        type="text"
                        placeholder="DUI"
                        {...register("dui")}
                        className="input-field"
                    />
                    <input
                        type="text"
                        placeholder="Número de placa"
                        {...register("numPlaca")}
                        className="input-field"
                    />
                    <input
                        type="text"
                        placeholder="Casa a visitar"
                        {...register("visitHouse")}
                        className="input-field"
                    />
                    <button type="submit" className="submit-button">
                        Registrar visita
                    </button>
                </form>
            </div>

            <div className="history-container">
                <h3 className="section-title">Historial de visitas</h3>
                {addVisit
                    .slice() 
                    .sort((a, b) => new Date(b.date) - new Date(a.date)) 
                    .map((visit) => (
                        <VisitCard visit={visit} key={visit._id} />
                    ))}
            </div>
        </div>
    );
}