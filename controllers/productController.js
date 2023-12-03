const sqlite = require('sqlite3').verbose();

const db = new sqlite.Database("./database.db", sqlite.OPEN_READWRITE, err => err && console.log(err));

// CREATE RESUME
const addProduct = async (req, res) => {
    const { name, category, price, description } = req.body
    const product_image = req.imageUrl;
    sql = 'INSERT INTO products(name, category, price, description, product_image) VALUES(?,?,?,?,?)';

    db.run(sql, [name, category, price, description, req.imageUrl], async function(err){
        if(err) throw err
        res.json({productID:this.lastID, name, category, price, description, product_image})
    });
}
  
  
// GET ALL RESUMEIS
const getAllProducts = (req, res) => {
    try{
      db.all('SELECT * FROM products', [], (err, rows) => {
        if(err) throw err;
        res.json(rows)
      })
    }catch(error){
      console.log(error)
    }
}
  

module.exports = { 
    addProduct, 
    getAllProducts, 
}