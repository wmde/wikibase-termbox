import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import EntityStripper from '@/store/Entity/EntityStripper';
import StateInterface from '@/store/root/StateInterface';
import * as MockData from '@/mock-data/data/Q64_data.json';
import { mutations } from '@/store/Entity/EntityMutations';
import {
	ENTITY_INIT,
} from '@/store/Entity/EntityMethodNames';
import {
	EmptyEntityState as state,
	FilledEntityStripper as Stripper,
} from '../data/EntityStores';
import InvalidEntityStripperException from '@/store/Entity/exceptions/InvalidEntityStripperException';

Vue.use( Vuex );

const StoreOps: StoreOptions<StateInterface> = {
	state,
	mutations,
};

describe( '/store/Entity/EntityMutations.ts', () => {
	it( 'it throws an error on initilization if an invalid object is given', () => {
		expect( () => {
			const Store = new Vuex.Store<StateInterface>( StoreOps );
			Store.commit( ENTITY_INIT, '' );
		} ).toThrow( InvalidEntityStripperException );

		expect( () => {
			const Store = new Vuex.Store<StateInterface>( StoreOps );
			Store.commit( ENTITY_INIT, [] );
		} ).toThrow( InvalidEntityStripperException );

		expect( () => {
			const Store = new Vuex.Store<StateInterface>( StoreOps );
			Store.commit( ENTITY_INIT, {} );
		} ).toThrow( InvalidEntityStripperException );
	} );

	it( 'it sets the initial data', () => {
		function init() {
			const Store = new Vuex.Store<StateInterface>( StoreOps );
			Store.commit( ENTITY_INIT, Stripper );
			return 'undefined' === typeof Store.state.Entity ?
				false : Store.state.Entity.IsInit;
		}
		expect( init() ).toBeTruthy();
	} );

	it( 'it contains data after initilization', () => {
		function init() {
			const Store = new Vuex.Store<StateInterface>( StoreOps );
			Store.commit( ENTITY_INIT, Stripper );
			if ( 'undefined' === typeof Store.state.Entity ) {
				return [];
			}

			return [
				Store.state.Entity.Id,
				Store.state.Entity.Type,
				Store.state.Entity.Labels,
				Store.state.Entity.Descriptions,
				Store.state.Entity.Aliases,
				Store.state.Entity.IsInit,
			];
		}

		expect( init() ).toStrictEqual( [
			Stripper.getId(),
			Stripper.getType(),
			Stripper.getLabels(),
			Stripper.getDescriptions(),
			Stripper.getAliases(),
			true,
		] );
	} );
} );
