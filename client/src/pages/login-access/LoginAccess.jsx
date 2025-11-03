import { useNavigate } from "react-router";
import assets from "../../assets";
import HomeCardContainer from "../../components/HomeCardContainer";
import PayVigilanceForm from "../../components/forms/PayVigilanceForm";
import { useState } from "react";
import Popup from "reactjs-popup";

function UserHome() {
    const navigate = useNavigate();
    const [paying, openPay] = useState();
    const closePopup = () => openPay(false);

    const menuCards = [
        { text: "Reportes", image: assets.formularioDeLlenado, callback: () => navigate("/userReport") },
        { text: "Anuncios", image: assets.nota, callback: () => navigate("/userAnuncios") },
        { text: "Gestión de pagos", image: assets.dinero, callback: () => openPay(true) },
        { text: "Lista de usuarios", image: assets.tarjetaDeIdentificacion, callback: () => navigate("/allUsers") },
    ];

    return (
        <div className="flex grow-1 flex-col justify-center items-center p-29 w-full box-border">
            <HomeCardContainer cards={menuCards} />
            <Popup open={paying} onClose={closePopup} lockScroll={true} position="top center" closeOnDocumentClick={false} modal={true}
                overlayStyle={{ background: 'rgba(0,0,0,0.5)' }} contentStyle={{ maxHeight: '95%', overflow: 'auto' }}>
                <PayVigilanceForm close={closePopup} />
            </Popup>
        </div>
    );
}

export default UserHome;