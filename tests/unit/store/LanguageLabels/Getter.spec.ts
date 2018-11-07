import Vue from 'vue';
import Vuex from 'vuex';
import Properties from '@/store/LanguageLabels/Properties';
import * as Mockup from '@/mock-data/data/en_lang_data.json';
import {
	filledLanguageLabelsModule,
} from '../data/LanguageLabelsStores';

Vue.use( Vuex );

const languageLabels = filledLanguageLabelsModule;

const storeBundle = {
	modules: {
		languageLabels,
	},
};

const filledStore = new Vuex.Store<Properties>( storeBundle );

describe( '/store/LanguageLabels/Getters.ts', () => {
	it( 'returns a dictionary of languageKeys and the defined labels in this language scope', () => {
		expect( filledStore.getters.getLabels )
			.toStrictEqual( { en: Mockup.default } );
	} );

	it( 'returns a array of the defined labels of the given language scope', () => {
		expect( filledStore.getters.getLabelsByLanguageKey( 'en' ) )
			.toStrictEqual( Mockup.default );
	} );

	it( 'returns a empty array if the key is not valid for the labels', () => {
		expect( filledStore.getters.getLabelsByLanguageKey( 'neverWorks' ) )
			.toStrictEqual( [] );
	} );
} );
