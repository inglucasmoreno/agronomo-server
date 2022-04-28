import { Schema } from 'mongoose';

export const unidadMedidaSchema = new Schema({

  descripcion: {
    type: String,
    uppercase: true,
    required: true,
    trim: true
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

},{ timestamps: true, collection: 'unidades-medida' });