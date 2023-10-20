
const sqlite = require('sqlite3').verbose();

const db = new sqlite.Database("./database.db", sqlite.OPEN_READWRITE, err => err && console.log(err));

const sql = `
CREATE TABLE IF NOT EXISTS users (
    userID INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT,
    password TEXT NOT NULL
);
`
// const sql = `CREATE TABLE IF NOT EXISTS products (
//     productID INTEGER PRIMARY KEY,
//     name TEXT NOT NULL,
//     category TEXT,
//     quantity INTEGER NOT NULL,
//     price REAL NOT NULL,
//     description TEXT,
//     product_image BLOB
// )`;

db.run(sql);