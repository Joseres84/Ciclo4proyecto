import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Torneo, TorneoRelations, Equipos, EscenarioDeportivo} from '../models';
import {EquiposRepository} from './equipos.repository';
import {EscenarioDeportivoRepository} from './escenario-deportivo.repository';

export class TorneoRepository extends DefaultCrudRepository<
  Torneo,
  typeof Torneo.prototype.id,
  TorneoRelations
> {

  public readonly equipos: HasManyRepositoryFactory<Equipos, typeof Torneo.prototype.id>;

  public readonly escenarioDeportivo: BelongsToAccessor<EscenarioDeportivo, typeof Torneo.prototype.id>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('EquiposRepository') protected equiposRepositoryGetter: Getter<EquiposRepository>, @repository.getter('EscenarioDeportivoRepository') protected escenarioDeportivoRepositoryGetter: Getter<EscenarioDeportivoRepository>,
  ) {
    super(Torneo, dataSource);
    this.escenarioDeportivo = this.createBelongsToAccessorFor('escenarioDeportivo', escenarioDeportivoRepositoryGetter,);
    this.registerInclusionResolver('escenarioDeportivo', this.escenarioDeportivo.inclusionResolver);
    this.equipos = this.createHasManyRepositoryFactoryFor('equipos', equiposRepositoryGetter,);
    this.registerInclusionResolver('equipos', this.equipos.inclusionResolver);
  }
}
