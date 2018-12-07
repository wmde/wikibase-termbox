import request from 'supertest';
import mockQ64 from '@/mock-data/data/Q64_data.json';
import app from '@/server/app';
import nock from 'nock';
import { config } from '@/server/TermboxConfig';
import 'jest-dom/extend-expect';
import HttpStatus from 'http-status-codes';

const wikibaseRepoApi = new URL( config.getWikibaseRepoApi() );

const WIKIBASE_TEST_API_HOST = wikibaseRepoApi.origin;
const WIKIBASE_TEST_API_PATH = wikibaseRepoApi.pathname;

const germanInGerman = 'Deutsch';
const englishInGerman = 'Englisch';
const arabicInGerman = 'Arabic';

function getDomFromMarkup( markup: string ): HTMLElement {
	const newNode = document.createElement( 'div' );
	newNode.innerHTML = markup;
	return newNode;
}

function nockSuccessfulLanguageTranslationLoading( inLanguage: string ) {
	nock( WIKIBASE_TEST_API_HOST )
		.post( WIKIBASE_TEST_API_PATH + '?format=json', {
			action: 'query',
			meta: 'wbcontentlanguages',
			wbclcontext: 'term',
			wbclprop: 'code|name',
			uselang: inLanguage,
		} )
		.reply( HttpStatus.OK, {
			batchcomplete: '',
			query: {
				wbcontentlanguages: {
					en: {
						code: 'en',
						name: englishInGerman,
					},
					de: {
						code: 'de',
						name: germanInGerman,
					},
					ar: {
						code: 'ar',
						name: arabicInGerman,
					},
				},
			},
		} );
}

function nockSuccessfulEntityLoading( entityId: string ) {
	nock( WIKIBASE_TEST_API_HOST )
		.post( WIKIBASE_TEST_API_PATH + '?format=json', {
			ids: entityId,
			action: 'wbgetentities',
		} )
		.reply( HttpStatus.OK, {
			entities: {
				[ entityId ]: mockQ64, // TODO build dynamic mock response if needed
			},
		} );
}

describe( 'Termbox SSR', () => {
	afterEach( () => {
		nock.cleanAll();
		nock.enableNetConnect();
	} );

	it( 'renders Server Error when requesting /termbox and entity backend emits malformed response', ( done ) => {
		const entityId = 'Q64';
		const language = 'de';

		nock( WIKIBASE_TEST_API_HOST )
			.post( WIKIBASE_TEST_API_PATH + '?format=json', {
				ids: entityId,
				action: 'wbgetentities',
			} )
			.reply( HttpStatus.OK, {
				malformed: 'yes',
			} );

		request( app ).get( '/termbox' ).query( { entity: entityId, language } ).then( ( response ) => {
			expect( response.status ).toBe( HttpStatus.INTERNAL_SERVER_ERROR );
			expect( response.text ).toContain( 'Technical problem' );
			done();
		} );
	} );

	it( 'renders Server Error when requesting /termbox and entity backend request fails', ( done ) => {
		const entityId = 'Q64';
		const language = 'de';

		nock( WIKIBASE_TEST_API_HOST )
			.post( WIKIBASE_TEST_API_PATH + '?format=json', {
				ids: entityId,
				action: 'wbgetentities',
			} )
			.reply( HttpStatus.INTERNAL_SERVER_ERROR, 'upstream system error' );

		request( app ).get( '/termbox' ).query( { entity: entityId, language } ).then( ( response ) => {
			expect( response.status ).toBe( HttpStatus.INTERNAL_SERVER_ERROR );
			expect( response.text ).toContain( 'Technical problem' );
			done();
		} );
	} );

	it( 'renders Server Error when requesting /termbox and language translation backend request fails', ( done ) => {
		const entityId = 'Q64';
		const language = 'de';

		nock( WIKIBASE_TEST_API_HOST )
			.post( WIKIBASE_TEST_API_PATH + '?format=json', {
				action: 'query',
				meta: 'wbcontentlanguages',
				wbclcontext: 'term',
				wbclprop: 'code|name',
				uselang: language,
			} )
			.reply( HttpStatus.INTERNAL_SERVER_ERROR, 'upstream system error' );
		nockSuccessfulEntityLoading( entityId );

		request( app ).get( '/termbox' ).query( { entity: entityId, language } ).then( ( response ) => {
			expect( response.status ).toBe( HttpStatus.INTERNAL_SERVER_ERROR );
			expect( response.text ).toContain( 'Technical problem' );
			done();
		} );
	} );

	it( 'renders Bad Request when requesting /termbox without well-formed query', ( done ) => {
		request( app ).get( '/termbox' ).then( ( response ) => {
			expect( response.status ).toBe( HttpStatus.BAD_REQUEST );
			expect( response.text ).toContain( 'Bad request' );
			done();
		} );
	} );

	it( 'renders Not found when requesting /termbox with well-formed query for unknown entity', ( done ) => {
		const entityId = 'Q63';
		const language = 'de';

		nockSuccessfulLanguageTranslationLoading( 'de' );
		nock( WIKIBASE_TEST_API_HOST )
			.post( WIKIBASE_TEST_API_PATH + '?format=json', 'ids=Q63&action=wbgetentities' )
			.reply( HttpStatus.OK, {
				entities: {
					[ entityId ]: {
						missing: '',
					},
				},
			} );

		request( app ).get( '/termbox' ).query( { entity: entityId, language } ).then( ( response ) => {
			expect( response.status ).toBe( HttpStatus.NOT_FOUND );
			expect( response.text ).toContain( 'Entity not found' );
			done();
		} );
	} );

	it( 'renders the termbox when requesting /termbox with well-formed query for known entity', ( done ) => {
		const entityId = 'Q64';
		const language = 'de';

		nockSuccessfulLanguageTranslationLoading( language );
		nockSuccessfulEntityLoading( entityId );

		request( app ).get( '/termbox' ).query( { entity: entityId, language } ).then( ( response ) => {
			expect( response.status ).toBe( HttpStatus.OK );

			const $dom = getDomFromMarkup( response.text );

			const termboxVersions = $dom.querySelectorAll( '.wikibase-termbox' );

			// 3 hard coded languages currently in src/store/language/actions.ts
			expect( termboxVersions.length ).toBe( 3 );

			const primaryLanguage = termboxVersions.item( 0 );

			expect( primaryLanguage ).toHaveClass( 'wikibase-termbox--primaryLanguage' );
			expect( primaryLanguage ).toBeVisible();

			expect( primaryLanguage.querySelector( '.wikibase-termbox__language' ) )
				.toHaveTextContent( germanInGerman );

			expect( primaryLanguage.querySelector( '.wikibase-termbox__label' ) )
				.toHaveTextContent( mockQ64.labels.de.value );
			expect( primaryLanguage.querySelector( '.wikibase-termbox__description' ) )
				.toHaveTextContent( mockQ64.descriptions.de.value );
			expect( primaryLanguage.querySelectorAll( '.wikibase-termbox__aliases li' ).length )
				.toBe( mockQ64.aliases.de.length );

			expect( termboxVersions.item( 1 ).querySelector( '.wikibase-termbox__language' ) )
				.toHaveTextContent( englishInGerman );

			expect( termboxVersions.item( 2 ).querySelector( '.wikibase-termbox__language' ) )
				.toHaveTextContent( arabicInGerman );

			done();
		} );
	} );
} );
