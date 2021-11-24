import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Equipos, EquiposRelations} from '../models';

export class EquiposRepository extends DefaultCrudRepository<
  Equipos,
  typeof Equipos.prototype.id,
  EquiposRelations
> {
  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource,
  ) {
    super(Equipos, dataSource);
  }
}
