import WikibaseRepo from '@/server/data-access/WikibaseRepo';
import mwbot from 'mwbot';
import TechnicalProblem from '@/server/data-access/error/TechnicalProblem';
import EntityNotFound from '@/server/data-access/error/EntityNotFound';
import Entity from '@/store/entity/Entity';

export default class MwBotWikibaseRepo implements WikibaseRepo {
	private bot: mwbot;

	public constructor( bot: mwbot ) {
		this.bot = bot;
	}

	public getEntity( id: string ): Promise<Entity> {
		return new Promise( ( resolve, reject ) => {
			this.bot.request( {
				ids: id,
				action: 'wbgetentities',
			} )
				.then( ( response: any ) => {
					if ( !( 'entities' in response ) ) {
						reject( new TechnicalProblem( 'wbgetentities result not well formed.' ) );
					}

					if ( !( id in response.entities ) ) {
						reject( new EntityNotFound( 'wbgetentities result does not contain relevant entity.' ) );
					}

					const entity = response.entities[ id ];

					if ( 'missing' in entity ) {
						reject( new EntityNotFound( 'Entity flagged missing in response.' ) );
					}

					resolve( entity );
				} )
				.catch( ( reason: string ) => {
					reject( new TechnicalProblem( reason ) );
				} );
		} );
	}
}
