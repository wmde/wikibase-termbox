import LanguageStripper from '@/store/Language/LanguageStripper';
import InvalidLanguageTupelException from '@/store/Language/exceptions/InvalidLanguageTupelException';
import * as MockData from '@/mock-data/data/en_lang_data.json';

const AllLanguages = [
	'en', 'de', 'zh', 'fr', 'bar', 'nds', 'nl', 'it', 'es', 'ru', 'vmf', 'tr', 'gsw',
	'da', 'hr', 'ku-latn', 'el', 'ksh', 'pl', 'hsb', 'frr', 'dsb', 'stq', 'pfl',
];

const Stripper = new LanguageStripper( [
	AllLanguages,
	9,
	MockData.default,
] );

describe( '/store/Lanugage/LanguageStripper.ts', () => {
	it( 'throws an error if malicious formed in macroscopic structure', () => {
		expect( () => {
			const dummy = new LanguageStripper( '' );
		} ).toThrowError( SyntaxError );

		expect( () => {
			const dummy = new LanguageStripper( '[]' );
		} ).toThrowError( InvalidLanguageTupelException );

		expect( () => {
			const dummy = new LanguageStripper( 'justATest' );
		} ).toThrowError( SyntaxError );

		expect( () => {
			const dummy = new LanguageStripper( '[ "type" ]' );
		} ).toThrowError( InvalidLanguageTupelException );

		expect( () => {
			const dummy = new LanguageStripper( '[ "type", "asd" ]' );
		} ).toThrowError( InvalidLanguageTupelException );
	} );

	it( 'throws an error if the first entry is not a array of strings', () => {
		expect( () => {
			const dummy = new LanguageStripper( '[ 123, 2, {} ]' );
		} ).toThrowError( InvalidLanguageTupelException );

		expect( () => {
			const dummy = new LanguageStripper( '[ [1,23,4,56,745], 2, {} ]' );
		} ).toThrowError( InvalidLanguageTupelException );

		expect( () => {
			const dummy = new LanguageStripper( '[ [ "type", "asd", 745], 2, {} ]' );
			} ).toThrowError( InvalidLanguageTupelException );
	} );

	it( 'throws an error if the second entry is not a positive number', () => {
		expect( () => {
			const dummy = new LanguageStripper( [ ['as', 'asd', 'rz'], 'asd', {} ] );
		} ).toThrowError( InvalidLanguageTupelException );

		expect( () => {
			const dummy = new LanguageStripper( [ ['as', 'asd', 'rz'], 0.2, {} ] );
		} ).toThrowError( InvalidLanguageTupelException );

		expect( () => {
			const dummy = new LanguageStripper( [ ['as', 'asd', 'rz'], -1, {} ] );
		} ).toThrowError( InvalidLanguageTupelException );

		expect( () => {
			const dummy = new LanguageStripper( [ ['as', 'asd', 'rz'], 2.0, {} ] );
		} ).toThrowError( InvalidLanguageTupelException );

		expect( () => {
			const dummy = new LanguageStripper( [ ['as', 'asd', 'rz'], 10, {} ] );
		} ).toThrowError( InvalidLanguageTupelException );
	} );

	it( 'throws an error if the 3rd entry is not a dictionary of strings', () => {
		expect( () => {
			const dummy = new LanguageStripper( [ ['as', 'asd', 'rz'], 1, {} ] );
		} ).toThrowError( InvalidLanguageTupelException );

		expect( () => {
			const dummy = new LanguageStripper( [ ['as', 'asd', 'rz'], 1, [ 1, 2, 3 ] ] );
		} ).toThrowError( InvalidLanguageTupelException );
	} );

	it( 'contains a primary language key', () => {
		expect( Stripper.getPrimaryLanguage() ).toMatch( 'en' );
	} );

	it( 'contains more languages keys', () => {
		expect( Stripper.getMoreLanguages() ).toStrictEqual(
			[ 'en', 'de', 'zh', 'fr', 'bar', 'nds', 'nl', 'it', 'es' ],
		);
	} );

	it( 'contains all languages keys', () => {
		expect( Stripper.getAllLanguages() ).toStrictEqual( AllLanguages );
	} );

	it( 'contains languages labels', () => {
		expect( Stripper.getLabels() ).toStrictEqual( MockData.default );
	} );
} );
