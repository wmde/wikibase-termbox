import EntityInitializer from '@/common/EntityInitializer';
import FingerprintableEntity from '@/datamodel/FingerprintableEntity';
import MwBotSpecialPageEntityRepo from '@/server/data-access/MwBotSpecialPageEntityRepo';
import EntityNotFound from '@/common/data-access/error/EntityNotFound';
import TechnicalProblem from '@/common/data-access/error/TechnicalProblem';
import mwbot from 'mwbot';

function newMwBotSpecialPageEntityRepo( bot: any, initializer?: any ) {
	bot.options = {
		apiUrl: 'https://www.wikidata.org/wiki/api.php',
	};
	return new MwBotSpecialPageEntityRepo(
		bot,
		initializer || {},
	);
}

describe( 'MwBotSpecialPageEntityRepo', () => {

	it( 'can be constructed with mwbot', () => {
		expect( newMwBotSpecialPageEntityRepo( new mwbot( {} ) ) )
			.toBeInstanceOf( MwBotSpecialPageEntityRepo );
	} );

	describe( 'getFingerprintableEntity', () => {
		it( 'creates a well-formed request', ( done ) => {
			const entityId = 'Q42';
			const bot = {
				request: ( params: object, customRequestOptions: object ) => {
					expect( params ).toEqual( {
					} );
					expect( customRequestOptions ).toEqual( {
						method: 'GET',
						uri: 'https://www.wikidata.org/wiki/index.php',
						qs: {
							title: 'Special:EntityData',
							format: 'json',
							id: entityId,
						},
					} );

					return Promise.reject( 'This test focuses on the request.' );
				},
			};

			const repo = newMwBotSpecialPageEntityRepo( bot );
			repo.getFingerprintableEntity( entityId ).catch( () => {
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
				request: () => {
					return Promise.resolve( results );
				},
			};

			const repo = newMwBotSpecialPageEntityRepo( bot, new EntityInitializer() );
			repo.getFingerprintableEntity( entityId ).then( ( result: FingerprintableEntity ) => {
				expect( result ).toBeInstanceOf( FingerprintableEntity );
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
				request: () => {
					return Promise.resolve( {} );
				},
			};
			const repo = newMwBotSpecialPageEntityRepo( bot );
			repo.getFingerprintableEntity( entityId ).catch( ( reason: Error ) => {
				expect( reason ).toBeInstanceOf( TechnicalProblem );
				expect( reason.message ).toEqual( 'result not well formed.' );
				done();
			} );
		} );

		it( 'rejects on result missing relevant entity in entities', ( done ) => {
			const entityId = 'Q3';
			const bot = {
				request: () => {
					return Promise.resolve( {
						entities: {
							Q4: {
								irrelevant: 'value',
							},
						},
					} );
				},
			};
			const repo = newMwBotSpecialPageEntityRepo( bot );
			repo.getFingerprintableEntity( entityId ).catch( ( reason: Error ) => {
				expect( reason ).toBeInstanceOf( EntityNotFound );
				expect( reason.message ).toEqual( 'result does not contain relevant entity.' );
				done();
			} );
		} );

		it( 'rejects on result indicating relevant entity as missing', ( done ) => {
			const entityId = 'Q3';
			const bot = {
				request: () => {
					return Promise.reject( {
						response: 'something something <h1>Not Found</h1> something',
					} );
				},
			};
			const repo = newMwBotSpecialPageEntityRepo( bot );
			repo.getFingerprintableEntity( entityId ).catch( ( reason: Error ) => {
				expect( reason ).toBeInstanceOf( EntityNotFound );
				expect( reason.message ).toEqual( 'Entity flagged missing in response.' );
				done();
			} );
		} );

		it( 'rejects stating the reason in case of API problems', ( done ) => {
			const entityId = 'Q3';
			const bot = {
				request: () => {
					return Promise.reject( new Error( 'invalidjson: No valid JSON response' ) );
				},
			};
			const repo = newMwBotSpecialPageEntityRepo( bot );
			repo.getFingerprintableEntity( entityId ).catch( ( reason: Error ) => {
				expect( reason ).toBeInstanceOf( TechnicalProblem );
				expect( reason.message ).toEqual( 'Error: invalidjson: No valid JSON response' );
				done();
			} );
		} );

		it( 'rejects stating the technical reason in case of entity initialization problem', ( done ) => {
			const entityId = 'Q3';
			const bot = {
				request: () => {
					return Promise.resolve( {
						entities: {
							Q3: {
								id: 'Q3',
							},
						},
					} );
				},
			};
			const initializer = {
				newFromSerialization: () => {
					throw new Error( 'initializer sad' );
				},
			};
			const repo = newMwBotSpecialPageEntityRepo( bot, initializer );
			repo.getFingerprintableEntity( entityId ).catch( ( reason: Error ) => {
				expect( reason ).toBeInstanceOf( TechnicalProblem );
				expect( reason.message ).toEqual( 'initializer sad' );
				done();
			} );
		} );
	} );
} );
