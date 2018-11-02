import Vue from 'vue';
import Vuex, { Module, StoreOptions } from 'vuex';
import StateInterface from '@/store/root/StateInterface';
import * as MockData from '@/mock-data/data/en_lang_data.json';
import { languageGetters as getters } from '@/store/Language/LanguageGetters';
import {
	LANGUAGE_GET_LABELS,
	LANGUAGE_GET_PRIMARY_LANGUAGE,
} from '@/store/Language/LanguageMethodNames';
import { NS_LANGUAGE } from '@/store/root/Namespaces';
import NonInitilizedLanguageException from '@/store/Language/exceptions/NonInitilizedLanguageException';
import {
	emptyLanguageModule,
	filledLanguageModule,
	filledLanguageStripper as stripper,
} from '../data/LanguageStores';

Vue.use( Vuex );

let language: Module<StateInterface, any> = emptyLanguageModule;

let storeBundle: StoreOptions<StateInterface> = {
	modules: {
		language,
	},
};

const emptyStore = new Vuex.Store<StateInterface>( storeBundle );

language = filledLanguageModule;

storeBundle = {
	modules: {
		language,
	},
};

const filledStore = new Vuex.Store<StateInterface>( storeBundle );

describe( '/store/Language/LanguageGetters.ts', () => {
	it( 'returns the primary language key', () => {
		expect( filledStore.getters[ `${ NS_LANGUAGE }/${ LANGUAGE_GET_PRIMARY_LANGUAGE }` ] )
			.toMatch( stripper.getPrimaryLanguage() );
	} );

	it( 'throws an exception on primary language key, if it is not initilized', () => {
		expect( () => {
			const ignore = emptyStore.getters[ `${ NS_LANGUAGE }/${ LANGUAGE_GET_PRIMARY_LANGUAGE }` ];
		} ).toThrow( NonInitilizedLanguageException );
	} );

	it( 'returns language labels', () => {
		expect( filledStore.getters[ `${ NS_LANGUAGE }/${ LANGUAGE_GET_LABELS }` ] )
			.toStrictEqual( stripper.getLabels() );
	} );

	it( 'throws an exception on language labels, if it is not initilized', () => {
		expect( () => {
			const ignore = emptyStore.getters[ `${ NS_LANGUAGE }/${ LANGUAGE_GET_LABELS }` ];
		} ).toThrow( NonInitilizedLanguageException );
	} );
} );
