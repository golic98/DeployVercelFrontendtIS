import { useState } from "react";
import "./Home.css";
import Login from "../login/Login";
import Register from "../register/Register";

function Home() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleRegisterClick = () => {
    setShowRegisterModal(true);
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  const handleCloseRegisterModal = () => {
    setShowRegisterModal(false);
  };

  return (
    <div className="home-root">
      <div className="right-section-home">
        <h1 style={{color: "white"}}>COMMUNITY DDDA FOR THE PEOPLE</h1>
        <div className="join-container-home">

          {/* Botones para abrir los modales */}
          <button className="register-button-home" onClick={handleRegisterClick}>
            Crear cuenta
          </button>
          <p style={{color: "white"}}>¿Ya tienes una cuenta?</p>
          <button className="login-button-login" onClick={handleLoginClick}>
            Iniciar sesión
          </button>
        </div>
      </div>

      {/* Renderización de los modales de Login y Register */}
      {showLoginModal && <Login onClose={handleCloseLoginModal} />}
      {showRegisterModal && <Register onClose={handleCloseRegisterModal} />}
    </div>
  );
}

export default Home;
