var mysql=require('mysql2');
var express=require('express');
var cors= require('cors');
const app=express();
const port =8000;
app.use(cors());
var connection= mysql.createConnection({
    host:'monorail.proxy.rlwy.net',
    user:'root',
    password:'3H1AA-3f6eE3FB3E2-A3bBaDDGe6DA1b',
    database:'railway',
    port:'36742'
});
connection.connect();
connection.connect((err)=>{
    if(err){
        console.error('error connecting to mysql database',err);
        return;
    }
    console.log('connected to mysql database');
    }
);
//path given to root
app.get('/', (req, res) => {
    res.send('Welcome to the BuyCars API!');
});


//count the number of models in oem_specs

app.get('/api/oem/models/count', (req, res) => {
    console.log("Count API");
    const color = req.query.colors; 

    let sqlQuery;
    if (color) {
        sqlQuery = 'SELECT COUNT(DISTINCT model_name) AS modelCount FROM OEM_Specs WHERE colors = ?';
    } else {
        sqlQuery = 'SELECT COUNT(DISTINCT model_name) AS modelCount FROM OEM_Specs';
    }

    connection.query(sqlQuery, [color], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        const modelCount = results[0].modelCount;
        res.json({ modelCount });
    });
});


app.get('/api/oem/models/search', (req, res) => {
   
   
    console.log("Search API");
    
    // Get the search item from the request query
    const searchItem = req.query.searchitem;

    // Build a dynamic SQL query for partial matches
    const sqlQuery = `
        SELECT * FROM OEM_Specs
        WHERE manufacturer LIKE ? OR model_name LIKE ? OR year LIKE ? 
    `;

  
    connection.query(sqlQuery, [`%${searchItem}%`, `%${searchItem}%`, `%${searchItem}%`], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        if(results.length===0){
            res.json({message:'No cars Found: '});
        }
        console.log(results);
        res.send(results);
    });
});


// api on price,mileage and colors

app.get('/api/oem/models', (req, res) => {
    console.log("Cars API");
    const price = req.query.list_price ? req.query.list_price:null;
    const color = req.query.colors;
    const mileage = req.query.mileage ? req.query.mileage: null;
   
    const filters = [];

    // Build the SQL query dynamically based on the provided parameters
    let sqlQuery = 'SELECT * FROM OEM_Specs WHERE 1=1';

    // Add conditions based on the provided parameters
    if (color) {
        filters.push(color)
        sqlQuery += ' AND colors = ?' ;
    }

    if (mileage) {
        const mileageRange = mileage;
        filters.push(mileageRange[0], mileageRange[1]);
        sqlQuery += ' AND mileage BETWEEN ? AND ?';
    }
    console.log('mileage called');
    if (price) {
        const priceRange = price;
        filters.push(priceRange[0], priceRange[1]);
        sqlQuery += ' AND list_price BETWEEN ? AND ?';
    }
    console.log(sqlQuery);

    // Execute the query with the parameters
    connection.query(sqlQuery, filters, (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
    });
});




app.listen(port, ()=>{
    console.log("port is connected")
});