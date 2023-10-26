const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const usersRoute = require('./roues/auth');
const productsRoutes = require('./roues/products');
const fileUpload = require('express-fileupload');


const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
// app.use(cors({origin: ['https://asrbites.onrender.com/', 'http://localhost:3000'], methods: ["GET", "POST"], credentials: true }));

app.use(express.static('uploads'));


app.use('/auth', usersRoute);
app.use('/products', productsRoutes);

const PORT = process.env.PORT || 3001

app.listen(PORT, () => console.log(`running on ${PORT}`));

