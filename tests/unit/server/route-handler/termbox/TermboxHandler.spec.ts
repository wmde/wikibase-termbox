import TermboxHandler from '@/server/route-handler/termbox/TermboxHandler';
import EntityInitializer from '@/common/EntityInitializer';
import mockQ64 from '@/mock-data/data/Q64_data.json';
import TermboxRequest from '@/common/TermboxRequest';
import FingerprintableEntity from '@/datamodel/FingerprintableEntity';
import InvalidRequest from '@/server/route-handler/termbox/error/InvalidRequest';
import ApiTechnicalProblem from '@/server/data-access/error/TechnicalProblem';
import ApiEntityNotFound from '@/server/data-access/error/EntityNotFound';
import EntityNotFound from '@/server/route-handler/termbox/error/EntityNotFound';
import TechnicalProblem from '@/server/route-handler/termbox/error/TechnicalProblem';

function newTermboxHandler( api: any, initializer: any ) {
	return new TermboxHandler( api, initializer );
}

describe( 'TermboxHandler', () => {
	describe( 'createTermboxRequest', () => {
		it( 'resolves to TermboxRequest on valid request', ( done ) => {
			const entity = 'Q64';
			const language = 'de';
			const api = {
				getEntity: ( id: string ) => {
					return Promise.resolve( mockQ64 );
				},
			};
			const initializer = new EntityInitializer();

			const requestParser = newTermboxHandler( api, initializer );
			requestParser.createTermboxRequest( { entity, language } )
				.then( ( termboxRequest: TermboxRequest ) => {
					expect( termboxRequest ).toBeInstanceOf( TermboxRequest );
					expect( termboxRequest.language ).toEqual( language );
					expect( termboxRequest.entity ).toBeInstanceOf( FingerprintableEntity );
					expect( termboxRequest.entity.id ).toEqual( entity );
					done();
				} );
		} );

		it( 'rejects when failing to validate request', ( done ) => {
			// todo More data sets
			/*
			{ entity: 'Q3' }, // language missing
			{ language: 'de' }, // entity missing
			{ entity: '', language: '' }, // empty strings
			{ entity: 'randomstring', language: 'de' }, // random entity
			*/
			const request = { entity: '', language: '' };
			const requestParser = newTermboxHandler( {}, {} );

			requestParser.createTermboxRequest( request )
				.catch( ( reason: Error ) => {
					expect( reason ).toBeInstanceOf( InvalidRequest );
					done();
				} );
		} );

		it( 'rejects when failing to complete API request', ( done ) => {
			const entity = 'Q3';
			const language = 'de';
			const api = {
				getEntity: ( entityId: string ) => {
					return Promise.reject( new ApiTechnicalProblem( 'some technical api problem' ) );
				},
			};

			const initializer = new EntityInitializer();

			const requestParser = newTermboxHandler( api, initializer );
			requestParser.createTermboxRequest( { entity, language } )
				.catch( ( reason: Error ) => {
					expect( reason ).toBeInstanceOf( TechnicalProblem );
					expect( reason.message ).toEqual( 'some technical api problem' );
					done();
				} );
		} );

		it( 'rejects when failing to find entity in API', ( done ) => {
			const entity = 'Q3';
			const language = 'de';
			const api = {
				getEntity: ( entityId: string ) => {
					return Promise.reject( new ApiEntityNotFound( 'Entity flagged missing in response.' ) );
				},
			};

			const initializer = new EntityInitializer();

			const requestParser = newTermboxHandler( api, initializer );
			requestParser.createTermboxRequest( { entity, language } )
				.catch( ( reason: Error ) => {
					expect( reason ).toBeInstanceOf( EntityNotFound );
					expect( reason.message ).toEqual( 'Entity flagged missing in response.' );
					done();
				} );
		} );

		it( 'rejects when failing to initialize entity from api response', ( done ) => {
			const entity = 'Q3';
			const language = 'de';
			const api = {
				getEntity: ( id: string ) => {
					return Promise.resolve( {
						i: 'not an entity',
					} );
				},
			};
			const initializer = new EntityInitializer();

			const requestParser = newTermboxHandler( api, initializer );
			requestParser.createTermboxRequest( { entity, language } )
				.catch( ( reason: Error ) => {
					expect( reason ).toBeInstanceOf( TechnicalProblem );
					expect( reason.message ).toEqual( 'Could not initialize entity. invalid entity serialization' );
					done();
				} );
		} );
	} );
} );
