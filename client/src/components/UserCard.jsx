import "./AdminDeleteUser.css";

export default function UserCard({usr}) {

    return(
        <div>
            <div className="card">
                <h2>{usr.name}</h2>
                <p>{usr.email}</p>
            </div>
        </div>
    )
};
