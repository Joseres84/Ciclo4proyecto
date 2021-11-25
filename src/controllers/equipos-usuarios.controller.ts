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
  Equipos,
  Usuarios,
} from '../models';
import {EquiposRepository} from '../repositories';

export class EquiposUsuariosController {
  constructor(
    @repository(EquiposRepository) protected equiposRepository: EquiposRepository,
  ) { }

  @get('/equipos/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Array of Equipos has many Usuarios',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuarios)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Usuarios>,
  ): Promise<Usuarios[]> {
    return this.equiposRepository.usuarios(id).find(filter);
  }

  @post('/equipos/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Equipos model instance',
        content: {'application/json': {schema: getModelSchemaRef(Usuarios)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Equipos.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuarios, {
            title: 'NewUsuariosInEquipos',
            exclude: ['id'],
            optional: ['equiposId']
          }),
        },
      },
    }) usuarios: Omit<Usuarios, 'id'>,
  ): Promise<Usuarios> {
    return this.equiposRepository.usuarios(id).create(usuarios);
  }

  @patch('/equipos/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Equipos.Usuarios PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuarios, {partial: true}),
        },
      },
    })
    usuarios: Partial<Usuarios>,
    @param.query.object('where', getWhereSchemaFor(Usuarios)) where?: Where<Usuarios>,
  ): Promise<Count> {
    return this.equiposRepository.usuarios(id).patch(usuarios, where);
  }

  @del('/equipos/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Equipos.Usuarios DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Usuarios)) where?: Where<Usuarios>,
  ): Promise<Count> {
    return this.equiposRepository.usuarios(id).delete(where);
  }
}
