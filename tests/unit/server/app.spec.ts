import request from 'supertest';

import app from '@/server/app';

describe( 'Termbox SSR', () => {
	it( 'renders the termbox when requesting /termbox', ( done ) => {
		request( app ).get( '/termbox?entity=Q3&language=de' ).then( ( response ) => {
			expect( response.status ).toBe( 200 );
			expect( response.text ).toContain( 'requested entity "Q3" in "de"' );
			done();
		} );
	} );
	it( 'renders an error when requesting /termbox without query', ( done ) => {
		request( app ).get( '/termbox' ).then( ( response ) => {
			expect( response.status ).toBe( 500 );
			expect( response.text ).toContain( 'bad things happened' );
			done();
		} );
	} );
} );
