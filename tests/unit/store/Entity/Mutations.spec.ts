import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import StateInterface from '@/store/Entity/StateInterface';
import * as MockData from '@/mock-data/data/Q64_data.json';
import { mutations } from '@/store/Entity/Mutations';
import {
	ENTITY_INIT,
} from '@/store/Entity/Mutation.Types';
import {
	emptyEntityState as state,
	filledEntityStripper as stripper,
} from '../data/EntityStores';
import InvalidEntitystripperException from '@/store/Entity/exceptions/InvalidEntityStripperException';

Vue.use( Vuex );

const storeOps: StoreOptions<StateInterface> = {
	state,
	mutations,
};

describe( '/store/Entity/Mutations.ts', () => {
	it( 'it throws an error on initilization if an invalid object is given', () => {
		expect( () => {
			const store = new Vuex.Store<StateInterface>( storeOps );
			store.commit( ENTITY_INIT, '' );
		} ).toThrow( InvalidEntitystripperException );

		expect( () => {
			const store = new Vuex.Store<StateInterface>( storeOps );
			store.commit( ENTITY_INIT, [] );
		} ).toThrow( InvalidEntitystripperException );

		expect( () => {
			const store = new Vuex.Store<StateInterface>( storeOps );
			store.commit( ENTITY_INIT, {} );
		} ).toThrow( InvalidEntitystripperException );
	} );

	it( 'it contains data after initilization', () => {
		function init() {
			const store = new Vuex.Store<StateInterface>( storeOps );
			store.commit( ENTITY_INIT, stripper );
			if ( typeof store.state.Entity === 'undefined' ) {
				return [];
			}

			return [
				store.state.Entity.Id,
				store.state.Entity.Type,
				store.state.Entity.Labels,
				store.state.Entity.Descriptions,
				store.state.Entity.Aliases,
			];
		}

		expect( init() ).toStrictEqual( [
			stripper.getId(),
			stripper.getType(),
			stripper.getLabels(),
			stripper.getDescriptions(),
			stripper.getAliases(),
		] );
	} );
} );
