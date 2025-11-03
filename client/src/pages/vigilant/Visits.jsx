import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useTask } from "../../context/TaskContext";
import { useAuth } from "../../context/AuthContext";
import VisitCard from "../../components/VisitCard";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import assets from "../../../src/assets";
import "./Visits.css";

export default function Visits() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue,
    } = useForm({
        defaultValues: {
            visitName: "",
            dui: "",
            numPlaca: "",
            visitHouse: "",
        },
        mode: "onSubmit", // o 'onBlur' si quieres validar en blur
    });

    const { createVisitVigilant, getVisitVigilant, addVisit } = useTask();
    const { logout } = useAuth();

    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        getVisitVigilant();
    }, [getVisitVigilant]);

    // Limpia espacios (trim) antes de enviar
    const preSubmitTrim = (data) => {
        const cleaned = Object.fromEntries(
            Object.entries(data).map(([k, v]) => [k, typeof v === "string" ? v.trim() : v])
        );
        // reinyecta valores limpios al form (opcional)
        Object.entries(cleaned).forEach(([k, v]) => setValue(k, v, { shouldValidate: true }));
        return cleaned;
    };

    const onValid = handleSubmit(async (data) => {
        const payload = preSubmitTrim(data);

        try {
            await createVisitVigilant(payload);
            Swal.fire({
                title: "¡Visita creada!",
                text: "La visita se ha creado correctamente.",
                icon: "success",
                confirmButtonColor: "#2563eb",
                confirmButtonText: "Aceptar",
                background: "#fefefe",
                color: "#1e293b",
                timer: 2000,
                timerProgressBar: true,
            }).then(() => navigate("/vigilant"));
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "No se pudo crear la visita.",
                icon: "error",
                confirmButtonColor: "#dc2626",
            });
        }
    });

    const onInvalid = (formErrors) => {
        const areAllEmpty =
            !formErrors.visitName && !formErrors.dui && !formErrors.numPlaca && !formErrors.visitHouse;
        Swal.fire({
            title: "Campos incompletos",
            text: "Revisa los campos resaltados e inténtalo de nuevo.",
            icon: "warning",
            confirmButtonColor: "#f59e0b",
        });
    };

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <div>
            <div>
                <h3 className="section-title">Registro de visitas</h3>

                {/* Importante: handleSubmit admite 2 callbacks: onValid y onInvalid */}
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(onValid, onInvalid)();
                }}>
                    <input
                        type="text"
                        placeholder="Nombre completo"
                        {...register("visitName", {
                            required: "El nombre es obligatorio",
                            minLength: { value: 3, message: "Mínimo 3 caracteres" },
                            validate: (v) =>
                                v.trim().length > 0 || "Este campo no puede quedar vacío o solo con espacios",
                        })}
                        autoFocus
                        className={`input-field ${errors.visitName ? "input-error" : ""}`}
                    />
                    {errors.visitName && <p className="error-text">{errors.visitName.message}</p>}

                    <input
                        type="text"
                        placeholder="DUI (formato 8 dígitos-1 dígito, ej. 01234567-8)"
                        {...register("dui", {
                            required: "El DUI es obligatorio",
                            pattern: {
                                value: /^\d{8}-\d{1}$/,
                                message: "Formato inválido. Ejemplo: 01234567-8",
                            },
                        })}
                        className={`input-field ${errors.dui ? "input-error" : ""}`}
                    />
                    {errors.dui && <p className="error-text">{errors.dui.message}</p>}

                    <input
                        type="text"
                        placeholder="Número de placa (ej. P123-456 o ABC1234)"
                        {...register("numPlaca", {
                            required: "La placa es obligatoria",
                            pattern: {
                                // Acepta formatos comunes: letras+números, con o sin guion
                                value: /^[A-Z]{1,3}\d{2,4}(-?\d{2,4})?$/i,
                                message: "Formato de placa inválido",
                            },
                        })}
                        className={`input-field ${errors.numPlaca ? "input-error" : ""}`}
                    />
                    {errors.numPlaca && <p className="error-text">{errors.numPlaca.message}</p>}

                    <input
                        type="number"
                        placeholder="Casa a visitar"
                        {...register("visitHouse", {
                            required: "La casa a visitar es obligatoria",
                            valueAsNumber: true, // <-- convierte a Number (NaN si vacío o inválido)
                            min: { value: 1, message: "Debe ser un número positivo" },
                            validate: (v) => Number.isInteger(v) || "Debe ser un número entero válido",
                        })}
                        className={`input-field ${errors.visitHouse ? "input-error" : ""}`}
                    />
                    {errors.visitHouse && <p className="error-text">{errors.visitHouse.message}</p>}

                    <button type="submit" className="submit-button" disabled={isSubmitting}>
                        {isSubmitting ? "Guardando..." : "Registrar visita"}
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