import Vue from 'vue';
import Vuex, { Module, StoreOptions } from 'vuex';
import StateInterface from '@/store/root/StateInterface';
import * as MockLanguageData from '@/mock-data/data/en_lang_data.json';
import * as MockEntityData from '@/mock-data/data/Q64_data.json';
import { getters } from '@/store/root/Getters';
import {
	GET_LABEL,
	GET_DESCRIPTION,
	GET_ALIASES,
} from '@/store/root/MethodNames';
import NonInitilizedLanguageException from '@/store/Language/exceptions/NonInitilizedLanguageException';
import NonInitilizedEntityException from '@/store/Entity/exceptions/NonInitilizedEntityException';
import {
	EmptyEntityModule,
	FilledEntityStripper as EntityStripper,
	FilledEntityModule,
} from '../data/EntityStores';
import {
	EmptyLanguageModule,
	FilledLanguageModule,
	FilledLanguageStripper as LanguageStripper,
} from '../data/LanguageStores';

Vue.use( Vuex );

let Entity: Module<StateInterface, any> = EmptyEntityModule;
let Language: Module<StateInterface, any> = EmptyLanguageModule;

let StoreBundle: StoreOptions<StateInterface> = {
	getters,
	modules: {
		Entity,
		Language,
	},
};

const EmptyStore = new Vuex.Store<StateInterface>( StoreBundle );

Entity = EmptyEntityModule;
Language = FilledLanguageModule;

StoreBundle = {
	getters,
	modules: {
		Entity,
		Language,
	},
};

const LanguageFilledStore = new Vuex.Store<StateInterface>( StoreBundle );

Entity = FilledEntityModule;
Language = EmptyLanguageModule;

StoreBundle = {
	getters,
	modules: {
		Entity,
		Language,
	},
};

const EntityFilledStore = new Vuex.Store<StateInterface>( StoreBundle );

Entity = FilledEntityModule;
Language = FilledLanguageModule;

StoreBundle = {
	getters,
	modules: {
		Entity,
		Language,
	},
};

const FilledStore = new Vuex.Store<StateInterface>( StoreBundle );

describe( '/store/root/Getters.ts', () => {
	it( 'throws an exception, if it is empty', () => {
		expect( () => {
			const ignore = EmptyStore.getters[ GET_LABEL ];
		} ).toThrow( NonInitilizedLanguageException );

		expect( () => {
			const ignore = EmptyStore.getters[ GET_DESCRIPTION ];
		} ).toThrow( NonInitilizedLanguageException );

		expect( () => {
			const ignore = EmptyStore.getters[ GET_ALIASES ];
		} ).toThrow( NonInitilizedLanguageException );
	} );

	it( 'throws an exception, if it is partly filled', () => {
		expect( () => {
			const ignore = LanguageFilledStore.getters[ GET_LABEL ];
		} ).toThrow( NonInitilizedEntityException );

		expect( () => {
			const ignore = LanguageFilledStore.getters[ GET_DESCRIPTION ];
		} ).toThrow( NonInitilizedEntityException );

		expect( () => {
			const ignore = LanguageFilledStore.getters[ GET_ALIASES ];
		} ).toThrow( NonInitilizedEntityException );

		expect( () => {
			const ignore = EntityFilledStore.getters[ GET_LABEL ];
		} ).toThrow( NonInitilizedLanguageException );

		expect( () => {
			const ignore = EntityFilledStore.getters[ GET_DESCRIPTION ];
		} ).toThrow( NonInitilizedLanguageException );

		expect( () => {
			const ignore = EntityFilledStore.getters[ GET_ALIASES ];
		} ).toThrow( NonInitilizedLanguageException );
	} );

	it( 'contains a label', () => {
		expect( FilledStore.getters[ GET_LABEL ] )
		.toMatch( EntityStripper.getLabels()[ LanguageStripper.getPrimaryLanguage() ] );
	} );

	it( 'contains a description', () => {
		expect( FilledStore.getters[ GET_DESCRIPTION ] )
		.toMatch( EntityStripper.getDescriptions()[ LanguageStripper.getPrimaryLanguage() ] );
	} );

	it( 'contains aliases', () => {
		expect( FilledStore.getters[ GET_ALIASES ] )
		.toStrictEqual( EntityStripper.getAliases()[ LanguageStripper.getPrimaryLanguage() ] );
	} );
} );
