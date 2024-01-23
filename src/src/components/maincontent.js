// CarList.js
import React from 'react';
import Car from './card'; // Import the Car component
import './card.css';
const CarList = ({ cars }) => {
   
  return (
    <div className="car-list">
      {cars.map((car) => (
        <Car key={car.id} car={car} />
      ))}
    </div>
  );
};

export default CarList;
