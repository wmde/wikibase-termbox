import mwbot from 'mwbot';
import LanguageRepository from '@/common/data-access/LanguageRepository';
import TechnicalProblem from '@/common/data-access/error/TechnicalProblem';
import LanguageNotFound from '@/common/data-access/error/LanguageNotFound';
import TranslationLanguageNotFound from '@/common/data-access/error/TranslationLanguageNotFound';

export default class MwBotLanguageRepo implements LanguageRepository {
	private bot: mwbot;

	public constructor( bot: mwbot ) {
		this.bot = bot;
	}

	public getLanguageName( languageCode: string, inLanguage: string ): Promise<string> {
		return new Promise( ( resolve, reject ) => {
			this.bot.request( {
				action: 'query',
				meta: 'wbcontentlanguages',
				wbclcontext: 'term',
				wbclprop: 'code|name',
				uselang: inLanguage,
			} )
				.then( ( response: any ) => {
					if ( !( 'query' in response ) ) {
						reject( new TechnicalProblem( 'wbcontentlanguages result not well formed.' ) );
					}

					if ( !( 'wbcontentlanguages' in response.query ) ) {
						reject( new TechnicalProblem( 'wbcontentlanguages result not well formed.' ) );
					}

					if ( !( languageCode in response.query.wbcontentlanguages ) ) {
						reject( new LanguageNotFound( 'Asked for a language that is not existing.' ) );
					}

					if ( !( inLanguage in response.query.wbcontentlanguages ) ) {
						reject( new TranslationLanguageNotFound( 'Asked for data in a language that itself is not existing.' ) );
					}

					const language = response.query.wbcontentlanguages[ languageCode ];

					if ( !( 'name' in language ) ) {
						reject( new TechnicalProblem( 'Name for detected language not given.' ) );
					}

					resolve( language.name );
				} )
				.catch( ( reason: string ) => {
					reject( new TechnicalProblem( reason ) );
				} );
		} );
	}
}
