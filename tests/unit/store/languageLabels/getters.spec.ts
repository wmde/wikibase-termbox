import Vue from 'vue';
import Vuex from 'vuex';
import { getters } from '@/store/languageLabels/getters';
import * as Mockup from '@/mock-data/data/en_lang_data.json';
import {
	filledLanguageLabels,
} from '../data/LanguageLabelsStores';

Vue.use( Vuex );

describe( '/store/languageLabels/getters.ts', () => {
	it( 'returns a dictionary of languageKeys and the defined labels in this language scope', () => {
		expect( getters.labels( filledLanguageLabels, null, null, null ) )
			.toStrictEqual( { en: Mockup.default } );
	} );

	it( 'returns a array of the defined labels of the given language scope', () => {
		expect( getters.getLabelsByLanguageKey( filledLanguageLabels, null, null, null )( 'en' ) )
			.toStrictEqual( Mockup.default );
	} );

	it( 'returns a empty array if the key is not valid for the labels', () => {
		expect( getters.getLabelsByLanguageKey( filledLanguageLabels, null, null, null )( 'neverWorks' ) )
			.toStrictEqual( [] );
	} );
} );
