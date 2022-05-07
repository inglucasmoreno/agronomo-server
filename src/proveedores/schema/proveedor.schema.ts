import { Schema } from 'mongoose';

export const proveedorSchema = new Schema({

  descripcion: {
    type: String,
    uppercase: true,
    required: true,
    trim: true
  },

  tipo_identificacion: {
    type: String,
    default: '',
    trim: true
  },

  identificacion: {
    type: String,
    default: '',
    trim: true
  },

  telefono: {
    type: String,
    default: '',
    trim: true
  },

  direccion: {
    type: String,
    default: '',
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

},{ timestamps: true, collection: 'proveedores' });