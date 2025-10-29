import { MdDelete } from "react-icons/md";
import TableCard from "./TableRow";
import TableView from "./TableView";
import { useAuth } from "../../context/AuthContext";

export default function UserTable({ users }) {
    const { deleteUser } = useAuth();
    const fields = {
        username: { width: 300 },
        email: { width: 300 },
        delete: { width: 50 }
    };

    return (
        <TableView fields={fields}>
            {users.map(i =>
                <TableCard key={i.id}>
                    <h2 className="text-[1.5rem] text-dark-gray font-bold">{i.username}</h2>
                    <p className="text-[1rem] text-light-gray font-bold">{i.email}</p>
                    <button className="bg-custom-red text-white py-11 px-16 rounded-[8px]
                        cursor-pointer text-[1rem] font-bold gap-8 duration-300 ease-in-out mt-16
                        hover:bg-dark-red"
                        onClick={() => { deleteUser(i.id), window.location.reload(); }}>
                        <MdDelete />
                    </button>
                </TableCard>
            )}
        </TableView>
    );
}