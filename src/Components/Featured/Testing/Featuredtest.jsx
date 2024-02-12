import React from 'react'
import './Featured.css'
import data_featured from '../../Assets/fdata.js';
import Item from '../Item/Item.jsx'

const Featured = () => {
  return (
    <div className="featured">
        <hr />
        <div className="featured-item">
          {data_featured.map((item,i)=>{
            return <Item key={i} id={item.id} name={item.name} image={item.image} price={item.price}/>
          })}
        </div>
    </div>
  )
}

export default Featured