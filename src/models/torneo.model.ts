import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Equipos} from './equipos.model';
import {EscenarioDeportivo} from './escenario-deportivo.model';

@model()
export class Torneo extends Entity {
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
  tipo: string;

  @property({
    type: 'string',
    required: true,
  })
  municipio: string;

  @property({
    type: 'string',
  })
  listaEquipos?: string;

  @hasMany(() => Equipos)
  equipos: Equipos[];

  @belongsTo(() => EscenarioDeportivo)
  escenarioDeportivoId: string;

  constructor(data?: Partial<Torneo>) {
    super(data);
  }
}

export interface TorneoRelations {
  // describe navigational properties here
}

export type TorneoWithRelations = Torneo & TorneoRelations;
