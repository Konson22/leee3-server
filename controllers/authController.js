const sqlite = require('sqlite3').verbose();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createToken } = require('../midlewares/jwt');
require('dotenv').config();


const db = new sqlite.Database("./database.db", sqlite.OPEN_READWRITE, err => err && console.log(err));


// const q = 'DROP TABLE users'

// db.run(q)
const authUser = async (req, res) => {
    try{
        res.json(req.user)
    }catch(error){
        res.status(404).send(error)
    }
}


// async function add(){
//     const hashPass = await bcryptjs.hash('12345', 4);
//     sql = 'INSERT INTO users_table(name, email, password) VALUES(?,?,?)'
//     db.run(sql, ['Migi', 'migdadlylast@gmail.com', hashPass], async err => {
//         if(err) throw err
//         console.log('created..................................')
//     })
// }

// add()


// LOGIN USER
const loginUser = (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password)
        db.get(`SELECT * FROM users_table WHERE email='${email}'`, async (err, user) => {
            if(err) throw err;
            if(!user) return res.status(404).send('Wrong Email!')
            const verified = await bcryptjs.compare(password, user.password)
            if(!verified){
                return res.status(409).send('Wrong Password!')
            }
            const userCredentials = {id:user.id, name:user.name, email:user.email}
            const ACCESS_TOKEN = await createToken(userCredentials);
            res.cookie('ACCESS_TOKEN', ACCESS_TOKEN, {
                expires: new Date(Date.now() + (3600 * 1000 * 24 * 180 * 1)),
                httpOnly: true,
                sameSite: "none",
                secure: 'false',
            });
            res.json(userCredentials)
        })
    } catch (error) {
       res.send('Server Side Error...!')
    }
}

// db.run('delete from users')
// RESGISTER NEW USER
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        db.get(`SELECT * FROM users WHERE email='${email}'`, async (err, user) => {
            if(err) throw err;
            if(user){
                res.status(409).send('Already registered!')
            }else{
                const profleImage = 'http://localhost:3001/user.png'
                const hashPass = await bcryptjs.hash(password, 4);
                sql = 'INSERT INTO users(name, email, role, profile_image, password) VALUES(?,?,?,?,?)'
                db.run(sql, [name, email, 0x0, profleImage, hashPass], async err => {
                    if(err) throw err
                    const userCredentials = {id:Date.now(), name, email, profile_image:profleImage}
                    const ACCESS_TOKEN = await createToken(userCredentials);
                    res.cookie('ACCESS_TOKEN', ACCESS_TOKEN, {
                        expires: new Date(Date.now() + (3600 * 1000 * 24 * 180 * 1)),
                        httpOnly: true,
                        sameSite: "none",
                        secure: 'false',
                    });
                    res.json(userCredentials)
                })
            }
        })
    } catch (error) {
        res.send('Error')
     console.log(error)   
    }
}

const getAllUsersController = (req, res) => {
    try{
        db.all('SELECT * FROM users_table', [], (err, rows) => {
            if(err) throw err;
            res.json(rows)
        })

    }catch(error){
        console.log(error)
    }
}


module.exports = { 
    getAllUsersController, 
    registerUser, 
    authUser,
    loginUser,
}
