import { useState } from "react";
import { Link, useNavigate } from "react-router";
import assets from "../../../src/assets";
import HomeCardContainer from "../../components/HomeCardContainer";

function Vigilant() {
    const navigate = useNavigate();

    const menuCards = [
        { text: "Registro de visitas", image: assets.tarjetaDeIdentificacion, callback: () => navigate("/visits") },
        { text: "Horarios", image: assets.calendario, callback: () => navigate("/schedules") },
    ];

    return (
        <div className="flex grow-1 flex-col justify-center items-center p-29 w-full box-border">
            <HomeCardContainer cards={menuCards} />
        </div>
    );
}

export default Vigilant;