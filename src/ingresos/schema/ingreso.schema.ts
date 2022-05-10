import { Schema } from 'mongoose';

export const ingresoSchema = new Schema({

  nro_remito: {
    type: String,
    required: true,
    trim: true
  },

  proveedor: {
    type: Schema.Types.ObjectId,
    ref: 'proveedor',
    required: true,
  },

  campo: {
    type: Schema.Types.ObjectId,
    ref: 'campo',
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

},{ timestamps: true, collection: 'ingresos' });