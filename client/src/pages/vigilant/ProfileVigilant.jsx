import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router";
import assets from "../../../src/assets";
import "./ProfileVigilant.css";

export default function ProfileVigilant() {
    
    const { user } = useAuth();

    return (
        <div className="profile-vigilant">
            <header className="header">
                <div className="logo-container">
                    
                </div>
                <div className="header-icons">
                    <div className="home-container">
                        <Link to="/vigilant" className="home-link">
                            <div className="home-content">
                                <img className="custom-home-icon" src={assets.casa} alt="home" />
                            </div>
                        </Link>
                    </div>
                </div>
            </header>
            <main className="main-content">
                <div className="content-container">
                    <div className="left-side">
                        <img src={assets.usuario1} alt="Usuario" className="profile-pic" />
                        <h2>Vigilancia</h2>
                        <p className="description">Descripción: Sistema de control de vigilancia</p>
                        <Link to={`/editVigilant/${user.id}`} className="edit-button">Editar Perfil</Link>
                    </div>

                    <div className="right-side">
                        <div className="info-card">
                            <h3>Nombre:</h3>
                            <p>{user.name}</p>
                            <h3>Email:</h3>
                            <p>{user.email}</p>
                            <h3>Contacto</h3>
                            <p>{user.telephone}</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}