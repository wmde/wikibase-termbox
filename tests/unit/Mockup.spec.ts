import MWConfig from '@/components/lib/mwConfig';

describe( 'mwConfig.ts', () => {
		it( 'is available', () => {
			const obj = new MWConfig();
			expect( obj.get( '' ) ).toBeInstanceOf( Object );
		} );

		it( 'contains Q64', () => {
			const obj = new MWConfig();
			expect( obj.get( 'wbEntity' ).default.id ).toMatch( 'Q64' );
		} );

		it( 'is item', () => {
			const obj = new MWConfig();
			expect( obj.get( 'wbEntity' ).default.type ).toMatch( 'item' );
		} );
} );
