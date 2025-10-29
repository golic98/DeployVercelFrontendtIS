import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext"; 
import { useTask } from "../../context/TaskContext.jsx";
import assets from "../../assets"; 
import "./Schedules.css";

export default function Schedule() {
    const [showForm, setShowForm] = useState(false);
    const [editMode, setEditMode] = useState(null); 
    const [editableName, setEditableName] = useState(""); 
    const [dropdownVisible, setDropdownVisible] = useState(false); 

    const navigate = useNavigate(); 
    const { logout, user } = useAuth();
    const { createScheduleVigilant } = useTask();

    const [scheduleData, setScheduleData] = useState([
        { name: "Rodolfo Castro", lunes: "", martes: "", miercoles: "", jueves: "", viernes: "", sabado: "", domingo: "" },
        { name: "Francisco Hernandez", lunes: "", martes: "", miercoles: "", jueves: "", viernes: "", sabado: "", domingo: "" },
        { name: "Roberto Flores", lunes: "", martes: "", miercoles: "", jueves: "", viernes: "", sabado: "", domingo: "" },
        { name: "Vicente Fernandez", lunes: "", martes: "", miercoles: "", jueves: "", viernes: "", sabado: "", domingo: "" },
    ]);

    const [newEntry, setNewEntry] = useState({
        name: "",
        lunes: "",
        martes: "",
        miercoles: "",
        jueves: "",
        viernes: "",
        sabado: "",
        domingo: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewEntry({ ...newEntry, [name]: value });
    };

    const handleAddEntry = async (e) => {
        e.preventDefault();
    
        try {
            await createScheduleVigilant(newEntry);
    
            const updatedData = scheduleData.map((row) => {
                if (row.name === newEntry.name) {
                    return { ...row, ...newEntry };
                } else {
                    return row;
                }
            });
    
            setScheduleData(updatedData);
            setShowForm(false);
    
            setNewEntry({
                name: "",
                lunes: "",
                martes: "",
                miercoles: "",
                jueves: "",
                viernes: "",
                sabado: "",
                domingo: "",
            });
        } catch (error) {
            console.error("Error al guardar el horario en la base de datos:", error);
        }
    };
    
    const enableEditMode = (index) => {
        setEditMode(index);
        setEditableName(scheduleData[index].name);
    };

    const handleNameChange = (e) => {
        setEditableName(e.target.value);
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Enter") {
            saveNameChange(index);
        }
    };

    const saveNameChange = (index) => {
        const updatedData = [...scheduleData];
        updatedData[index].name = editableName;
        setScheduleData(updatedData);
        setEditMode(null);
    };

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleLogout = () => {
        logout(); 
        navigate("/"); 
    };

    return (
        <div className="schedule">
            <header className="schedule-header">
                <div className="menu-bar">
                    <div></div>
                    <div className="menu-right">
                        <img
                            src={assets.casa}
                            alt="Inicio"
                            className="menu-icon"
                            onClick={() => navigate("/vigilant")} 
                        />
                        <div className="user-menu">
                            <img
                                src={assets.usuario1}
                                alt="Usuario"
                                className="menu-icon"
                                onClick={toggleDropdown}
                            />
                            {dropdownVisible && (
                                <ul className="dropdown">
                                    <li onClick={() => navigate("/profileVigilant")}> 
                                        <img src={assets.ojo} alt="Ver perfil" className="dropdown-icon" />
                                        Ver perfil
                                    </li>
                                    <li onClick={handleLogout}> 
                                        <img src={assets.cerrarSesion} alt="Cerrar sesión" className="dropdown-icon" />
                                        Cerrar sesión
                                    </li>
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </header>
            {/* Contenido principal */}
            <div className="schedule-content">
                <div className="add-schedule-wrapper">
                    <div className="add-schedule" onClick={() => setShowForm(true)}>
                        <span>Agregar horario</span>
                        <img
                            src={assets.agregar}
                            alt="Agregar horario"
                            className="add-icon"
                        />
                    </div>
                </div>

                {showForm && (
                    <div className="modal">
                        <div className="modal-content">
                            <h3>Crear Horario</h3>
                            <form onSubmit={handleAddEntry}>
                                <label htmlFor="name">Selecciona un vigilante</label>
                                <select
                                    id="name"
                                    name="name"
                                    value={newEntry.name}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Selecciona un vigilante</option>
                                    {scheduleData.map((row, index) => (
                                        <option key={index} value={row.name}>
                                            {row.name}
                                        </option>
                                    ))}
                                </select>

                                <label htmlFor="lunes">Lunes</label>
                                <input
                                    id="lunes"
                                    type="text"
                                    name="lunes"
                                    placeholder="Ej: 9:00 - 17:00"
                                    value={newEntry.lunes}
                                    onChange={handleChange}
                                />

                                <label htmlFor="martes">Martes</label>
                                <input
                                    id="martes"
                                    type="text"
                                    name="martes"
                                    placeholder="Ej: 9:00 - 17:00"
                                    value={newEntry.martes}
                                    onChange={handleChange}
                                />

                                <label htmlFor="miercoles">Miercoles</label>
                                <input
                                    id="miercoles"
                                    type="text"
                                    name="miercoles"
                                    placeholder="Ej: 9:00 - 17:00"
                                    value={newEntry.miercoles}
                                    onChange={handleChange}
                                />

                                <label htmlFor="jueves">Jueves</label>
                                <input
                                    id="jueves"
                                    type="text"
                                    name="jueves"
                                    placeholder="Ej: 9:00 - 17:00"
                                    value={newEntry.jueves}
                                    onChange={handleChange}
                                />

                                <label htmlFor="viernes">Viernes</label>
                                <input
                                    id="viernes"
                                    type="text"
                                    name="viernes"
                                    placeholder="Ej: 9:00 - 17:00"
                                    value={newEntry.viernes}
                                    onChange={handleChange}
                                />

                                <label htmlFor="sabado">Sabado</label>
                                <input
                                    id="sabado"
                                    type="text"
                                    name="sabado"
                                    placeholder="Ej: 9:00 - 13:00"
                                    value={newEntry.sabado}
                                    onChange={handleChange}
                                />

                                <label htmlFor="domingo">Domingo</label>
                                <input
                                    id="domingo"
                                    type="text"
                                    name="domingo"
                                    placeholder="Ej: 9:00 - 13:00"
                                    value={newEntry.domingo}
                                    onChange={handleChange}
                                />

                                <div className="modal-actions">
                                    <button
                                        type="button"
                                        className="cancel-button"
                                        onClick={() => setShowForm(false)}
                                    >
                                        Cancelar
                                    </button>
                                    <button type="submit" className="create-button">
                                        Crear
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                <h3>Horarios Semanales de Vigilancia</h3>
                <table className="schedule-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Lunes</th>
                            <th>Martes</th>
                            <th>Miercoles</th>
                            <th>Jueves</th>
                            <th>Viernes</th>
                            <th>Sabado</th>
                            <th>Domingo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scheduleData.map((row, index) => (
                            <tr key={index}>
                                <td>
                                    <div className="name-container">
                                        <img
                                            src={assets.usuario1}
                                            alt="Editar"
                                            onClick={() => enableEditMode(index)}
                                            className="edit-icon"
                                        />
                                        {editMode === index ? (
                                            <input
                                                type="text"
                                                value={editableName}
                                                onChange={handleNameChange}
                                                onBlur={() => saveNameChange(index)}
                                                onKeyDown={(e) => e.key === "Enter" && saveNameChange(index)}
                                                className="name-input"
                                                autoFocus
                                            />
                                        ) : (
                                            <span>{row.name}</span>
                                        )}
                                    </div>
                                </td>
                                <td>{row.lunes || "-"}</td>
                                <td>{row.martes || "-"}</td>
                                <td>{row.miercoles || "-"}</td>
                                <td>{row.jueves || "-"}</td>
                                <td>{row.viernes || "-"}</td>
                                <td>{row.sabado || "-"}</td>
                                <td>{row.domingo || "-"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}