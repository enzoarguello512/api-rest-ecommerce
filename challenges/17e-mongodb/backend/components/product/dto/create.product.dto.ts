import mongoose from 'mongoose';

export interface ICreateProductDto extends mongoose.Document {
  id: string;
  timestamp: string;
  name: string;
  description?: string;
  productCode?: number;
  thumbnailUrl?: string;
  price: number;
  stock: number;
}