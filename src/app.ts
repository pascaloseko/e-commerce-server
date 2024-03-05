import { errorHandler, notFound } from './middlewares';
import path from 'path';
import express from 'express';
import morgan from 'morgan';
import connectDB from './config/db';
import dotenv from 'dotenv';
import userRoutes from './api/userRoutes';
import orderRoutes from './api/orderRoutes';
import uploadRoutes from './api/uploadRoutes';
import router from './api/productRoutes';

dotenv.config();
connectDB();
const app = express();

if (process.env.NODE_ENV === 'development') {

  app.use(morgan('dev'));
}

app.use(express.json());

//Product rendering in server route
// this route  Move In productsRoutes
//single product rendering in server route
// this route Move In productsRoutes
app.use('/api/products', router);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);


app.get('/api/config/paypal', (req, res)=>
  res.send(process.env.PAYPAL_CLIENT_ID),
);

const dirName = path.resolve();
app.use('/uploads', express.static(path.join(dirName, '/uploads')));

app.use(notFound);
app.use(errorHandler);

export default app;
