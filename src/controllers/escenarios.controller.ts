import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {EscenarioDeportivo} from '../models';
import {EscenarioDeportivoRepository} from '../repositories';

export class EscenariosController {
  constructor(
    @repository(EscenarioDeportivoRepository)
    public escenarioDeportivoRepository : EscenarioDeportivoRepository,
  ) {}

  @post('/escenario-deportivos')
  @response(200, {
    description: 'EscenarioDeportivo model instance',
    content: {'application/json': {schema: getModelSchemaRef(EscenarioDeportivo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EscenarioDeportivo, {
            title: 'NewEscenarioDeportivo',
            exclude: ['id'],
          }),
        },
      },
    })
    escenarioDeportivo: Omit<EscenarioDeportivo, 'id'>,
  ): Promise<EscenarioDeportivo> {
    return this.escenarioDeportivoRepository.create(escenarioDeportivo);
  }

  @get('/escenario-deportivos/count')
  @response(200, {
    description: 'EscenarioDeportivo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(EscenarioDeportivo) where?: Where<EscenarioDeportivo>,
  ): Promise<Count> {
    return this.escenarioDeportivoRepository.count(where);
  }

  @get('/escenario-deportivos')
  @response(200, {
    description: 'Array of EscenarioDeportivo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(EscenarioDeportivo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(EscenarioDeportivo) filter?: Filter<EscenarioDeportivo>,
  ): Promise<EscenarioDeportivo[]> {
    return this.escenarioDeportivoRepository.find(filter);
  }

  @patch('/escenario-deportivos')
  @response(200, {
    description: 'EscenarioDeportivo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EscenarioDeportivo, {partial: true}),
        },
      },
    })
    escenarioDeportivo: EscenarioDeportivo,
    @param.where(EscenarioDeportivo) where?: Where<EscenarioDeportivo>,
  ): Promise<Count> {
    return this.escenarioDeportivoRepository.updateAll(escenarioDeportivo, where);
  }

  @get('/escenario-deportivos/{id}')
  @response(200, {
    description: 'EscenarioDeportivo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(EscenarioDeportivo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(EscenarioDeportivo, {exclude: 'where'}) filter?: FilterExcludingWhere<EscenarioDeportivo>
  ): Promise<EscenarioDeportivo> {
    return this.escenarioDeportivoRepository.findById(id, filter);
  }

  @patch('/escenario-deportivos/{id}')
  @response(204, {
    description: 'EscenarioDeportivo PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EscenarioDeportivo, {partial: true}),
        },
      },
    })
    escenarioDeportivo: EscenarioDeportivo,
  ): Promise<void> {
    await this.escenarioDeportivoRepository.updateById(id, escenarioDeportivo);
  }

  @put('/escenario-deportivos/{id}')
  @response(204, {
    description: 'EscenarioDeportivo PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() escenarioDeportivo: EscenarioDeportivo,
  ): Promise<void> {
    await this.escenarioDeportivoRepository.replaceById(id, escenarioDeportivo);
  }

  @del('/escenario-deportivos/{id}')
  @response(204, {
    description: 'EscenarioDeportivo DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.escenarioDeportivoRepository.deleteById(id);
  }
}
