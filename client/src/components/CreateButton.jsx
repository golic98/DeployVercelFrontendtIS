import assets from "../assets";

export default function CreateButton({ text }) {
    return (
        <div className="add-schedule" >
            <span>{text}</span>
            <img
                src={assets.agregar}
                alt="Agregar horario"
                className="add-icon"
            />
        </div>
    )
}