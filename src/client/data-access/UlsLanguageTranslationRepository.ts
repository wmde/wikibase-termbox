import LanguageTranslationRepository from '@/common/data-access/LanguageTranslationRepository';
import LanguageTranslations, { StringTMap } from '@/datamodel/LanguageTranslations';

export type LanguageNameInUserLangCallback = ( languageCode: string ) => string;

export default class UlsLanguageTranslationRepository implements LanguageTranslationRepository {

	private readonly languagesAtEntity: string[];
	private readonly getLanguageNameInUserLang: LanguageNameInUserLangCallback;

	public constructor(
		getLanguageNameByCode: LanguageNameInUserLangCallback,
		languagesAtEntity: string[],
	) {
		this.getLanguageNameInUserLang = getLanguageNameByCode;
		this.languagesAtEntity = languagesAtEntity;
	}

	public getLanguagesInLanguage( inLanguage: string ): Promise<LanguageTranslations> {
		return new Promise<LanguageTranslations>( ( resolve ) => {
			resolve( {
				[inLanguage ]: this.getLanguagesNamesInLanguage(),
			} as LanguageTranslations );
		} );
	}

	private getLanguagesNamesInLanguage(): StringTMap<string> {
		const languageNamesInUserLang = {} as StringTMap<string>;
		this.languagesAtEntity.forEach( ( item: string ) => {
			languageNamesInUserLang[ item ] = this.getLanguageNameInUserLang( item );
		} );
		return languageNamesInUserLang;
	}

}
