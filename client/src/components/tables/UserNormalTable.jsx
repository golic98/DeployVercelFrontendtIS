import TableCard from "./TableRow";
import TableView from "./TableView";

export default function UserNormalTable({ users = [] }) {
    const fields = {
        username: { width: 300 },
        email: { width: 300 },
        delete: { width: 50 }
    };

    // Protección: si por alguna razón no es un array, mostrar mensaje.
    if (!Array.isArray(users)) {
        return (
            <TableView fields={fields}>
                <TableCard>
                    <p>No hay datos de usuarios (esperando un array).</p>
                </TableCard>
            </TableView>
        );
    }

    return (
        <TableView fields={fields}>
            {users.map(i =>
                <TableCard key={i._id || i.id || Math.random()}>
                    <h2 className="text-[1.5rem] text-dark-gray font-bold">{i.name}</h2>
                    <p className="text-[1rem] text-light-gray font-bold">{i.email}</p>
                </TableCard>
            )}
        </TableView>
    );
}
