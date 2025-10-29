import { MdDelete } from "react-icons/md";
import { useAuth } from "../context/AuthContext";
import "./AdminDeleteUser.css";

export default function CardShowUserAdmin({user}) {
    
    const { deleteUser } = useAuth();

    return(
        <div>
            <div className="card">
                <h2>{user.name}</h2>
                <p>{user.email}</p>
                <button onClick={() => { deleteUser(user.id)}}>
                    <MdDelete />
                </button>
            </div>
        </div>
    )
};