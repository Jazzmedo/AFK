import React, { useEffect, useState, useContext } from 'react'
import Trending2 from './Trending2';
import axios from 'axios';
import { ApiContext } from '../context/ApiContextProvider';


export default function Trending() {
    let [data, setdata] = useState([]);
    let { api1 } = useContext(ApiContext);

    useEffect(() => {
        axios.get(`https://api.rawg.io/api/games?key=${api1}`).then((res) => {
            // console.log(res.data.results)
            setdata(res.data.results)
        })
    }, []);

    return (
        <>
            <h1 style={{ marginTop: '50px', fontWeight: '700', color: '#333b6a' }} className='text-center'>Best Games</h1>
            <div className='container'>
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
            </div>
        </>
    )
}
