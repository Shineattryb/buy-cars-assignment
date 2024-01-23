
import React from 'react';
import './card.css'
const Car = ({ car }) => {
  return (
    <div className="car" >

        <div className="img-container">
    <img src={car.image} alt={`Image of ${car.model_name}`}  />
    </div>
        <div>
      <h2>{car.manufacturer} {car.model_name} ({car.year})</h2>
      <p><b>Price:</b> ${car.list_price}</p>
      <p><b>Color: </b>{car.colors}</p>
      <p><b>Mileage: </b>{car.mileage} miles</p>
      </div> 
    </div>
  );
};

export default Car;
