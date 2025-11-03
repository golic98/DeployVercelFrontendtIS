import "./UserCard.css";

export default function UserCard({ usr }) {
    return (
        <div className="cards-container">  {/* Contenedor para las cards */}
            <div className="card-user">
                <h2 style={{textAlign: "center"}} className="text-[1.5rem] text-dark-gray font-bold">{usr.name}</h2>
                <p style={{textAlign: "center"}} className="text-[1rem] text-light-gray font-bold">{usr.email}</p>
            </div>
        </div>
    );
}
