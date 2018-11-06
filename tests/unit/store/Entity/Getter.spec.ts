import Vue from 'vue';
import Vuex, { Module, StoreOptions } from 'vuex';
import EntityProperties from '@/store/Entity/Properties';
import StateInterface from '@/store/Entity/StateInterface';
import {
	filledEntityModule,
	filledEntityStripper as stripper,
	emptyEntityModule,
} from '../data/EntityStores';

Vue.use( Vuex );

let entity: Module<StateInterface, any>  = emptyEntityModule;

let storeBundle: StoreOptions<StateInterface> = {
	modules: {
		entity,
	},
};

const emptyStore = new Vuex.Store<StateInterface>( storeBundle );

entity = filledEntityModule;

storeBundle = {
	modules: {
		entity,
	},
};

const filledStore = new Vuex.Store<StateInterface>( storeBundle );

describe( '/store/Entity/Getters.ts', () => {
	/* id */
	it( 'returns an id', () => {
		expect( filledStore.getters.getId )
			.toMatch( stripper.getId() );
	} );

	it( 'returns an type', () => {
		expect( filledStore.getters.getType )
			.toMatch( stripper.getType() );
	} );

	it( 'returns labels', () => {
		expect( filledStore.getters.getLabels )
			.toStrictEqual( stripper.getLabels() );
	} );

	it( 'returns on label, refered by LanguagesCode', () => {
		expect( filledStore.getters.getLabelByLanguage( 'de' ) )
			.toMatch( stripper.getLabels().de );
	} );

	it( 'return an empty string for a unknown LanguagesCode at labels', () => {
		expect( filledStore.getters.getLabelByLanguage( 'whatEver' ) )
			.toMatch( '' );
	} );

	it( 'returns on description, refered by LanguagesCode', () => {
		expect( filledStore.getters.getDescriptionByLanguage( 'de' ) )
			.toMatch( stripper.getDescriptions().de );
	} );

	it( 'return an empty string for a unknown LanguagesCode at descriptions', () => {
		expect( filledStore.getters.getDescriptionByLanguage( 'whatEver' ) )
			.toMatch( '' );
	} );

	it( 'returns on aliases, refered by LanguagesCode', () => {
		expect( filledStore.getters.getAliasesByLanguage( 'de' ) )
			.toStrictEqual( stripper.getAliases().de );
	} );

	it( 'return an empty string for a unknown LanguagesCode at aliases', () => {
		expect( filledStore.getters.getAliasesByLanguage( 'whatEver' ) )
			.toStrictEqual( [] );
	} );
} );
