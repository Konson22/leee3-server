const sqlite = require('sqlite3').verbose();

const db = new sqlite.Database("./database.db", sqlite.OPEN_READWRITE, err => err && console.log(err));



// CREATE RESUME
const addProduct = async (req, res) => {
  const { name, category, qty, price, description } = req.body

  const product_image = req.imageUrl;

  sql = 'INSERT INTO products(name, category, quantity, price, description, product_image) VALUES(?, ?,?,?,?,?)';

  db.run(sql, [name, category, qty, price, description, req.imageUrl], async err => {
    if(err) throw err
    res.json({name, category, qty, price, description, product_image})
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

const date = Date.now()

console.log(date)
const addReserveProduct = async (req, res) => {
  const { code, cartData } = req.body
  
  cartData.forEach(el => {
    sql = 'INSERT INTO reservation_table(product_name, qty, price, product_image, code, status, userId) VALUES(?,?,?,?,?,?,?)';
    
    db.run(sql, [el.name, el.qty, el.price, el.product_image, code, false, userId], async err => {
      if(err) throw err
    });
  });
  console.log('Done!')
  res.json({done:true});
}

const getReserveProducts = (req, res) => {
  try{
    db.all('SELECT * FROM reservation_table', [], (err, rows) => {
      if(err) throw err;
      res.json(rows)
    })

  }catch(error){
    console.log(error)
  }
}


module.exports = { addProduct, getAllProducts, getReserveProducts, addReserveProduct }




const data = [
    {
      name:'Lizzie',
      text:`:
      made from sugar, corn syrup, and flavorings.
      with lollipops, peppermint candies, and butterscotch candies.`,
      image:'/lizzie.jpeg'
    },
    {
      name:'Pistachio',
      text:`:
      made from sugar, corn syrup, and flavorings.
      with lollipops, peppermint candies, and butterscotch candies.`,
      image:'/pistachio.jpeg'
    },
    {
      name:'Caramels',
      text:`
        Soft candies have a chewy or gummy texture. with gummy bears, fruit chews, and licorice.
     `,
      image:'/brano2.jpeg'
    },
    {
      name:'Flavory',
      text:`
        Jelly candies are soft and gel-like, often made from fruit juice or puree.
        Examples include jellybeans and gumdrops.
     `,
      image:'/flavory.jpeg'
    },
    {
      name:'Cube',
      text:`
        These candies contain various types of nuts, often coated in sugar or chocolate.
        Examples include almond clusters and peanut butter cups.
     `,
      image:'/cube3.jpeg'
    },
    {
      name:'Cuormet',
      text:`
        These candies contain various types of nuts, often coated in sugar or chocolate.
        Examples include almond clusters and peanut butter cups.
     `,
      image:'/cuormet.jpeg'
    },
    {
      name:'Truffelino',
      text:`
        These candies contain various types of nuts, often coated in sugar or chocolate.
        Examples include almond clusters and peanut butter cups.
     `,
      image:'/truffelino.jpeg'
    },
    {
      name:'Dimond',
      text:`
        These candies contain various types of nuts, often coated in sugar or chocolate.
        Examples include almond clusters and peanut butter cups.
     `,
      image:'/dimond.jpeg'
    },
    {
      name:'Mini Glumour',
      text:`
        These candies contain various types of nuts, often coated in sugar or chocolate.
        Examples include almond clusters and peanut butter cups.
     `,
      image:'/mini-glumour.jpeg'
    },
  ]

  // db.run('UPDATE products set price = "15"')
//   data.forEach(item => {
//     sql = 'INSERT INTO products(name, category, quantity, price, description, product_image) VALUES(?, ?,?,?,?,?)';

//     db.run(sql, [item.name, item.name, 260, '20 SAR', item.text, item.image], async err => {
//         if(err) throw err
//         console.log(item.name, item.name, 260, '20 SAR', item.text, item.image)
//     });
// })