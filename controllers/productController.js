const sqlite = require('sqlite3').verbose();

const db = new sqlite.Database("./database.db", sqlite.OPEN_READWRITE, err => err && console.log(err));



// CREATE RESUME
const addProduct = async (req, res) => {
  const { name, category, qty, price, description } = req.body

  const product_image = req.imageUrl;

  sql = 'INSERT INTO products(name, category, quantity, price, description, product_image) VALUES(?, ?,?,?,?,?)';

  db.run(sql, [name, category, qty, price, description, req.imageUrl], async function(err){
    if(err) throw err
    res.json({productID:this.lastID, name, category, qty, price, description, product_image})
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


const addReserveProduct = async function(req, res){
  const code = generateCode()

  try {
    req.body.forEach(el => {
      sql = 'INSERT INTO reservations_db(product_name, qty, price, product_image, code, served) VALUES(?,?,?,?,?,?)';
      
      db.run(sql, [el.name, el.qty, el.price, el.product_image, code, false], async err => {
        if(err) throw err
      });
    });
    res.json({done:true, code});
  } catch (error) {
    res.status(500).json({done:false});
  }
}

function generateCode(){
  return Math.floor(1000 + Math.random() * 9000);
}

const getReserveProducts = (req, res) => {
  try{
    db.all('SELECT * FROM reservations_db', [], (err, rows) => {
      if(err) throw err;
      res.json(rows)
    })

  }catch(error){
    console.log(error)
  }
}

// GET SIGNLE RESERVE
const getSingleReserve = (req, res) => {
  try{
    db.all(`SELECT * FROM reservations_db WHERE code = ${req.body.code}`, (err, rows) => {
      if(err) throw err;
      res.json(rows)
    })
  }catch(error){
    console.log(error)
  }
}


// db.run("delete from reservations_db")
// db.run("ALTER TABLE reservations_db RENAME COLUMN isServed TO served")

const checkoutReserve = (req, res) => {
  try{
    db.run(`UPDATE reservations_db SET served = 1 WHERE code = ${req.body.code}`, (err) => {
      if(err) throw err;
    })
    console.log('Done...........')
    res.json('done')
  }catch(error){
    console.log(error)
  }
}


module.exports = { 
  addProduct, 
  getAllProducts, 
  getReserveProducts, 
  addReserveProduct, 
  getSingleReserve, 
  checkoutReserve 
}

