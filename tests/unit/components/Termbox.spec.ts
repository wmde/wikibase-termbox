import Termbox from '@/components/TermBox.vue';
import store from '@/store';
import { NS_USER } from '@/store/namespaces';
import { LANGUAGE_INIT } from '@/store/user/mutationTypes';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import { nextTick } from 'process';

const localVue = createLocalVue();
localVue.use( Vuex );

const mockGetLanguageName = jest.fn();

jest.mock( '@/common/TermboxFactory', () => ( {
	__esModule: true,
	instance: {
		getLanguageRepository() {
			return {
				getLanguageName: mockGetLanguageName,
			};
		},
	},
} ) );

describe( 'Termbox.vue', () => {

	it( 'shows the user language name', ( done ) => {
		const englishInEnglish = 'English';
		mockGetLanguageName.mockReturnValue( new Promise( ( r ) => r( englishInEnglish ) ) );

		store.commit(
			`${NS_USER}/${LANGUAGE_INIT}`,
			'en',
		);

		const wrapper = shallowMount( Termbox, { store, localVue } );

		return nextTick( () => {
			expect( wrapper.text() ).toMatch( englishInEnglish );
			expect( mockGetLanguageName ).toBeCalledWith( 'en', 'en' );
			done();
		} );
	} );

} );
