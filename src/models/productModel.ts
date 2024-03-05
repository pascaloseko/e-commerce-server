import mongoose, { Schema, Document } from 'mongoose';

export interface IReview {
  name: string;
  rating: number;
  comment: string;
  user: {};
}

const reviewSchema: Schema = new Schema({
  name: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
}, {
  timestamps: true,
},
);

interface IProduct extends Document {
  user: {};
  name: string;
  image: string;
  brand: string;
  category: string;
  description: string;
  reviews: [IReview];
  rating: number;
  numReviews: number;
  price: number;
  countInStock: number;
}

const productSchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  reviews: [reviewSchema],
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  numReviews: {
    type: Number,
    required: true,
    default: 0,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  countInStock: {
    type: Number,
    required: true,
    default: 0,
  },
},
{
  timestamps: true,
});

export default mongoose.model<IProduct>('Product', productSchema);