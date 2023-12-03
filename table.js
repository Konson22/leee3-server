
const sqlite = require('sqlite3').verbose();

const db = new sqlite.Database("./database.db", sqlite.OPEN_READWRITE, err => err && console.log(err));

const sql = `CREATE TABLE IF NOT EXISTS users (
    userID INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL
);
`

// const sql = `CREATE TABLE IF NOT EXISTS orders (
//     order_id INTEGER PRIMARY KEY,
//     product_name TEXT NOT NULL,
//     quantity TEXT NOT NULL,
//     price TEXT NOT NULL,
//     product_image TEXT NOT NULL,
//     collectionMethod TEXT NOT NULL,
//     collectionTime TEXT NOT NULL,
//     coordinate TEXT,
//     served INTEGER,
//     code INTEGER,
//     userID TEXT NOT NULL,
//     FOREIGN KEY (userID) REFERENCES users (userID)
// )`;

// const sql = `CREATE TABLE IF NOT EXISTS products (
//     productID INTEGER PRIMARY KEY,
//     name TEXT NOT NULL,
//     category TEXT,
//     price REAL NOT NULL,
//     description TEXT,
//     product_image BLOB
// )`;

db.run(sql);

// product_name, qty, price, product_image, code, served, collectionTime, 


