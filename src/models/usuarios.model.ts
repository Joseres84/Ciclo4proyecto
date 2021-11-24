import {Entity, model, property, hasOne, belongsTo} from '@loopback/repository';
import {Rol} from './rol.model';
import {Equipos} from './equipos.model';

@model()
export class Usuarios extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  apellido: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'number',
    required: true,
  })
  token: number;

  @hasOne(() => Rol)
  roles: Rol;

  @belongsTo(() => Equipos)
  equiposId: string;

  @property({
    type: 'string',
  })
  rolId?: string;

  constructor(data?: Partial<Usuarios>) {
    super(data);
  }
}

export interface UsuariosRelations {
  // describe navigational properties here
}

export type UsuariosWithRelations = Usuarios & UsuariosRelations;
