import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ApiContext } from '../context/ApiContextProvider';
import { Link } from 'react-router-dom';
import './epi.css'; // Importing external CSS for styling

function Game() {
    let { gid } = useParams();
    let [data, setData] = useState(null);
    let { api1 } = useContext(ApiContext);

    useEffect(() => {
        getData();
        if (data && data.background_image) {
            document.body.style.cssText = `background-image: url('${data.background_image}');backdrop-filter:blur(3px)`;
        }
    }, [gid, api1, data]);

    function getData() {
        axios.get(`https://api.rawg.io/api/games/${gid}?key=${api1}`)
            .then((res) => {
                setData(res.data);
                console.log(data)
            })
            .catch((error) => console.error("Failed to fetch game details:", error));
    }
    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="epiAll">
                <div className="epidet">
                    <div className="epiposter">
                        <div className="conss">
                            <img src={`${data.background_image}`} alt="" />
                            <div className="votinggg force">{data.metacritic}%</div>
                        </div>
                            <div className="separator"></div>
                        <div className="genres">
                                {data.genres.map((genre) => (
                                    <Link to={`/genre/${genre.id}`} key={genre.id}>
                                        <div className='genree'>{genre.name}</div>
                                    </Link>
                                ))}
                            </div>
                    </div>
                    <div className="epipdetails">
                        <h1 className='trendsss white more'>{data.name}</h1>
                        <h3><span>ESRB : {data.esrb_rating.name}</span>
                            <span>Playtime : {data.playtime}H</span>
                            <span>Released : {data.released}</span>
                            <span>Rating : {data.rating}</span>
                        </h3>
                        <p className='paragraph'>{data.description_raw}</p>
                    </div>
                </div>
            </div>
        </>

    );
}

export default Game;