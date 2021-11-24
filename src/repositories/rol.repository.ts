import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Rol, RolRelations, Usuarios} from '../models';
import {UsuariosRepository} from './usuarios.repository';

export class RolRepository extends DefaultCrudRepository<
  Rol,
  typeof Rol.prototype.id,
  RolRelations
> {

  public readonly usuarios: HasOneRepositoryFactory<Usuarios, typeof Rol.prototype.id>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('UsuariosRepository') protected usuariosRepositoryGetter: Getter<UsuariosRepository>,
  ) {
    super(Rol, dataSource);
    this.usuarios = this.createHasOneRepositoryFactoryFor('usuarios', usuariosRepositoryGetter);
    this.registerInclusionResolver('usuarios', this.usuarios.inclusionResolver);
  }
}
