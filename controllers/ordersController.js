const sqlite = require('sqlite3').verbose();

const db = new sqlite.Database("./database.db", sqlite.OPEN_READWRITE, err => err && console.log(err));

// GET ALL ORDERS
const getAllOrders = (req, res) => {
    try{
      db.all('SELECT * FROM orders ORDER BY collectionTime DESC', [], (err, rows) => {
        if(err) throw err;
        res.json(rows)
      })
    }catch(error){
      console.log(error)
    }
}

// ADD NEW ORDER TO DATABASE
const addOrder = async function(req, res){
  const code = generateRandomCode()
  const { cartData, collectionTime, collectionMethod, userName, userID } = req.body
  const price = cartData.map(i => i.price).reduce((a, t) => +a + +t)
  const coordinate = null

  try {
    cartData.forEach(el => {
      sql = 'INSERT INTO orders(product_name, quantity, price, product_image, collectionMethod, collectionTime, coordinate, served, code, userID) VALUES(?,?,?,?,?,?,?,?,?,?)';
      db.run(sql, [el.name, el.qty, el.price, el.product_image, collectionMethod, collectionTime, coordinate, false, code, userID], async err => {
        if(err) throw err
      });
    });
    res.json({userName, code, items:cartData.length, price, collectionTime, collectionMethod});
  } catch (error) {
    res.status(500).json({done:false});
  }
}

// GET USER SINGLE ORDER
const getUserOrders = (req, res) => {
  try{
    db.all(`SELECT * FROM orders WHERE userID = ${req.body.userID}`, [], (err, rows) => {
      if(err) throw err;
      res.json(rows)
    })
  }catch(error){
    console.log(error)
  }
}

// GET USER SINGLE ORDER
const getOrderDetail = (req, res) => {
  try{
    db.all(`SELECT * FROM orders WHERE code = ${req.body.orderCode}`, [], (err, rows) => {
      if(err) throw err;
      res.json(rows)
    })
  }catch(error){
    console.log(error)
  }
}

// DELETE ORDER
const deleteOrder = (req, res) => {
  try{
    db.all(`DELETE FROM orders WHERE code = '${req.body.code}'`, (err) => {
      if(err) throw err;
      res.json(req.body.code)
    })
  }catch(error){
    console.log(error)
  }
}
function generateCode(){
  return Math.floor(1000 + Math.random() * 9000);
}

function generateRandomCode() {
  const characters = 'ABC0123456789DEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}


module.exports = { getAllOrders, getUserOrders, getOrderDetail, addOrder, deleteOrder }