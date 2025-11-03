import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import assets from "../../../src/assets";
import ButtonAddReporteNormal from "../../components/ButtonAddReporteNormal.jsx";
import ButtonAddAnuncioNormal from "../../components/ButtonAddAnuncioNormal.jsx";
import "./LoginAccess.css";

function UserHome() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [showButtonReporteByNormal, setShowButtonReporteByNormal] = useState(false);
    const [showButtonAnuncioByNormal, setShowButtonAnuncioByNormal] = useState(false);

    const handleButtonClick = () => {
        setShowButtonReporteByNormal(true);
    };

    const handleCloseButtonModal = () => {
        setShowButtonReporteByNormal(false);
    };

    const handleButtonClick2 = () => {
        setShowButtonAnuncioByNormal(true);
    };

    const handleCloseButtonModal2 = () => {
        setShowButtonAnuncioByNormal(false);
    };


    const handleLogout = () => {
        logout();
        navigate("/");
    };

    function handleNavigation(route) {
        navigate(route);
    }

    function toggleMenu() {
        setMenuOpen(!menuOpen);
    }

    return (
        <div className="user-home-container">
            <nav className="login-navbar">
                <div className="user-home-navbar-left">
                    <img
                        src={assets.casa}
                        alt="Inicio"
                        className="user-home-icono"
                    />
                </div>
                <div className="user-home-navbar-right">
                    <div className="user-home-dropdown">
                        <Link to="/profile">
                            <img
                                src={assets.usuario1}
                                alt="Usuario"
                                className="user-home-icono-usuario"
                            />
                        </Link>
                    </div>
                    <img
                        src={assets.menu}
                        alt="Menú"
                        className="user-home-menu"
                        onClick={toggleMenu}
                    />
                </div>
            </nav>

            {menuOpen && (
                <div className="user-home-menu-desplegable">
                    <button className="menu-item" onClick={() => { handleNavigation("/allUsers") }}> 
                        <img src={assets.usuario1} alt="Participantes" />
                        Participantes
                    </button>
                    <button className="menu-item" onClick={handleLogout} >
                        <img src={assets.cerrarSesion} alt="Cerrar sesión" />
                        Cerrar sesión
                    </button>
                </div>
            )}

            <div className="user-home-contenido">
                <div className="user-home-cards-normal">
                    <div className="user-home-card-normal" onClick={handleButtonClick}>
                        <img src={assets.formularioDeLlenado} alt="Reportes" />
                        <p className="user-home-card-texto">Reportes</p>
                    </div>
                    <div className="user-home-card" onClick={handleButtonClick2}>
                        <img src={assets.nota} alt="Anuncios" />
                        <p className="user-home-card-texto">Anuncios</p>
                    </div>
                    <div className="user-home-card" onClick={() => { handleNavigation("/payVigilance") }}>
                        <img src={assets.dinero} alt="Gestión de pagos" />
                        <p className="user-home-card-texto">Gestión de pagos</p>
                    </div>
                </div>
            </div>
            {showButtonReporteByNormal && <ButtonAddReporteNormal onClose={handleCloseButtonModal} />}
            {showButtonAnuncioByNormal && <ButtonAddAnuncioNormal onClose={handleCloseButtonModal2} />}
        </div>
    );
}

export default UserHome;