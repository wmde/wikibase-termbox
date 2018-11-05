import Vue from 'vue';
import Vuex, { Module, StoreOptions } from 'vuex';
import StateInterface from '@/store/root/StateInterface';
import * as MockLanguageData from '@/mock-data/data/en_lang_data.json';
import * as MockEntityData from '@/mock-data/data/Q64_data.json';
import { rootGetters as getters } from '@/store/root/Getters';
import {
	GET_LABEL,
	GET_DESCRIPTION,
	GET_ALIASES,
} from '@/store/root/MethodNames';
import NonInitilizedLanguageException from '@/store/Language/exceptions/NonInitilizedLanguageException';
import NonInitilizedEntityException from '@/store/Entity/exceptions/NonInitilizedEntityException';
import {
	emptyEntityModule,
	filledEntityStripper as entityStripper,
	filledEntityModule,
} from '../data/EntityStores';
import {
	emptyLanguageModule,
	filledLanguageModule,
	filledLanguageStripper as languageStripper,
} from '../data/LanguageStores';

Vue.use( Vuex );

let entity: Module<StateInterface, any> = emptyEntityModule;
let language: Module<StateInterface, any> = emptyLanguageModule;

let storeBundle: StoreOptions<StateInterface> = {
	getters,
	modules: {
		entity,
		language,
	},
};

const emptyStore = new Vuex.Store<StateInterface>( storeBundle );

entity = emptyEntityModule;
language = filledLanguageModule;

storeBundle = {
	getters,
	modules: {
		entity,
		language,
	},
};

const languageFilledStore = new Vuex.Store<StateInterface>( storeBundle );

entity = filledEntityModule;
language = emptyLanguageModule;

storeBundle = {
	getters,
	modules: {
		entity,
		language,
	},
};

const entityFilledStore = new Vuex.Store<StateInterface>( storeBundle );

entity = filledEntityModule;
language = filledLanguageModule;

storeBundle = {
	getters,
	modules: {
		entity,
		language,
	},
};

const filledStore = new Vuex.Store<StateInterface>( storeBundle );

describe( '/store/root/Getters.ts', () => {
	it( 'throws an exception, if it is empty', () => {
		expect( () => {
			const ignore = emptyStore.getters[ GET_LABEL ];
		} ).toThrow( NonInitilizedLanguageException );

		expect( () => {
			const ignore = emptyStore.getters[ GET_DESCRIPTION ];
		} ).toThrow( NonInitilizedLanguageException );

		expect( () => {
			const ignore = emptyStore.getters[ GET_ALIASES ];
		} ).toThrow( NonInitilizedLanguageException );
	} );

	it( 'throws an exception, if it is partly filled', () => {
		expect( () => {
			const ignore = languageFilledStore.getters[ GET_LABEL ];
		} ).toThrow( NonInitilizedEntityException );

		expect( () => {
			const ignore = languageFilledStore.getters[ GET_DESCRIPTION ];
		} ).toThrow( NonInitilizedEntityException );

		expect( () => {
			const ignore = languageFilledStore.getters[ GET_ALIASES ];
		} ).toThrow( NonInitilizedEntityException );

		expect( () => {
			const ignore = entityFilledStore.getters[ GET_LABEL ];
		} ).toThrow( NonInitilizedLanguageException );

		expect( () => {
			const ignore = entityFilledStore.getters[ GET_DESCRIPTION ];
		} ).toThrow( NonInitilizedLanguageException );

		expect( () => {
			const ignore = entityFilledStore.getters[ GET_ALIASES ];
		} ).toThrow( NonInitilizedLanguageException );
	} );

	it( 'contains a label', () => {
		expect( filledStore.getters[ GET_LABEL ] )
		.toMatch( entityStripper.getLabels()[ languageStripper.getPrimaryLanguage() ] );
	} );

	it( 'contains a description', () => {
		expect( filledStore.getters[ GET_DESCRIPTION ] )
		.toMatch( entityStripper.getDescriptions()[ languageStripper.getPrimaryLanguage() ] );
	} );

	it( 'contains aliases', () => {
		expect( filledStore.getters[ GET_ALIASES ] )
		.toStrictEqual( entityStripper.getAliases()[ languageStripper.getPrimaryLanguage() ] );
	} );
} );
