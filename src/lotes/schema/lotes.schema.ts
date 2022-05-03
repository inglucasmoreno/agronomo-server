import { Schema } from 'mongoose';

export const loteSchema = new Schema({

  descripcion: {
    type: String,
    uppercase: true,
    required: true,
    trim: true
  },

  campo: {
    type: Schema.Types.ObjectId,
    ref: 'campo',
    required: true,
  },

  coordenadas: {
    type: Array,
    required: true,
  },

  superficie: {
    type: Number,
    required: true,
  },
  
  color: {
    type: String,
    required: true,
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