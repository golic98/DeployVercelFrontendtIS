// src/components/login/Login.jsx
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom"; // ajusta si usas otro paquete
import ResetPassword from "../login-access/ResetPassword";
import "./Login.css";

function Login({ onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    setFocus,
  } = useForm();

  const { signin, errors: signinErrorsRaw, isAuthenticate, user, authLoading } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const navigate = useNavigate();

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  // Normalizar errores de signin a array de strings/objetos
  const signinErrors = Array.isArray(signinErrorsRaw)
    ? signinErrorsRaw
    : signinErrorsRaw
    ? [signinErrorsRaw]
    : [];

  // Redirección cuando ya está autenticado
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

  // Si el signIn falla, hacemos foco en el usuario (o en la contraseña si ya hay usuario)
  const handleSigninErrorFocus = () => {
    // intenta enfocar el usuario si está vacío, sino la contraseña
    const usernameValue = usernameRef.current?.value;
    if (!usernameValue) {
      setFocus("username");
    } else {
      setFocus("password");
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      await signin(data); // signin lanzará error si falla (según ajuste sugerido en AuthContext)
      // Si signin no lanza, la redirección la maneja el useEffect más arriba
    } catch (e) {
      // Centrar al usuario en el input apropiado para corregir credenciales
      handleSigninErrorFocus();
      // No re-throw: solo mostramos mensaje y permitimos correcciones
      console.log("Error en inicio de sesión:", e);
    } finally {
      setSubmitting(false);
    }
  });

  const handleResetPasswordOpen = (e) => {
    e?.preventDefault?.();
    setShowResetPassword(true);
  };

  const handleCloseResetPassword = () => {
    setShowResetPassword(false);
    // Si el modal de login debe cerrarse al cerrar reset password:
    if (typeof onClose === "function") onClose();
  };

  return (
    <div className="login-modal-overlay" role="dialog" aria-modal="true">
      <div className="login-modal">
        <h2 className="login-title">Inicio de sesión</h2>
        <div className="login-divider">
          <hr className="login-divider-line" />
          <hr className="login-divider-line" />
        </div>

        {/* Errores provenientes del contexto (signin) */}
        {signinErrors.length > 0 &&
          signinErrors.map((err, i) => (
            <div className="login-error" key={i}>
              {typeof err === "string" ? err : err?.message || JSON.stringify(err)}
            </div>
          ))}

        <form onSubmit={onSubmit} className="login-form" noValidate>
          <input
            ref={usernameRef}
            style={{ color: "white" }}
            type="text"
            {...register("username", { required: true })}
            className="login-input"
            placeholder="Usuario"
            aria-invalid={formErrors.username ? "true" : "false"}
            autoComplete="username"
          />
          {formErrors.username && (
            <p className="login-error-text">El usuario es requerido</p>
          )}

          <input
            ref={passwordRef}
            style={{ color: "white" }}
            type="password"
            {...register("password", { required: true })}
            className="login-input"
            placeholder="Contraseña"
            aria-invalid={formErrors.password ? "true" : "false"}
            autoComplete="current-password"
          />
          {formErrors.password && (
            <p className="login-error-text">La contraseña es requerida</p>
          )}

          <button
            style={{ background: "white", color: "black" }}
            type="submit"
            className="login-button"
            disabled={submitting || authLoading}
            aria-busy={submitting || authLoading}
          >
            {submitting || authLoading ? "Validando..." : "Aceptar"}
          </button>
        </form>

        <p style={{ color: "white" }}>
          ¿Olvidaste tu clave?{" "}
          <Link
            to="#"
            style={{ color: "white" }}
            className="login-register-link"
            onClick={handleResetPasswordOpen}
          >
            Cambiar clave
          </Link>
        </p>

        <p style={{ color: "white" }}>
          ¿No tienes cuenta?{" "}
          <Link
            to="/register"
            style={{ color: "white" }}
            className="login-register-link"
            onClick={onClose}
          >
            Ve a registrarte
          </Link>
        </p>

        <button
          style={{ padding: "8px", cursor: "pointer", color: "gray" }}
          onClick={onClose}
        >
          Cancelar
        </button>
      </div>

      {showResetPassword && (
        <ResetPassword onClose={handleCloseResetPassword} />
      )}
    </div>
  );
}

export default Login;