import React ,{useEffect,useState} from 'react';
import axios from "axios";

export default function App() {
  const[trendingcars, settrendingcars]=useState([]);
  const[color, setcolor]=useState('');
  const[mileage, setmileage]=useState('');
  const[price, setprice]=useState('');
  const[searchitem,setsearchitem]=useState('');

  const handlesearch= (e)=> {
    e.preventDefault()
    let queryobject={};
   if(searchitem){
    queryobject.searchitem=searchitem;
   }

    axios.get('https://buycar-backend.vercel.app/api/oem/models/search',{
      params: queryobject,
    })
    .then ((response)=>{
      const dataArray=Array.isArray(response.data)?response.data:[];
      settrendingcars(response.data);
    })
    .catch((error)=>{
      console.error('error fetching trending cars: ',error);
    });
};
    


  useEffect(()=>{
    console.log("Cars API");
    let queryobject={};
 
    if(color){
      queryobject.colors=color;
    }
    
    if(mileage){
      console.log('mileage value:',mileage);
      queryobject.mileage=mileage;
    }
    if(price){
      queryobject.list_price=price;
    }
    
    axios.get('https://buycar-backend.vercel.app/api/oem/models',{params:
    queryobject
  
    })

    .then((response) =>{
const dataArray=Array.isArray(response.data)?response.data:[];
      console.log(response.data);
      settrendingcars(response.data);
    })
    .catch(error => {
      console.error('error fetching trending cars: ',error);
    });
    
    
    
 },[color,mileage,price]);
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary text-bg-secondary p-3 bg-warning-subtle fixed-top text-bg-secondary p-3">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            BUYC Corp
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  
                </a>
              </li>
             
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Price
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#" onClick={() => setprice('low')}>
                     Low to High
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#" onClick={() => setprice('high')} >
                     High to Low
                    </a>
                  </li>
                 
                </ul>
              </li>
              

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Color
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#" onClick={() => setcolor('white')}>
                    White
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#" onClick={() => setcolor('Black')}>
                    Black
                    </a>
                  </li>
                 
                </ul>
              </li>
              

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                 Mileage 
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#" onClick={() => setmileage(30)}>
                  Greater than 30 
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#" onClick={() => setmileage(100)}>
               Greater than 100
                    </a>
                  </li>
                 
                </ul>
              </li>
              
            </ul>
            <form className="d-flex"  role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
               onChange={(e)=> setsearchitem(e.target.value)}
               />
              <button className="btn btn-outline-success" type="submit" onClick={handlesearch}>
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>




<div id="carouselExample" className="carousel slide">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src="https://static.pexels.com/photos/63764/pexels-photo-63764.jpeg" className="d-block w-100" alt="car_image" height="500px" width="500px"/>
    </div>
    <div className="carousel-item">
      <img src="https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?cs=srgb&dl=lights-car-vehicle-244206.jpg&fm=jpg" height="500px" width="500px" className="d-block w-100" alt="car_image"/>
    </div>
    <div className="carousel-item">
      <img src="https://th.bing.com/th/id/OIP.X42b4q5g88ldlViDnsLj9QHaEK?w=3840&h=2160&rs=1&pid=ImgDetMain" className="d-block w-100" alt="car_image" height="500px" width="500px"/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>


<div className="container text-center">
        <div className="row">
          {trendingcars.map((car) => (
            <div className="col" key={car.id}>
              <div className="card" style={{ width: '18rem' }}>
                <img src="https://motorexporters.com/wp-content/uploads/2020/07/VEHICLE-SOURCE-IMAGE-3.jpg" className="card-img-top" alt="car_image" />
                <div className="card-body">
                  <h5 className="card-title">Model_name: {car.model_name}</h5>
                  <p className="card-text">List Price: {car.list_price}</p>
                  <p className="card-text">Mileage: {car.mileage}</p>
                  <p className="card-text">color: {car.colors}</p>
                  <p className="card-text">maximum_speed: {car.max_speed}</p>
                </div>
              </div>
            </div> 
          ))}
        </div>
      </div>
    </>
  );     
          }