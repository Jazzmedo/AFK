import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ApiContext } from '../context/ApiContextProvider';
import './game.css'; // Importing external CSS for styling

function Game() {
    let { gid } = useParams();
    let [data, setData] = useState(null);
    let { api1 } = useContext(ApiContext);

    useEffect(() => {
        axios.get(`https://api.rawg.io/api/games/${gid}?key=${api1}`)
            .then((res) => {
                setData(res.data);
            })
            .catch((error) => console.error("Failed to fetch game details:", error));
        // document.body.style.cssText = `background-image: url(${data.background_image});backdrop-filter:blur(3px)`;
    }, [gid, api1]);

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div className="game-container">
            <h1>{data.name}</h1>
            <img src={data.background_image} alt={data.name} />
            <p>{data.description}</p>
            <div className="additional-info">
                <p>Released: {data.released}</p>
                <p>Rating: {data.rating}</p>
                <p>Metacritic Score: {data.metacritic}</p>
                <p>Playtime: {data.playtime} hours</p>
                <p>ESRB Rating: {data.esrb_rating ? data.esrb_rating.name : 'Not Rated'}</p>
                <a href={data.website}>Official Website</a>
            </div>
        </div>
    );
}

export default Game;