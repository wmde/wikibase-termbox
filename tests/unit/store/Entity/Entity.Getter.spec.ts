import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
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
	FilledEntityModule,
	FilledEntityStripper as Stripper,
	EmptyEntityModule,
} from '../data/EntityStores';

Vue.use( Vuex );

let Entity = EmptyEntityModule;

let StoreBundle: StoreOptions<StateInterface> = {
	modules: {
		Entity,
	},
};

const EmptyStore = new Vuex.Store<StateInterface>( StoreBundle );

Entity = FilledEntityModule;

StoreBundle = {
	modules: {
		Entity,
	},
};

const FilledStore = new Vuex.Store<StateInterface>( StoreBundle );

describe( '/store/Entity/EntityGetters.ts', () => {
	/* id */
	it( 'returns an id', () => {
		expect( FilledStore.getters[ `${ NS_ENTITY }/${ ENTITY_GET_ID }` ] )
			.toMatch( Stripper.getId() );
	} );

	it( 'throws an exception on ids, if it is not initilized', () => {
		expect( () => {
			const ignore = EmptyStore.getters[ `${ NS_ENTITY }/${ ENTITY_GET_ID }` ];
		} ).toThrow( NonInitilizedEntityException );
	} );

	it( 'returns an type', () => {
		expect( FilledStore.getters[ `${ NS_ENTITY }/${ ENTITY_GET_TYPE }` ] )
			.toMatch( Stripper.getType() );
	} );

	it( 'throws an exception on types, if it is not initilized', () => {
		expect( () => {
			const ignore = EmptyStore.getters[ `${ NS_ENTITY }/${ ENTITY_GET_TYPE }` ];
		} ).toThrow( NonInitilizedEntityException );
	} );

	it( 'returns labels', () => {
		expect( FilledStore.getters[ `${ NS_ENTITY }/${ ENTITY_GET_LABELS }` ] )
			.toStrictEqual( Stripper.getLabels() );
	} );

	it( 'throws an exception on labels, if it is not initilized', () => {
		expect( () => {
			const ignore = EmptyStore.getters[ `${ NS_ENTITY }/${ ENTITY_GET_LABELS }` ];
		} ).toThrow( NonInitilizedEntityException );
	} );

	it( 'returns on label, refered by LanguagesCode', () => {
		expect( FilledStore.getters[ `${ NS_ENTITY }/${ ENTITY_GET_LABEL_BY_LANGUAGE }` ]( 'de' ) )
			.toMatch( Stripper.getLabels().de );
	} );

	it( 'return an empty string for a unknown LanguagesCode at labels', () => {
		expect( FilledStore.getters[ `${ NS_ENTITY }/${ ENTITY_GET_LABEL_BY_LANGUAGE }` ]( 'whatEver' ) )
			.toMatch( '' );
	} );

	it( 'throws an exception on label, refered by LanguagesCode, if it is not initilized', () => {
		expect( () => {
			const ignore = EmptyStore.getters[ `${ NS_ENTITY }/${ ENTITY_GET_LABEL_BY_LANGUAGE }` ]( 'de' );
		} ).toThrow( NonInitilizedEntityException );
	} );

	it( 'returns on description, refered by LanguagesCode', () => {
		expect( FilledStore.getters[ `${ NS_ENTITY }/${ ENTITY_GET_DESCRIPTION_BY_LANGUAGE }` ]( 'de' ) )
			.toMatch( Stripper.getDescriptions().de );
	} );

	it( 'return an empty string for a unknown LanguagesCode at descriptions', () => {
		expect( FilledStore.getters[ `${ NS_ENTITY }/${ ENTITY_GET_DESCRIPTION_BY_LANGUAGE }` ]( 'whatEver' ) )
			.toMatch( '' );
	} );

	it( 'throws an exception on description, refered by LanguagesCode, if it is not initilized', () => {
		expect( () => {
			const ignore = EmptyStore.getters[ `${ NS_ENTITY }/${ ENTITY_GET_DESCRIPTION_BY_LANGUAGE }` ]( 'de' );
		} ).toThrow( NonInitilizedEntityException );
	} );

	it( 'returns on aliases, refered by LanguagesCode', () => {
		 expect( FilledStore.getters[ `${ NS_ENTITY }/${ ENTITY_GET_ALIASES_BY_LANGUAGE }` ]( 'de' ) )
			.toStrictEqual( Stripper.getAliases().de );
	 } );

	it( 'return an empty string for a unknown LanguagesCode at aliases', () => {
		expect( FilledStore.getters[ `${ NS_ENTITY }/${ ENTITY_GET_ALIASES_BY_LANGUAGE }` ]( 'whatEver' ) )
			.toStrictEqual( [] );
	} );

	it( 'throws an exception on aliases, refered by LanguagesCode, if it is not initilized', () => {
		expect( () => {
			const ignore = EmptyStore.getters[ `${ NS_ENTITY }/${ ENTITY_GET_ALIASES_BY_LANGUAGE }` ]( 'de' );
		} ).toThrow( NonInitilizedEntityException );
	} );
} );
