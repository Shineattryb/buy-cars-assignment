import React,{useState}from 'react';
import './sidebar.css';
import 'rc-slider/assets/index.css';

import { Slider } from '@material-ui/core';
import { GiMoneyStack } from "react-icons/gi";
import { IoIosColorPalette } from "react-icons/io";
import { IoIosCheckboxOutline } from "react-icons/io"
import { RiPinDistanceFill } from "react-icons/ri";
const Sidebar = ({ handleFilter }) => {
   
   const[price, setprice]=useState([0, 6400000]);
   const[mileage, setMileage]=useState([0, 140]);
   const[selectedColors, setSelectedColors]=useState([]);
   const[slidertimeout,setslidertimeout]=useState(null);
  const handlePriceFilter = (event, newvalue) => {
   setprice(newvalue);
   handleSliderChange('list_price',newvalue);
  };

  const handleColorFilter = (color) => {
  let updatedColors=[...selectedColors];
  const index=updatedColors.indexOf(color);
  if(index!==-1){
    updatedColors.splice(index,1);
  }else {
    updatedColors.push(color);
  }
  if(color=="clear all"){
    updatedColors=["clear all"]
  }else{
   updatedColors= updatedColors.filter((color)=>color!=="clear all")
  }
  setSelectedColors(updatedColors);
    handleFilter('color', updatedColors);
  };

  const handleMileageFilter = (event, newvalue) => {
 setMileage(newvalue);
    handleSliderChange('mileage', newvalue);
  };

  // const handleClearFilters=()=>{
  //   setSelectedColors([]);
  //   handleFilter('clearAllFilters',{clearAllFilters});
  // }
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
         <p className="value">Min: $ {price[0]}</p>
         <p className="value">Max: $ {price[1]}</p>
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
        <p className="value">Min: {mileage[0]} mpg</p>
        <p className="value">Max: {mileage[1]} mpg</p>
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
          <div className="radio">
        <input type="checkbox" id="check" value="white"  checked={selectedColors.includes('white')} onClick={() => handleColorFilter('white')}/>
        <div class="text">
          White
        </div>
        </div>
        <div className="radio">
        <input type="checkbox"  id="check"value="black" checked={selectedColors.includes('black')} onClick={() => handleColorFilter('black')} />
        <div class="text">
        Black
        </div>
        </div>
        <div className="radio">
        <input type="checkbox" id="check"  value="brown" checked={selectedColors.includes('brown')} onClick={() => handleColorFilter('brown')} />
        <div class="text">
   Brown
        </div>
        </div>
        <div className="radio">
        <input type="checkbox" id="check"  value="silver"    checked={selectedColors.includes('silver')} onClick={() => handleColorFilter('silver')} />
        <div class="text">
         Silver
        </div>
        </div>
        <div className="radio">
        <input type="checkbox" id="check"  value="clear" checked={selectedColors.includes('clear all')} onClick={() =>handleColorFilter('clear all') } />
        <div class="text">
         Clear All
        </div>
        </div>
        </div>
      </div>
     
    </div>
  );
};

export default Sidebar;
