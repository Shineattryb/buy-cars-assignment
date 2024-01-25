// App.js
// https://buycar-backend.vercel.app
import React ,{useState,useEffect} from 'react';
import Navbar from './components/navbar';
import axios from 'axios';
import Sidebar from './components/sidebar';
import CarList from './components/maincontent';
import './App.css';
const App = () => {
  const [trendingCars, setTrendingCars] = useState([]);
  const [color, setColor] = useState('');
  const [mileage, setMileage] = useState([0, 140]);
  const [price, setPrice] = useState([0, 6400000]);
const[HighlightedSearchTerm,setHighlightedSearchTerm]=useState('');
  const[searchitem,setSearchItem]=useState('');

  const handleSearch= (queryObject)=> {
    setHighlightedSearchTerm(queryObject.searchitem || '');
    axios.get('https://buycar-backend.vercel.app/api/oem/models/search',{
      params: queryObject,
    })
    .then ((response)=>{
      const dataArray=Array.isArray(response.data)?response.data:[];
      setTrendingCars(response.data);
    })
    .catch((error)=>{
      console.error('error fetching trending cars: ',error);
    });
};
const handleFilter = (filterType, value) => {
 console.log(filterType,value,"filter type and value")
  switch (filterType) {
  
    case 'list_price':
      setPrice(value);
      break;
    case 'color':
      setColor(value);
      break;
    case 'mileage':
      setMileage(value);
      break;
   
    default:
      break;
  }
};
  useEffect(() => {
    const fetchData = async () => {
      try {
        let queryObject = {};

        if (color) {
          queryObject.colors = color;
        }

        if (mileage) {
          queryObject.mileage = mileage;
        }

        if (price) {
          queryObject.list_price = price;
          console.log("price");
        }
        console.log(queryObject,'queryObject')
        const response = await axios.get('https://buycar-backend.vercel.app/api/oem/models', {
          params: queryObject,
        });
      


        setTrendingCars(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [color, mileage, price]);


  return (
    <div className="app-container">
      <div className="nav-div">
      <Navbar handleSearch={handleSearch} />
      </div>
      <Sidebar handleFilter={handleFilter} />
      
    <div className="caar">
      <CarList cars={trendingCars}  highlightedSearchTerm={HighlightedSearchTerm}/>
      </div>
    </div>
  );
};

export default App;
