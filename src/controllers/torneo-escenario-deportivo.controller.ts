import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Torneo,
  EscenarioDeportivo,
} from '../models';
import {TorneoRepository} from '../repositories';

export class TorneoEscenarioDeportivoController {
  constructor(
    @repository(TorneoRepository)
    public torneoRepository: TorneoRepository,
  ) { }

  @get('/torneos/{id}/escenario-deportivo', {
    responses: {
      '200': {
        description: 'EscenarioDeportivo belonging to Torneo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(EscenarioDeportivo)},
          },
        },
      },
    },
  })
  async getEscenarioDeportivo(
    @param.path.string('id') id: typeof Torneo.prototype.id,
  ): Promise<EscenarioDeportivo> {
    return this.torneoRepository.escenarioDeportivo(id);
  }
}
