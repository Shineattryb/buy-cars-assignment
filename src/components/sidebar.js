import React,{useState}from 'react';
import './sidebar.css';
import 'rc-slider/assets/index.css';
// import Slider from 'rc-slider'
import { Slider } from '@material-ui/core';
import { GiMoneyStack } from "react-icons/gi";
import { IoIosColorPalette } from "react-icons/io";
import { RiPinDistanceFill } from "react-icons/ri";
const Sidebar = ({ handleFilter }) => {
   
   const[price, setprice]=useState([0, 6400000]);
   const[mileage, setMileage]=useState([0, 140]);
   const[slidertimeout,setslidertimeout]=useState(null);
  const handlePriceFilter = (event, newvalue) => {
   setprice(newvalue);
   handleSliderChange('list_price',newvalue);
  };

  const handleColorFilter = (color) => {
  
    handleFilter('color', color);
  };

  const handleMileageFilter = (event, newvalue) => {
 setMileage(newvalue);
    handleSliderChange('mileage', newvalue);
  };
const handleSliderChange=(filtertype, newvalue)=>{
    if(slidertimeout){
        clearTimeout(slidertimeout);
    }
    const newTimeout=setTimeout(()=>{
        handleFilter(filtertype,newvalue);
    },500);
    setslidertimeout(newTimeout);
};

  return (
    <div className="sidebar">
      
      <div >
        <div id="money">
           <div id="moneyicon">
      <GiMoneyStack />
      </div>
        <h3>Price($)</h3>
        </div>
        <Slider 
        
        min={0}
         max={6500000} 
      
      value={price}
         onChange={handlePriceFilter}
         valueLabelDisplay="auto"
         />
         <div class="explain">
         <p className="value">Value1: $ {price[0]}</p>
         <p className="value">Value2: $ {price[1]}</p>
         </div>
      </div>
      <div>
        <div id="mileage">
            <div>
      <RiPinDistanceFill />
      </div>
        <h3>Mileage</h3>
        </div>
        <Slider 
   
          min={0}
          max={150}
        value={mileage}

          onChange={handleMileageFilter}
          valueLabelDisplay="auto"
        />
        <div class="explain">
        <p className="value">Value1: {mileage[0]} miles</p>
        <p className="value">Value2: {mileage[1]} miles</p>
        </div>
        
      </div>
      <div>
        <div id="colors">
            <div id="icon">
      <IoIosColorPalette />
      </div>
        <h3>Color</h3>
        </div>
        <div class="explain2">
        <button onClick={() => handleColorFilter('white')}>White</button>
        <button onClick={() => handleColorFilter('black')}>Black</button>
        <button onClick={() => handleColorFilter('brown')}>Brown</button>
        <button onClick={() => handleColorFilter('silver')}>Silver</button>
        </div>
      </div>
     
    </div>
  );
};

export default Sidebar;
