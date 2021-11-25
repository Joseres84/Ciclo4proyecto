import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Torneo,
  Equipos,
} from '../models';
import {TorneoRepository} from '../repositories';

export class TorneoEquiposController {
  constructor(
    @repository(TorneoRepository) protected torneoRepository: TorneoRepository,
  ) { }

  @get('/torneos/{id}/equipos', {
    responses: {
      '200': {
        description: 'Array of Torneo has many Equipos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Equipos)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Equipos>,
  ): Promise<Equipos[]> {
    return this.torneoRepository.equipos(id).find(filter);
  }

  @post('/torneos/{id}/equipos', {
    responses: {
      '200': {
        description: 'Torneo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Equipos)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Torneo.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Equipos, {
            title: 'NewEquiposInTorneo',
            exclude: ['id'],
            optional: ['torneoId']
          }),
        },
      },
    }) equipos: Omit<Equipos, 'id'>,
  ): Promise<Equipos> {
    return this.torneoRepository.equipos(id).create(equipos);
  }

  @patch('/torneos/{id}/equipos', {
    responses: {
      '200': {
        description: 'Torneo.Equipos PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Equipos, {partial: true}),
        },
      },
    })
    equipos: Partial<Equipos>,
    @param.query.object('where', getWhereSchemaFor(Equipos)) where?: Where<Equipos>,
  ): Promise<Count> {
    return this.torneoRepository.equipos(id).patch(equipos, where);
  }

  @del('/torneos/{id}/equipos', {
    responses: {
      '200': {
        description: 'Torneo.Equipos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Equipos)) where?: Where<Equipos>,
  ): Promise<Count> {
    return this.torneoRepository.equipos(id).delete(where);
  }
}
