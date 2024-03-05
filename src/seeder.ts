import dotenv from 'dotenv';
import connectDB from './config/db';
import OrderModel from './models/orderModel';
import ProductModel from './models/productModel';
import UserModel from './models/userModel';
import users from './data/users';
import products from './data/products';
import Color from 'color';


dotenv.config();
connectDB();

const color = Color('#7743CE').alpha(0.5).lighten(0.5);

const importData = async (): Promise<void> => {
  try {
    await OrderModel.deleteMany();
    await ProductModel.deleteMany();
    await UserModel.deleteMany();

    const createdUsers = await UserModel.insertMany(users);
    const adminUser = createdUsers[0]._id;
    const sampleProducts = products.map(product => {
      return { ...product, user: adminUser };
    });

    await ProductModel.insertMany(sampleProducts);
    console.log('Data Imported !', color.red());
    process.exit();
  } catch (error) {
    console.error(`${error}`, color.red());
    process.exit(1);
  }
};

const destroyData = async (): Promise<void> => {
  try {
    await OrderModel.deleteMany();
    await ProductModel.deleteMany();
    await UserModel.deleteMany();

    console.log('Data Destroy!', color.red());
    process.exit();
  } catch (error) {
    console.error(`${error}`, color.red());
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}