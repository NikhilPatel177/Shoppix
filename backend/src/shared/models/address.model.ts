import { Schema } from 'mongoose';
import { IAddress } from '../types/IAddress.type';

export const addressSchema = new Schema<IAddress>(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    pincode: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    landmark: String,
    label: { type: String, enum: ['home', 'work'], default: 'home' },
    isDefault: { type: Boolean, default: false },
  },
  { _id: true }
);
