import { shallowMount } from '@vue/test-utils';
import EntityMockup from '@/components/lib/mwObject';
import MWConfig from '@/components/lib/mwConfig';

describe( 'mwObject.ts', () => {
		it( 'is available', () => {
			const obj = new EntityMockup();
			expect( obj.config ).toBeInstanceOf( MWConfig );
			expect( obj.config.get( '' ) ).toBeInstanceOf( Object );
		} );
} );

