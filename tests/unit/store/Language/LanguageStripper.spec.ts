import Languagestripper from '@/store/Language/LanguageStripper';
import InvalidLanguageTupelException from '@/store/Language/exceptions/InvalidLanguageTupelException';
import * as MockData from '@/mock-data/data/en_lang_data.json';

const allLanguages: string[] = [
	'en', 'de', 'zh', 'fr', 'bar', 'nds', 'nl', 'it', 'es', 'ru', 'vmf', 'tr', 'gsw',
	'da', 'hr', 'ku-latn', 'el', 'ksh', 'pl', 'hsb', 'frr', 'dsb', 'stq', 'pfl',
];

const stripper: Languagestripper = new Languagestripper( [
	allLanguages,
	9,
	MockData.default,
] );

describe( '/store/Lanugage/Languagestripper.ts', () => {
	it( 'throws an error if malicious formed in macroscopic structure', () => {
		expect( () => {
			const dummy = new Languagestripper( {} );
		} ).toThrowError( 'There is no tupel' );

		expect( () => {
			const dummy = new Languagestripper( '[]' );
		} ).toThrowError( 'The tupel is not well formed' );

		expect( () => {
			const dummy = new Languagestripper( 'justATest' );
		} ).toThrowError( SyntaxError );

		expect( () => {
			const dummy = new Languagestripper( '[ "type" ]' );
		} ).toThrowError( 'The tupel is not well formed' );

		expect( () => {
			const dummy = new Languagestripper( '[ "type", "asd" ]' );
		} ).toThrowError( 'The tupel is not well formed' );
	} );

	it( 'throws an error if the first entry is not a array of strings', () => {
		expect( () => {
			const dummy = new Languagestripper( '[ 123, 2, {} ]' );
		} ).toThrowError( 'The tupel contains no languageskeys' );

		expect( () => {
			const dummy = new Languagestripper( '[ [1,23,4,56,745], 2, {} ]' );
		} ).toThrowError( 'The tupel contains no valid languageskeys' );

		expect( () => {
			const dummy = new Languagestripper( '[ [ "type", "asd", 745], 2, {} ]' );
			} ).toThrowError( 'The tupel contains no valid languageskeys' );
	} );

	it( 'throws an error if the second entry is not a positive number', () => {
		expect( () => {
			const dummy = new Languagestripper( [ ['as', 'asd', 'rz'], 'asd', {} ] );
		} ).toThrowError( 'The tupel contains no cut length' );

		expect( () => {
			const dummy = new Languagestripper( [ ['as', 'asd', 'rz'], 0.2, {} ] );
		} ).toThrowError( 'The tupel contains no cut length' );

		expect( () => {
			const dummy = new Languagestripper( [ ['as', 'asd', 'rz'], -1, {} ] );
		} ).toThrowError( 'The tupel contains no valid cut length' );

		expect( () => {
			const dummy = new Languagestripper( [ ['as', 'asd', 'rz'], 2.2, {} ] );
		} ).toThrowError( 'The tupel contains no cut length' );

		expect( () => {
			const dummy = new Languagestripper( [ ['as', 'asd', 'rz'], 1000, {} ] );
		} ).toThrowError( 'The tupel contains invalid cut range' );
	} );

	it( 'throws an error if the 3rd entry is not a dictionary of strings', () => {
		expect( () => {
			const dummy = new Languagestripper( [ ['as', 'asd', 'rz'], 1, {} ] );
		} ).toThrowError( 'The tupel contains no language labels' );

		expect( () => {
			const dummy = new Languagestripper( [ ['as', 'asd', 'rz'], 1, [ 1, 2, 3 ] ] );
		} ).toThrowError( 'The tupel part of language labels is an array and not a dictionary' );
	} );

	it( 'contains a primary language key', () => {
		expect( stripper.getPrimaryLanguage() ).toMatch( 'en' );
	} );

	it( 'contains more languages keys', () => {
		expect( stripper.getMoreLanguages() ).toStrictEqual(
			[ 'en', 'de', 'zh', 'fr', 'bar', 'nds', 'nl', 'it', 'es' ],
		);
	} );

	it( 'contains all languages keys', () => {
		expect( stripper.getAllLanguages() ).toStrictEqual( allLanguages );
	} );

	it( 'contains languages labels', () => {
		expect( stripper.getLabels() ).toStrictEqual( MockData.default );
	} );
} );
