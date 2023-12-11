const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const ordersRoute = require('./routes/orders');
const authRoute = require('./routes/auth');
const productsRoutes = require('./routes/products');
// const fileUpload = require('express-fileupload');

const app = express();

app.use(cors({origin: ['http://localhost:3000', 'https://leee3.onrender.com', 'https://asrbites.onrender.com'], credentials: true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static('uploads'));


app.use('/auth', authRoute);
app.use('/orders', ordersRoute);
app.use('/products', productsRoutes);

const PORT = process.env.PORT || 3001

app.listen(PORT, () => console.log(`running on ${PORT}`));

