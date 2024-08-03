import React from 'react'
import './Trending.css';
import { Link } from 'react-router-dom';
export default function Trending2({ product }) {
  // console.log(props)
  return (
    <>
      <Link to={`/game/${product.id}`}>
        <div className="articles">
            <div className="box">
              <div className='metacritic'>{product.metacritic}%</div>
              <div className="backonly" style={{ backgroundImage: `url('${product.background_image}')` }}>
                {/* <img src={product.background_image} /> */}
              </div>
              <div className="dets">
                <div className="text mina">
                  <h2>{product.name}</h2>
                </div>
                <div className="info">
                  {product.genres.map((genre) => (
                    <span key={genre.id}>{genre.name}</span>
                  ))}
                </div>
              </div>
            </div>
        </div>
      </Link>
    </>
  )
}
