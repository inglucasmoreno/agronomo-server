import { Schema } from 'mongoose';

export const ingresoProductoSchema = new Schema({

  ingreso: {
    type: Schema.Types.ObjectId,
    ref: 'ingreso',
    required: true,
  },

  producto: {
    type: Schema.Types.ObjectId,
    ref: 'producto',
    required: true,
  },

  cantidad: {
    type: Number,
    min: 0,
    default: 0,
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

},{ timestamps: true, collection: 'ingreso-productos' });