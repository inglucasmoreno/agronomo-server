import { Schema } from 'mongoose';

export const stockCamposSchema = new Schema({

  campo: {
    type: Schema.Types.ObjectId,
    ref: 'campo',
    required: true,
  },

  producto: {
    type: Schema.Types.ObjectId,
    ref: 'producto',
    required: true,
  },

  cantidad: {
    type: Number,
    default: 0,
    min: 0,
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

},{ timestamps: true, collection: 'stock-campos' });