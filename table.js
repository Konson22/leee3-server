
const sqlite = require('sqlite3').verbose();

const db = new sqlite.Database("./database.db", sqlite.OPEN_READWRITE, err => err && console.log(err));

const sql = `
CREATE TABLE IF NOT EXISTS reservations_db (
    id INTEGER PRIMARY KEY,
    product_name TEXT NOT NULL,
    qty TEXT NOT NULL,
    price TEXT NOT NULL,
    product_image TEXT NOT NULL,
    served INTEGER,
    code INTEGER
);
`
// const sql = `
// CREATE TABLE IF NOT EXISTS users (
//     userID INTEGER PRIMARY KEY,
//     name TEXT NOT NULL,
//     email TEXT NOT NULL,
//     role TEXT,
//     profile_image TEXT NOT NULL,
//     password TEXT NOT NULL
// );
// `
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
