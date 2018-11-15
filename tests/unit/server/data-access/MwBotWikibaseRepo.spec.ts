import MwBotWikibaseRepo from '@/server/data-access/MwBotWikibaseRepo';
import mwbot from 'mwbot';
import EntityNotFound from '@/server/data-access/error/EntityNotFound';
import TechnicalProblem from '@/server/data-access/error/TechnicalProblem';
import Entity from '@/store/entity/Entity';

function newMwBotWikibaseRepo( bot: any ) {
	return new MwBotWikibaseRepo(
		bot,
	);
}

describe( 'MwBotWikibaseRepo', () => {

	it( 'can be constructed with mwbot', () => {
		expect( newMwBotWikibaseRepo( new mwbot( {} ) ) ).toBeInstanceOf( MwBotWikibaseRepo );
	} );

	describe( 'getEntity', () => {
		it( 'creates a well-formed wbgetentities query', ( done ) => {
			const entityId = 'Q42';
			const bot = {
				request: ( params: object ) => {
					expect( params ).toEqual( {
						ids: entityId,
						action: 'wbgetentities',
					} );

					return Promise.reject( 'This test focuses on the request.' );
				},
			};

			const api = newMwBotWikibaseRepo( bot );
			api.getEntity( entityId ).catch( () => {
				done();
			} );
		} );

		it( 'resolves to an Entity on success', ( done ) => {
			const entityId = 'Q3';
			const entity = {
				pageid: 3,
				ns: 120,
				title: 'Item:Q3',
				lastrevid: 1149,
				modified: '2018-07-06T10:41:48Z',
				type: 'item',
				id: 'Q3',
				labels: {
					en: { language: 'en', value: 'potato' },
					de: { language: 'de', value: 'Kartoffel' },
				},
				descriptions: {
					en: { language: 'en', value: 'a root vegetable' },
					de: { language: 'de', value: 'ein Wurzelgemüse' },
				},
				aliases: {
					en: [
						{ language: 'en', value: 'Spud' },
					],
				},
				claims: {},
				sitelinks: {},
			};
			const results = {
				entities: {
					Q3: entity,
				},
			};
			const bot = {
				request: ( params: object ) => {
					return Promise.resolve( results );
				},
			};

			const api = newMwBotWikibaseRepo( bot );
			api.getEntity( entityId ).then( ( result: Entity ) => {
				// checking for interface type not supported, yet
				// expect( result ).toBeInstanceOf( Entity );
				expect( result.id ).toEqual( entity.id );
				expect( result.labels ).toEqual( entity.labels );
				expect( result.descriptions ).toEqual( entity.descriptions );
				expect( result.aliases ).toEqual( entity.aliases );
				done();
			} );
		} );

		it( 'rejects on result missing entities key', ( done ) => {
			const entityId = 'Q3';
			const bot = {
				request: ( params: object ) => {
					return Promise.resolve( {} );
				},
			};
			const api = newMwBotWikibaseRepo( bot );
			api.getEntity( entityId ).catch( ( reason: Error ) => {
				expect( reason ).toBeInstanceOf( TechnicalProblem );
				expect( reason.message ).toEqual( 'wbgetentities result not well formed.' );
				done();
			} );
		} );

		it( 'rejects on result missing relevant entity in entities', ( done ) => {
			// this maybe is not really a thing as wbgetentities returns the entity with a 'missing' key
			const entityId = 'Q3';
			const bot = {
				request: ( params: object ) => {
					return Promise.resolve( {
						entities: {
							Q4: {
								irrelevant: 'value',
							},
						},
					} );
				},
			};
			const api = newMwBotWikibaseRepo( bot );
			api.getEntity( entityId ).catch( ( reason: Error ) => {
				expect( reason ).toBeInstanceOf( EntityNotFound );
				expect( reason.message ).toEqual( 'wbgetentities result does not contain relevant entity.' );
				done();
			} );
		} );

		it( 'rejects on result indicating relevant entity as missing in entities', ( done ) => {
			const entityId = 'Q3';
			const bot = {
				request: ( params: object ) => {
					return Promise.resolve( {
						entities: {
							Q3: {
								missing: '',
							},
						},
					} );
				},
			};
			const api = newMwBotWikibaseRepo( bot );
			api.getEntity( entityId ).catch( ( reason: Error ) => {
				expect( reason ).toBeInstanceOf( EntityNotFound );
				expect( reason.message ).toEqual( 'Entity flagged missing in response.' );
				done();
			} );
		} );

		it( 'rejects stating the reason in case of API problems', ( done ) => {
			const entityId = 'Q3';
			const bot = {
				request: ( params: object ) => {
					return Promise.reject( new Error( 'invalidjson: No valid JSON response' ) );
				},
			};
			const api = newMwBotWikibaseRepo( bot );
			api.getEntity( entityId ).catch( ( reason: Error ) => {
				expect( reason ).toBeInstanceOf( TechnicalProblem );
				expect( reason.message ).toEqual( 'Error: invalidjson: No valid JSON response' );
				done();
			} );
		} );
	} );
} );
