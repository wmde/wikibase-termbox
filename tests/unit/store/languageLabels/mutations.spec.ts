import { mutations } from '@/store/languageLabels/mutations';
import * as Mockup from '@/mock-data/data/en_lang_data.json';
import {
	LANGUAGE_LABELS_INIT,
} from '@/store/languageLabels/mutationTypes';
import {
	emptyLanguageLabels,
} from '../data/LanguageLabelsStores';

describe( '/store/LanguageLabels/Mutations.ts', () => {
	it( 'throw a error if invalid LanguageLabels are provided', () => {
		expect( () => {
			mutations[`${ LANGUAGE_LABELS_INIT }`]( emptyLanguageLabels, [] );
		} ).toThrowError( 'The given value is not dictionary' );

		expect( () => {
			mutations[`${ LANGUAGE_LABELS_INIT }`]( emptyLanguageLabels, { en: 'a' } );
		} ).toThrow( 'The given dictionary contains invalid value' );
	} );

	it( 'contains data after initializing', () => {
		function init() {
			mutations[`${ LANGUAGE_LABELS_INIT }`] (
				emptyLanguageLabels,
				{ en: Mockup.default },
			);

			return [
				emptyLanguageLabels.labels,
			];
		}

		expect( init() ).toStrictEqual( [ { en: Mockup.default } ] );
	} );
} );
