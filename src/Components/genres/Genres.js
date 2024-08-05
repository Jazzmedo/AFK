import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import Trending2 from '../trending/Trending2';
import { ApiContext } from '../context/ApiContextProvider';
import axios from 'axios';
import './common.css'

function Genres() {
    let { gid } = useParams();
    let [data, setdata] = useState([]);
    let { api1 } = useContext(ApiContext);
    let [genre, setgenre] = useState([]);

    useEffect(() => {
        axios.get(`https://api.rawg.io/api/games?key=${api1}&genres=${gid}`)
            .then((res) => {
                if (res.data && res.data.results) {
                    setdata(res.data.results.sort((a, b) => {
                        const bTotal = b.reviews_count + b.ratings_count + b.added + b.suggestions_count;
                        const aTotal = a.reviews_count + a.ratings_count + a.added + a.suggestions_count;
                        return bTotal - aTotal;
                    }).slice(0, 8));
                } else {
                    setdata([]);
                }
            })
            .catch((error) => console.error("Failed to fetch games:", error));

        axios.get(`https://api.rawg.io/api/genres/${gid}?key=${api1}`)
            .then((res) => {
                setgenre(res.data);
            })
            .catch((error) => console.error("Failed to fetch genre details:", error));

        // document.body.style.backgroundImage = `url(${genre.image_background})`;
        document.title = genre.name + " Games";

        document.querySelector('.contentt').innerHTML = genre.description
    }, [genre,api1, gid]);

    return (
        <>
            <div className='canta'>
                <h1 className='text-center'>{genre.name}</h1>
                <p className='contentt'></p>
            </div>
            <div className='row'>
                {data.map((product) => {
                    return (
                        <div className='col-3'>
                            {/* {console.log(product)} */}
                            <Trending2 product={product} />
                        </div>
                    );
                })}
            </div>

        </>
    )
}

export default Genres