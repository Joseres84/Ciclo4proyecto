import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Usuarios,
  Equipos,
} from '../models';
import {UsuariosRepository} from '../repositories';

export class UsuariosEquiposController {
  constructor(
    @repository(UsuariosRepository)
    public usuariosRepository: UsuariosRepository,
  ) { }

  @get('/usuarios/{id}/equipos', {
    responses: {
      '200': {
        description: 'Equipos belonging to Usuarios',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Equipos)},
          },
        },
      },
    },
  })
  async getEquipos(
    @param.path.string('id') id: typeof Usuarios.prototype.id,
  ): Promise<Equipos> {
    return this.usuariosRepository.equipos(id);
  }
}
