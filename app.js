require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

// fileupload
const fileUpload = require('express-fileupload');

// database
const connectDB = require('./db/connect');

//import router
//product router
const ProductRouter = require('./routes/productRoutes');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.static('./public')); //make a folder publicly available for the FRONTEND
app.use(express.json());
app.use(fileUpload());  //invoke fileUpload

app.get('/', (req, res) => {
  res.send('<h1>File Upload Starter</h1>');
});

//
app.use('/api/v1/products',ProductRouter);

// middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();