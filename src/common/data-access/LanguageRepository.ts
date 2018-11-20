export default interface LanguageRepository {

	/**
	 * Rejects to TechnicalProblem or LanguageNotFound or TranslationLanguageNotFound errors in case of problems
	 */
	getLanguageName( languageCode: string, inLanguage: string ): Promise<string>;

}
