import NavBar from "../../components/NavBar";
import { Outlet } from "react-router";

export default function AdminLayout() {

    return (
        <div className="font-sans bg-custom-white h-content min-h-screen m-0 flex flex-col tooltipBoundary">
            <NavBar />
            <Outlet />
        </div>
    );
}
