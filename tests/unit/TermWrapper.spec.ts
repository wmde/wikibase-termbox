import TermObjectWrapper from '@/components/lib/termObjectWrapper';
<<<<<<< HEAD
import InvalidTermException from '@/components/lib/exceptions/invalidTermException';
import * as MockData from '@/mock-data/data/Q64_data.json';

const Wrapper = new TermObjectWrapper( JSON.stringify( MockData.default ) );
const EmptyWrapper = new TermObjectWrapper( '{"id":"Q123", "type":"item" }' );

describe( 'TermObjectWrapper.ts', () => {
	it( 'throws an error when the term has no id', () => {
		expect( () => {
			const dummy = new TermObjectWrapper( '' );
		} ).toThrowError( InvalidTermException );

		expect( () => {
			const dummy = new TermObjectWrapper( '{}' );
		} ).toThrowError( InvalidTermException );

		expect( () => {
			const dummy = new TermObjectWrapper( 'justATest' );
		} ).toThrowError( SyntaxError );
	} );

	it( 'throws an error when the term has no type', () => {
		expect( () => {
			const dummy = new TermObjectWrapper( '{"id": "Q123"}' );
		} ).toThrowError( InvalidTermException );
	} );

=======
import * as MockData from '@/mock-data/data/Q64_data.json';

const Wrapper = new TermObjectWrapper( JSON.stringify( MockData.default ) );

describe( 'TermObjectWrapper.ts', () => {
>>>>>>> 37a34333ec0c7d85f3e4fcc14803e53294eba7db
	it( 'has a id', () => {
		expect( Wrapper.getId() ).toMatch( MockData.default.id );
	} );

	it( 'has a term type', () => {
		expect( Wrapper.getType() ).toMatch( MockData.default.type );

	} );

<<<<<<< HEAD
	it( 'has labels', () => {
		expect( Wrapper.getLabels() ).toStrictEqual( MockData.default.labels );
	} );

	it( 'returns empty array if there are no labels', () => {
		expect( EmptyWrapper.getLabels() ).toStrictEqual( [] );
=======
	it( 'is a item', () => {
		expect( Wrapper.isItem() ).toBe( MockData.default.type === 'item' );
	} );

	it( 'has labels', () => {
		expect( Wrapper.getLabels() ).toStrictEqual( MockData.default.labels );
>>>>>>> 37a34333ec0c7d85f3e4fcc14803e53294eba7db
	} );

	it( 'has labels by languageKey', () => {
		expect( Wrapper.getLabelByLanguageKey( 'de' ) ).toStrictEqual( MockData.default.labels.de.value );
	} );

<<<<<<< HEAD
	it( 'returns empty array if labels does not contains the languageKey', () => {
		expect( Wrapper.getLabelByLanguageKey( 'thisNotGonnaWork' ) ).toEqual( '' );
=======
	it( 'returns empty array if key not exists', () => {
		expect( Wrapper.getLabelByLanguageKey( 'thisNotGonnaWork' ) ).toEqual( [] );
>>>>>>> 37a34333ec0c7d85f3e4fcc14803e53294eba7db
	} );

	it( 'has aliases', () => {
		expect( Wrapper.getAliases() ).toStrictEqual( MockData.default.aliases );
	} );
<<<<<<< HEAD

	it( 'returns empty array if there are no aliases', () => {
		expect( EmptyWrapper.getAliases() ).toStrictEqual( [] );
	} );

	it( 'has aliases for specific languageKeys', () => {
		expect( Wrapper.getAliasByLanguageKey( 'de' ) ).toStrictEqual(
			['Stadt Berlin', 'Berlin, Deutschland', 'Bundeshauptstadt Berlin', 'Land Berlin', 'DE-BE'],
		);
	} );

	it( 'returns empty array if aliases  does not contains the languageKey', () => {
		expect( EmptyWrapper.getAliasByLanguageKey( 'de' ) ).toStrictEqual( [] );
	} );
=======
	/**
	 * TODO
	 * Exception cases
	 * alias by key
	 */
>>>>>>> 37a34333ec0c7d85f3e4fcc14803e53294eba7db
} );
