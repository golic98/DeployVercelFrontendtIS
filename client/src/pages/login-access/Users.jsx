import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router";
import UserCard from "../../components/UserCard.jsx";
import assets from "../../../src/assets";
import "./User.css";

export default function Users() {

    const { user, users, getAllUsers, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getAllUsers();
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    const goToProfile = () => {
        navigate("/profile");
    };

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const handleNavigateToUser = () => {
        navigate("/user");
    };

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

            <div className="admin-header">
                <h2>Lista de usuarios</h2>
            </div>

            <div className="admin-users-container">
                {
                    users.map(userObject => (<UserCard usr={userObject} key={userObject.id} />))
                }
            </div>
        </div>
    );
};