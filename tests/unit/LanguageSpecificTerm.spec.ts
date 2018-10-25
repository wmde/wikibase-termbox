import * as MockData from '@/mock-data/data/Q64_data.json';
import LanguageSpecificTermException from '@/components/lib/exceptions/LanguageSpecificTermException';
import LanguageSpecificTerm from '@/components/lib/LanguageSpecificTerm';
import TermObjectWrapperClient from '@/components/lib/TermObjectWrapperClient';

const Wrapper = new LanguageSpecificTerm(
	'de',
	new TermObjectWrapperClient( JSON.stringify( MockData.default ) ),
);

describe( 'LanguageSpecificTerm.ts', () => {
	it( 'throws an error when the term has no languageKey', () => {
		expect( () => {
			const dummy = new LanguageSpecificTerm(
				' ',
				new TermObjectWrapperClient( JSON.stringify( MockData.default ) ),
			);
		} ).toThrowError( LanguageSpecificTermException );
	} );

	it( 'has a label and returns a 2-tuple of languageKey and labelValue', () => {
		expect( Wrapper.getLabel() ).toMatchObject( [ 'de', 'Berlin' ] );
	} );

	it( 'has aliases and returns a 2-tuple of languageKey and aliasesValue', () => {
		 expect( Wrapper.getAlias() ).toMatchObject( [
			 'de',
			 [ 'Stadt Berlin', 'Berlin, Deutschland', 'Bundeshauptstadt Berlin', 'Land Berlin', 'DE-BE' ],
		 ] );
	} );
} );
