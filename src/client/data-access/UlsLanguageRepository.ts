import LanguageRepository from '@/common/data-access/LanguageRepository';

export type LanguageNameInUserLangCallback = ( languageCode: string ) => string;

export default class UlsLanguageRepository implements LanguageRepository {

	private readonly getLanguageNameInUserLang: LanguageNameInUserLangCallback;

	public constructor( getLanguageNameByCode: LanguageNameInUserLangCallback ) {
		this.getLanguageNameInUserLang = getLanguageNameByCode;
	}

	public getLanguageName( languageCode: string, inLanguage: string ): Promise<string> {
		return new Promise<string>( ( resolve ) => {
			resolve( this.getLanguageNameInUserLang( languageCode ) );
		} );
	}

}
