import Vuex from 'vuex';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import App from '@/components/App.vue';
import TermBox from '@/components/TermBox.vue';
import store from '@/store';
import LanguageCollection from '@/datamodel/LanguageCollection';
import { NS_LANGUAGE } from '@/store/namespaces';
import { LANGUAGE_UPDATE } from '@/store/language/mutationTypes';
import { NS_USER } from '@/store/namespaces';
import { LANGUAGE_INIT } from '@/store/user/mutationTypes';

const localVue = createLocalVue();
localVue.use( Vuex );

describe( 'App.vue', () => {
	it( 'renders the mountable root element', () => {
		const wrapper = shallowMount( App, { store, localVue } );
		expect( wrapper.classes() ).toEqual( [ 'wikibase-entitytermsview' ] );
	} );

	it( 'renders one termbox per language', () => {
		const languages = {
			en: {
				code: 'en',
				directionality: 'ltr',
			},
			de: {
				code: 'de',
				directionality: 'ltr',
			},
			ar: {
				code: 'ar',
				directionality: 'rtl',
			},
		} as LanguageCollection;

		store.commit( `${NS_LANGUAGE }/${LANGUAGE_UPDATE}`, languages );

		store.commit( `${NS_USER}/${LANGUAGE_INIT}`, 'de' );

		const wrapper = shallowMount( App, { store, localVue, mocks: { TermBox } } );
		const allTermboxes = wrapper.findAll( TermBox );

		expect( allTermboxes.length ).toEqual( 3 );

		expect( allTermboxes.at( 0 ).props( 'language' ) )
			.toBe( languages.de );
		expect( allTermboxes.at( 1 ).props( 'language' ) )
			.toBe( languages.en );
		expect( allTermboxes.at( 2 ).props( 'language' ) )
			.toBe( languages.ar );
	} );
} );
