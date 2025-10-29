import HomeCard from "./HomeCard";

function HomeCardContainer({ cards }) {
    return (
        <div className="flex justify-center items-center gap-60 flex-wrap w-full max-w-900 mt=40">
            {cards.map(i => <HomeCard card={i} />)}
        </div>
    );
}

export default HomeCardContainer;
