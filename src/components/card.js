
import React from 'react';
import './card.css'
const Car = ({ car,highlightedSearchTerm }) => {
  const highlightSearchTerm = (text) => {
    if (!highlightedSearchTerm || !text) {
      return text;
    }
    const searchTerms = highlightedSearchTerm.split(/\s+/).map(term => term.toLowerCase());
    const highlightedText=searchTerms.reduce((highlighted,term)=>{
      const regex = new RegExp(`(${term})`, 'gi');
      return highlighted.replace(regex, '<span class="highlight">$1</span>');
    },text);
    return highlightedText;
    
 
  };
  return (
    <div className="car" >

        <div className="img-container">
    <img src={car.image} alt={`Image of ${car.model_name}`}  />
    </div>
        <div>
          <h2 dangerouslySetInnerHTML={{__html:highlightSearchTerm(`${car.manufacturer} ${car.model_name} (${car.year})`)}}/>
      
     

      <p><b>Price:</b> ${parseFloat(car.list_price).toLocaleString()}</p>
   
      <p><b>Color: </b>{car.colors}</p>
      <p><b>Mileage: </b>{car.mileage} mpg</p>
      </div> 
    </div>
  );
};

export default Car;
