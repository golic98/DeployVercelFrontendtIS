import Popup from "reactjs-popup";
import UserTable from "../../components/tables/UserTable";
import assets from "../../assets";
import CreateUserForm from "../../components/forms/CreateUserForm";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import CreateButton from "../../components/CreateButton";

export default function AdminUserView() {
    const { getAdminUsers, getUsers } = useAuth();
    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div className="flex grow-1 flex-col justify-start items-center p-16 w-full box-border">
            <div className="flex justify-center items-center my-16 mx-auto p-16 bg-dark-green w-3/5 rounded-lg shadow-md">
                <h2 className="font-sans text-[1.75rem] font-bold text-white m-0 text-center">Lista de usuarios</h2>
            </div>
            <Popup trigger={<button><CreateButton text="Crear Usuario" /></button>} lockScroll={true}
                position="top center" closeOnDocumentClick={false} modal={true} overlayStyle={{ background: 'rgba(0,0,0,0.5)' }}
                contentStyle={{ maxHeight: '95%', overflow: 'auto' }}>
                {close => <CreateUserForm close={close} />}
            </Popup>
            <UserTable users={getAdminUsers} />

        </div>
    );
}