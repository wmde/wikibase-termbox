import EntityRepository from '@/common/data-access/EntityRepository';
import mwbot from 'mwbot';
import TechnicalProblem from '@/common/data-access/error/TechnicalProblem';
import EntityNotFound from '@/common/data-access/error/EntityNotFound';
import FingerprintableEntity from '@/datamodel/FingerprintableEntity';
import EntityInitializer from '@/common/EntityInitializer';

export default class MwBotSpecialPageEntityRepo implements EntityRepository {
	private bot: mwbot;
	private entityInitializer: EntityInitializer;

	public constructor( bot: mwbot, entityInitializer: EntityInitializer ) {
		this.bot = bot;
		this.entityInitializer = entityInitializer;
	}

	public getFingerprintableEntity( id: string ): Promise<FingerprintableEntity> {
		return new Promise( ( resolve, reject ) => {
			this.getEntity( id )
				.then( ( entity: any ) => {
					try {
						resolve ( this.entityInitializer.newFromSerialization( entity ) );
					} catch ( e ) {
						reject( new TechnicalProblem( e.message ) );
					}
				} )
				.catch( ( reason ) => {
					reject( reason );
				} );
		} );
	}

	private getEntity( id: string ): Promise<any> {
		return new Promise( ( resolve, reject ) => {
			this.bot.request( {
			}, {
				method: 'GET',
				uri: this.bot.options.apiUrl.replace( '/api.php', `/index.php` ),
				qs: {
					title: 'Special:EntityData',
					format: 'json',
					id,
					// revision: 798248942
				},
			} )
				.then( ( response: any ) => {
					if ( !( 'entities' in response ) ) {
						reject( new TechnicalProblem( 'result not well formed.' ) );
						return;
					}

					if ( !( id in response.entities ) ) {
						reject( new EntityNotFound( 'result does not contain relevant entity.' ) );
						return;
					}

					resolve( response.entities[ id ] );
				} )
				.catch( ( reason: any ) => {
					if ( typeof reason.response === 'string' && reason.response.match( /Not Found/ ) ) {
						reject( new EntityNotFound( 'Entity flagged missing in response.' ) );
						return;
					}
					reject( new TechnicalProblem( reason ) );
				} );
		} );
	}
}
