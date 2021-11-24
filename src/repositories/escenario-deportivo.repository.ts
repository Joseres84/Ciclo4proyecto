import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {EscenarioDeportivo, EscenarioDeportivoRelations} from '../models';

export class EscenarioDeportivoRepository extends DefaultCrudRepository<
  EscenarioDeportivo,
  typeof EscenarioDeportivo.prototype.id,
  EscenarioDeportivoRelations
> {
  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource,
  ) {
    super(EscenarioDeportivo, dataSource);
  }
}
