import TechnicalProblem from '@/common/data-access/error/TechnicalProblem';
import TranslationLanguageNotFound from '@/common/data-access/error/TranslationLanguageNotFound';
import LanguageNotFound from '@/common/data-access/error/LanguageNotFound';
import MwBotLanguageRepo from '@/server/data-access/MwBotLanguageRepo';
import mwbot from 'mwbot';

function newMwBotLanguageRepo( bot: any ) {
	return new MwBotLanguageRepo(
		bot,
	);
}

describe( 'MwBotLanguageRepo', () => {

	it( 'can be constructed with mwbot', () => {
		expect( newMwBotLanguageRepo( new mwbot( {} ) ) ).toBeInstanceOf( MwBotLanguageRepo );
	} );

	describe( 'getLanguageName', () => {
		it( 'creates a well-formed wbcontentlanguages query', ( done ) => {
			const languageCode = 'en';
			const inLanguage = 'de';
			const bot = {
				request: ( params: object ) => {
					expect( params ).toEqual( {
						action: 'query',
						meta: 'wbcontentlanguages',
						wbclcontext: 'term',
						wbclprop: 'code|name',
						uselang: inLanguage,
					} );

					return Promise.reject( 'This test focuses on the request.' );
				},
			};

			const repo = newMwBotLanguageRepo( bot );
			repo.getLanguageName( languageCode, inLanguage ).catch( () => {
				done();
			} );
		} );

		it( 'resolves to a language name on success', ( done ) => {
			const languageCode = 'en';
			const inLanguage = 'de';
			const language = {
				code: 'en',
				name: 'Englisch',
			};
			const results = {
				batchcomplete: '',
				query: {
					wbcontentlanguages: {
						en: language,
						de: {
							code: 'de',
							name: 'Deutsch',
						},
					},
				},
			};
			const bot = {
				request: ( params: object ) => {
					return Promise.resolve( results );
				},
			};

			const repo = newMwBotLanguageRepo( bot );
			repo.getLanguageName( languageCode, inLanguage ).then( ( languageName ) => {
				expect( languageName ).toEqual( language.name );
				done();
			} );
		} );

		it( 'rejects in case of a malformed API response (missing query)', ( done ) => {
			const languageCode = 'en';
			const inLanguage = 'de';
			const results = {
				strangebody: 'yes',
			};
			const bot = {
				request: ( params: object ) => {
					return Promise.resolve( results );
				},
			};

			const repo = newMwBotLanguageRepo( bot );
			repo.getLanguageName( languageCode, inLanguage ).catch( ( reason: Error ) => {
				expect( reason ).toBeInstanceOf( TechnicalProblem );
				expect( reason.message ).toEqual( 'wbcontentlanguages result not well formed.' );
				done();
			} );
		} );

		it( 'rejects in case of a malformed API response (missing query.wbcontentlanguages)', ( done ) => {
			const languageCode = 'en';
			const inLanguage = 'de';
			const results = {
				batchcomplete: '',
				query: {
					strangeprop: 'yes',
				},
			};
			const bot = {
				request: ( params: object ) => {
					return Promise.resolve( results );
				},
			};

			const repo = newMwBotLanguageRepo( bot );
			repo.getLanguageName( languageCode, inLanguage ).catch( ( reason: Error ) => {
				expect( reason ).toBeInstanceOf( TechnicalProblem );
				expect( reason.message ).toEqual( 'wbcontentlanguages result not well formed.' );
				done();
			} );
		} );

		it( 'rejects in case of a missing language', ( done ) => {
			const languageCode = 'foo';
			const inLanguage = 'en';
			const results = {
				batchcomplete: '',
				query: {
					wbcontentlanguages: {
						en: {
							code: 'en',
							name: 'English',
						},
					},
				},
			};
			const bot = {
				request: ( params: object ) => {
					return Promise.resolve( results );
				},
			};

			const repo = newMwBotLanguageRepo( bot );
			repo.getLanguageName( languageCode, inLanguage ).catch( ( reason: Error ) => {
				expect( reason ).toBeInstanceOf( LanguageNotFound );
				expect( reason.message ).toEqual( 'Asked for a language that is not existing.' );
				done();
			} );
		} );

		it( 'rejects in case of a missing translation language', ( done ) => {
			const languageCode = 'en';
			const inLanguage = 'foo';
			const results = {
				batchcomplete: '',
				query: {
					wbcontentlanguages: {
						en: {
							code: 'en',
							name: 'English',
						},
					},
				},
			};
			const bot = {
				request: ( params: object ) => {
					return Promise.resolve( results );
				},
			};

			const repo = newMwBotLanguageRepo( bot );
			repo.getLanguageName( languageCode, inLanguage ).catch( ( reason: Error ) => {
				expect( reason ).toBeInstanceOf( TranslationLanguageNotFound );
				expect( reason.message ).toEqual( 'Asked for data in a language that itself is not existing.' );
				done();
			} );
		} );

		it( 'rejects in case the found language lacks the name property', ( done ) => {
			const languageCode = 'en';
			const inLanguage = 'de';
			const language = {
				code: 'en',
			};
			const results = {
				batchcomplete: '',
				query: {
					wbcontentlanguages: {
						en: language,
						de: {
							code: 'de',
							name: 'Deutsch',
						},
					},
				},
			};
			const bot = {
				request: ( params: object ) => {
					return Promise.resolve( results );
				},
			};

			const repo = newMwBotLanguageRepo( bot );
			repo.getLanguageName( languageCode, inLanguage ).catch( ( reason: Error ) => {
				expect( reason ).toBeInstanceOf( TechnicalProblem );
				expect( reason.message ).toEqual( 'Name for detected language not given.' );
				done();
			} );
		} );

		it( 'rejects stating the reason in case of API problems', ( done ) => {
			const languageCode = 'en';
			const inLanguage = 'de';
			const bot = {
				request: ( params: object ) => {
					return Promise.reject( new Error( 'invalidjson: No valid JSON response.' ) );
				},
			};
			const repo = newMwBotLanguageRepo( bot );
			repo.getLanguageName( languageCode, inLanguage ).catch( ( reason: Error ) => {
				expect( reason ).toBeInstanceOf( TechnicalProblem );
				expect( reason.message ).toEqual( 'Error: invalidjson: No valid JSON response.' );
				done();
			} );
		} );
	} );
} );
