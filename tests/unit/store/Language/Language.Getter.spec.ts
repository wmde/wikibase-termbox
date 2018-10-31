import Vue from 'vue';
import Vuex, { Module, StoreOptions } from 'vuex';
import StateInterface from '@/store/root/StateInterface';
import * as MockData from '@/mock-data/data/en_lang_data.json';
import { getters } from '@/store/Language/LanguageGetters';
import {
	LANGUAGE_GET_LABELS,
	LANGUAGE_GET_PRIMARY_LANGUAGE,
} from '@/store/Language/LanguageMethodNames';
import { NS_LANGUAGE } from '@/store/root/Namespaces';
import NonInitilizedLanguageException from '@/store/Language/exceptions/NonInitilizedLanguageException';
import {
	EmptyLanguageModule,
	FilledLanguageModule,
	FilledLanguageStripper as Stripper,
} from '../data/LanguageStores';

Vue.use( Vuex );

let Language: Module<StateInterface, any> = EmptyLanguageModule;

let StoreBundle: StoreOptions<StateInterface> = {
	modules: {
		Language,
	},
};

const EmptyStore = new Vuex.Store<StateInterface>( StoreBundle );

Language = FilledLanguageModule;

StoreBundle = {
	modules: {
		Language,
	},
};

const FilledStore = new Vuex.Store<StateInterface>( StoreBundle );

describe( '/store/Language/LanguageGetters.ts', () => {
	it( 'returns the primary language key', () => {
		expect( FilledStore.getters[ `${ NS_LANGUAGE }/${ LANGUAGE_GET_PRIMARY_LANGUAGE }` ] )
			.toMatch( Stripper.getPrimaryLanguage() );
	} );

	it( 'throws an exception on primary language key, if it is not initilized', () => {
		expect( () => {
			const ignore = EmptyStore.getters[ `${ NS_LANGUAGE }/${ LANGUAGE_GET_PRIMARY_LANGUAGE }` ];
		} ).toThrow( NonInitilizedLanguageException );
	} );

	it( 'returns language labels', () => {
		expect( FilledStore.getters[ `${ NS_LANGUAGE }/${ LANGUAGE_GET_LABELS }` ] )
			.toStrictEqual( Stripper.getLabels() );
	} );

	it( 'throws an exception on language labels, if it is not initilized', () => {
		expect( () => {
			const ignore = EmptyStore.getters[ `${ NS_LANGUAGE }/${ LANGUAGE_GET_LABELS }` ];
		} ).toThrow( NonInitilizedLanguageException );
	} );
} );
