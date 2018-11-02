import Vue from 'vue';
import Vuex, { Module, StoreOptions } from 'vuex';
import EntityProperties from '@/store/Entity/EntityProperties';
import NonInitilizedEntityException from '@/store/Entity/exceptions/NonInitilizedEntityException';
import StateInterface from '@/store/root/StateInterface';
import {
	ENTITY_INIT,
	ENTITY_GET_ID,
	ENTITY_GET_TYPE,
	ENTITY_GET_LABELS,
	ENTITY_GET_ALIASES,
	ENTITY_GET_DESCRIPTIONS,
	ENTITY_GET_LABEL_BY_LANGUAGE,
	ENTITY_GET_ALIASES_BY_LANGUAGE,
	ENTITY_GET_DESCRIPTION_BY_LANGUAGE,
} from '@/store/Entity/EntityMethodNames';
import { NS_ENTITY } from '@/store/root/Namespaces';
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

describe( '/store/Entity/EntityGetters.ts', () => {
	/* id */
	it( 'returns an id', () => {
		expect( filledStore.getters[ `${ NS_ENTITY }/${ ENTITY_GET_ID }` ] )
			.toMatch( stripper.getId() );
	} );

	it( 'throws an exception on ids, if it is not initilized', () => {
		expect( () => {
			const ignore = emptyStore.getters[ `${ NS_ENTITY }/${ ENTITY_GET_ID }` ];
		} ).toThrow( NonInitilizedEntityException );
	} );

	it( 'returns an type', () => {
		expect( filledStore.getters[ `${ NS_ENTITY }/${ ENTITY_GET_TYPE }` ] )
			.toMatch( stripper.getType() );
	} );

	it( 'throws an exception on types, if it is not initilized', () => {
		expect( () => {
			const ignore = emptyStore.getters[ `${ NS_ENTITY }/${ ENTITY_GET_TYPE }` ];
		} ).toThrow( NonInitilizedEntityException );
	} );

	it( 'returns labels', () => {
		expect( filledStore.getters[ `${ NS_ENTITY }/${ ENTITY_GET_LABELS }` ] )
			.toStrictEqual( stripper.getLabels() );
	} );

	it( 'throws an exception on labels, if it is not initilized', () => {
		expect( () => {
			const ignore = emptyStore.getters[ `${ NS_ENTITY }/${ ENTITY_GET_LABELS }` ];
		} ).toThrow( NonInitilizedEntityException );
	} );

	it( 'returns on label, refered by LanguagesCode', () => {
		expect( filledStore.getters[ `${ NS_ENTITY }/${ ENTITY_GET_LABEL_BY_LANGUAGE }` ]( 'de' ) )
			.toMatch( stripper.getLabels().de );
	} );

	it( 'return an empty string for a unknown LanguagesCode at labels', () => {
		expect( filledStore.getters[ `${ NS_ENTITY }/${ ENTITY_GET_LABEL_BY_LANGUAGE }` ]( 'whatEver' ) )
			.toMatch( '' );
	} );

	it( 'throws an exception on label, refered by LanguagesCode, if it is not initilized', () => {
		expect( () => {
			const ignore = emptyStore.getters[ `${ NS_ENTITY }/${ ENTITY_GET_LABEL_BY_LANGUAGE }` ]( 'de' );
		} ).toThrow( NonInitilizedEntityException );
	} );

	it( 'returns on description, refered by LanguagesCode', () => {
		expect( filledStore.getters[ `${ NS_ENTITY }/${ ENTITY_GET_DESCRIPTION_BY_LANGUAGE }` ]( 'de' ) )
			.toMatch( stripper.getDescriptions().de );
	} );

	it( 'return an empty string for a unknown LanguagesCode at descriptions', () => {
		expect( filledStore.getters[ `${ NS_ENTITY }/${ ENTITY_GET_DESCRIPTION_BY_LANGUAGE }` ]( 'whatEver' ) )
			.toMatch( '' );
	} );

	it( 'throws an exception on description, refered by LanguagesCode, if it is not initilized', () => {
		expect( () => {
			const ignore = emptyStore.getters[ `${ NS_ENTITY }/${ ENTITY_GET_DESCRIPTION_BY_LANGUAGE }` ]( 'de' );
		} ).toThrow( NonInitilizedEntityException );
	} );

	it( 'returns on aliases, refered by LanguagesCode', () => {
		expect( filledStore.getters[ `${ NS_ENTITY }/${ ENTITY_GET_ALIASES_BY_LANGUAGE }` ]( 'de' ) )
			.toStrictEqual( stripper.getAliases().de );
	} );

	it( 'return an empty string for a unknown LanguagesCode at aliases', () => {
		expect( filledStore.getters[ `${ NS_ENTITY }/${ ENTITY_GET_ALIASES_BY_LANGUAGE }` ]( 'whatEver' ) )
			.toStrictEqual( [] );
	} );

	it( 'throws an exception on aliases, refered by LanguagesCode, if it is not initilized', () => {
		expect( () => {
			const ignore = emptyStore.getters[ `${ NS_ENTITY }/${ ENTITY_GET_ALIASES_BY_LANGUAGE }` ]( 'de' );
		} ).toThrow( NonInitilizedEntityException );
	} );
} );
