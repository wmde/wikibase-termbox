import Vue from 'vue';
import Vuex, { Module, StoreOptions } from 'vuex';
import EntityStripper from '@/store/Entity/EntityStripper';
import EntityProperties from '@/store/Entity/EntityProperties';
import { getters } from '@/store/Entity/EntityGetters';
import { mutations } from '@/store/Entity/EntityMutations';
import NonInitilizedEntityException from '@/store/Entity/exceptions/NonInitilizedEntityException';
import * as MockData from '@/mock-data/data/Q64_data.json';
import StateInterface from '@/store/root/StateInterface';
import { store } from '@/store/StoreBundle';
import {
	ENTITY_INIT,
	ENTITY_GET_ID,
	ENTITY_GET_TYPE,
	ENTITY_GET_LABELS,
	ENTITY_GET_ALIASES,
	ENTITY_GET_DESCRIPTIONS,
	ENTITY_GET_LABEL_BY_LANGUAGE,
	ENTITY_GET_ALIASES_BY_LANGUAGE,
	ENTITY_GET_DESCRIPTION_BY_LANGUAGE
} from '@/store/Entity/EntityMethodNames';
import { NS_ENTITY } from '@/store/root/Namespaces';

const EntityInit: EntityProperties = {
	Id: '',
	Type: '',
	Labels: {},
	Descriptions: {},
	Aliases: {},
	IsInit: false,
}

const state: StateInterface = {
        Entity: EntityInit,
};

const namespaced = true;

const Entity: Module<StateInterface, any> = {
	namespaced,
    state,
	getters,
    mutations,
};

const StoreBundle: StoreOptions<StateInterface> = {
	modules: {
		Entity,
	}
};

const EmptyStore = new Vuex.Store<StateInterface>( StoreBundle );
const Stripper = new EntityStripper( MockData.default );

store.commit( `${ NS_ENTITY }/${ ENTITY_INIT }`, Stripper );
describe( '/store/Entity/EntityGetters.ts', () => {
	/* id */
	it( 'returns an id', () => {
		expect( store.getters[ `${ NS_ENTITY }/${ ENTITY_GET_ID }` ] ).toMatch( Stripper.getId() );
	} );

	it( 'throws an exception on ids, if it is not initilized', () => {
		expect( () => {
			EmptyStore.getters[ `${ NS_ENTITY }/${ ENTITY_GET_ID }` ]
		} ).toThrow( NonInitilizedEntityException )
	} );

	it( 'returns an type', () => {
		expect( store.getters[ `${ NS_ENTITY }/${ ENTITY_GET_TYPE }` ] ).toMatch( Stripper.getType() );
	} );

	it( 'throws an exception on types, if it is not initilized', () => {
		expect( () => {
			EmptyStore.getters[ `${ NS_ENTITY }/${ ENTITY_GET_TYPE }` ]
		} ).toThrow( NonInitilizedEntityException )
	} );

	it( 'returns labels', () => {
		expect( store.getters[ `${ NS_ENTITY }/${ ENTITY_GET_LABELS }` ] ).toStrictEqual( Stripper.getLabels() );
	} );

	it( 'throws an exception on labels, if it is not initilized', () => {
		expect( () => {
			EmptyStore.getters[ `${ NS_ENTITY }/${ ENTITY_GET_LABELS }` ]
		} ).toThrow( NonInitilizedEntityException )
	} );

	it( 'returns on label, refered by LanguagesCode', () => {
		expect( store.getters[ `${ NS_ENTITY }/${ ENTITY_GET_LABEL_BY_LANGUAGE }` ]( 'de' )  ).toMatch( Stripper.getLabels()['de'] );
	} );

	it( 'return an empty string for a unknown LanguagesCode at labels', () => {
		expect( store.getters[ `${ NS_ENTITY }/${ ENTITY_GET_LABEL_BY_LANGUAGE }` ]( 'whatEver' )  ).toMatch( '' );
	} );

	it( 'throws an exception on label, refered by LanguagesCode, if it is not initilized', () => {
		expect( () => {
			EmptyStore.getters[ `${ NS_ENTITY }/${ ENTITY_GET_LABEL_BY_LANGUAGE }` ]( 'de' )
		} ).toThrow( NonInitilizedEntityException )
	} );

	it( 'returns on description, refered by LanguagesCode', () => {
		expect( store.getters[ `${ NS_ENTITY }/${ ENTITY_GET_DESCRIPTION_BY_LANGUAGE }` ]( 'de' )  ).toMatch( Stripper.getDescriptions()['de'] );
	} );
	
	it( 'return an empty string for a unknown LanguagesCode at descriptions', () => {
		expect( store.getters[ `${ NS_ENTITY }/${ ENTITY_GET_DESCRIPTION_BY_LANGUAGE }` ]( 'whatEver' )  ).toMatch( '' );
	} );
	
	it( 'throws an exception on description, refered by LanguagesCode, if it is not initilized', () => {
		expect( () => {
			EmptyStore.getters[ `${ NS_ENTITY }/${ ENTITY_GET_DESCRIPTION_BY_LANGUAGE }` ]( 'de' )
		} ).toThrow( NonInitilizedEntityException )
	} );

	 it( 'returns on aliases, refered by LanguagesCode', () => {
		 expect( store.getters[ `${ NS_ENTITY }/${ ENTITY_GET_ALIASES_BY_LANGUAGE }` ]( 'de' )  ).toStrictEqual( Stripper.getAliases()['de'] );
	 } );
	
	it( 'return an empty string for a unknown LanguagesCode at aliases', () => {
		expect( store.getters[ `${ NS_ENTITY }/${ ENTITY_GET_ALIASES_BY_LANGUAGE }` ]( 'whatEver' )  ).toStrictEqual( [] );
	} );
	
	it( 'throws an exception on aliases, refered by LanguagesCode, if it is not initilized', () => {
		expect( () => {
			EmptyStore.getters[ `${ NS_ENTITY }/${ ENTITY_GET_ALIASES_BY_LANGUAGE }` ]( 'de' )
		} ).toThrow( NonInitilizedEntityException )
	} );
} );
