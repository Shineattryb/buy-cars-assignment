// Navbar.js
import React ,{useState} from 'react';
import './navbar.css';
const Navbar = ({handleSearch}) => {
  const [searchitem, setSearchItem] = useState('');

  const handleSearchClick = () => {
    let queryObject = {};
    if (searchitem) {
      queryObject.searchitem = searchitem;
    }
    handleSearch(queryObject);
  };
  const handlecancel=()=>{
    setSearchItem('');
   handleSearch({});
  };
  
  return (
    <div className="container">
    <nav >
     
    
      
   <h1>BUYC Corp</h1>
    <div className='search-bar'>
      <input type="text" placeholder='Search cars' value={searchitem} onChange={(e) => setSearchItem(e.target.value)} />
      {searchitem && (
            <button type="button" className="cancel-button" onClick={handlecancel}>
              x
            </button>
      )
}
      <button type="submit" onClick={handleSearchClick} >Search</button>
      
    </div>
    </nav>
    </div>
  );
};

export default Navbar;
