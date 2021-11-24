import {Entity, model, property} from '@loopback/repository';

@model()
export class EscenarioDeportivo extends Entity {
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
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  actividades: string;

  @property({
    type: 'number',
    required: true,
  })
  capacidad: number;


  constructor(data?: Partial<EscenarioDeportivo>) {
    super(data);
  }
}

export interface EscenarioDeportivoRelations {
  // describe navigational properties here
}

export type EscenarioDeportivoWithRelations = EscenarioDeportivo & EscenarioDeportivoRelations;
