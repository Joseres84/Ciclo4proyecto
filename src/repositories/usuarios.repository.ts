import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Usuarios, UsuariosRelations, Rol, Equipos} from '../models';
import {RolRepository} from './rol.repository';
import {EquiposRepository} from './equipos.repository';

export class UsuariosRepository extends DefaultCrudRepository<
  Usuarios,
  typeof Usuarios.prototype.id,
  UsuariosRelations
> {

  public readonly roles: HasOneRepositoryFactory<Rol, typeof Usuarios.prototype.id>;

  public readonly equipos: BelongsToAccessor<Equipos, typeof Usuarios.prototype.id>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('RolRepository') protected rolRepositoryGetter: Getter<RolRepository>, @repository.getter('EquiposRepository') protected equiposRepositoryGetter: Getter<EquiposRepository>,
  ) {
    super(Usuarios, dataSource);
    this.equipos = this.createBelongsToAccessorFor('equipos', equiposRepositoryGetter,);
    this.registerInclusionResolver('equipos', this.equipos.inclusionResolver);
    this.roles = this.createHasOneRepositoryFactoryFor('roles', rolRepositoryGetter);
    this.registerInclusionResolver('roles', this.roles.inclusionResolver);
  }
}
