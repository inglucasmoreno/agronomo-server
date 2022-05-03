import { Schema } from 'mongoose';

export const productoSchema = new Schema({

  descripcion: {
    type: String,
    uppercase: true,
    required: true,
    trim: true
  },

  unidad: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'unidad-medida'
  },

  stock_minimo: {
    type: Boolean,
    default: false    
  },

  cantidad_minima: {
    type: Number,
    default: 0
  },

  creatorUser: {
    type: Schema.Types.ObjectId,
    ref: 'usuario',
    required: true,
  },

  updatorUser: {
    type: Schema.Types.ObjectId,
    ref: 'usuario',
    required: true,
  },

  activo: {
    type: Boolean,
    default: true,
  },

},{ timestamps: true });