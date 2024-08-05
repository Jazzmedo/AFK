import { useParams } from 'react-router-dom'
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ApiContext } from '../context/ApiContextProvider';
import Trending2 from '../trending/Trending2';

/*https://api.rawg.io/api/games/${gid}?key=${api1} */
function Platforms() {
    let { pid } = useParams();
    let [data, setdata] = useState([]);
    let [platform, setplatform] = useState([]);
    let { api1 } = useContext(ApiContext);

    useEffect(() => {
        axios.get(`https://api.rawg.io/api/games?key=${api1}&platforms=${pid}`).then((res) => {
            // console.log(res.data.results)
            setdata(res.data.results)
        }).catch((error) => console.error("Failed to fetch games:", error));

        axios.get(`https://api.rawg.io/api/platforms/${pid}?key=${api1}`).then((res) => {
            setplatform(res.data);

        }).catch((error) => console.error("Failed to fetch platform details:", error));

        // document.body.style.backgroundImage = `url(${platform.image_background})`;
        document.title = platform.name + " Games";

    }, [platform]);

    return (
        <>

            <h1 style={{ marginTop: '50px', fontWeight: '700', color: '#b7feae' }} className='text-center'>{platform.name}</h1>
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

export default Platforms
