import UlsLanguageRepository from '@/client/data-access/UlsLanguageRepository';
import { LanguageNameInUserLangCallback } from '@/client/data-access/UlsLanguageRepository';

function newUlsLanguageRepository( getLanguageNameByCode: LanguageNameInUserLangCallback ) {
	return new UlsLanguageRepository( getLanguageNameByCode );
}

describe( 'UlsLanguageRepository', () => {

	it( 'gets the language name from the injected function', () => {
		const englishInEnglish = 'English';
		const mockGetLanguageNameByCode = jest.fn();
		mockGetLanguageNameByCode.mockReturnValue( englishInEnglish );

		return newUlsLanguageRepository( mockGetLanguageNameByCode )
			.getLanguageName( 'en', 'en' ).then( ( name ) => {
				expect( name ).toBe( englishInEnglish );
				expect( mockGetLanguageNameByCode ).toBeCalledWith( 'en' );
			} );
	} );

} );
