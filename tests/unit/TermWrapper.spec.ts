import TermObjectWrapper from '@/components/lib/termObjectWrapper';
import * as MockData from '@/mock-data/data/Q64_data.json';

const Wrapper = new TermObjectWrapper( JSON.stringify( MockData.default ) );

describe( 'TermObjectWrapper.ts', () => {
	it( 'has a id', () => {
		expect( Wrapper.getId() ).toMatch( MockData.default.id );
	} );

	it( 'has a term type', () => {
		expect( Wrapper.getType() ).toMatch( MockData.default.type );

	} );

	it( 'is a item', () => {
		expect( Wrapper.isItem() ).toBe( MockData.default.type === 'item' );
	} );

	it( 'has labels', () => {
		expect( Wrapper.getLabels() ).toStrictEqual( MockData.default.labels );
	} );

	it( 'has labels by languageKey', () => {
		expect( Wrapper.getLabelByLanguageKey( 'de' ) ).toStrictEqual( MockData.default.labels.de.value );
	} );

	it( 'returns empty array if key not exists', () => {
		expect( Wrapper.getLabelByLanguageKey( 'thisNotGonnaWork' ) ).toEqual( [] );
	} );

	it( 'has aliases', () => {
		expect( Wrapper.getAliases() ).toStrictEqual( MockData.default.aliases );
	} );
	/**
	 * TODO
	 * Exception cases
	 * alias by key
	 */
} );
