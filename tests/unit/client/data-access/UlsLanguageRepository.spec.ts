import UlsLanguageTranslationRepository from '@/client/data-access/UlsLanguageTranslationRepository';

function newUlsLanguageRepository( getLanguageNameByCode: ( langCode: string ) => string, langChain: string[] ) {
	return new UlsLanguageTranslationRepository( getLanguageNameByCode, langChain );
}

describe( 'UlsLanguageTranslationRepository', () => {

	it( 'gets the language name from the given function', () => {
		const mockWbGetLanguageNameByCode = jest.fn();
		const langTranslation = 'English';
		const langChain = [ 'en' ];
		mockWbGetLanguageNameByCode.mockReturnValue( langTranslation );

		return newUlsLanguageRepository( mockWbGetLanguageNameByCode, langChain )
			.getLanguagesInLanguage( 'en' ).then( ( name ) => {
				expect( mockWbGetLanguageNameByCode ).toBeCalledWith( 'en' );
				expect( name ).toEqual( {
					en: {
						en: langTranslation,
					},
				} );
			} );
	} );

} );
