import Vue from 'vue';
import Vuex, { Module, StoreOptions } from 'vuex';
import StateInterface from '@/store/User/StateInterface';
import {
	emptyUserModule,
	filledUserModule,
} from '../data/UserStores';

Vue.use( Vuex );

let user: Module<StateInterface, any> = emptyUserModule;

let storeBundle: StoreOptions<StateInterface> = {
	modules: {
		user,
	},
};

user = filledUserModule;

storeBundle = {
	modules: {
		user,
	},
};

const filledStore = new Vuex.Store<StateInterface>( storeBundle );

describe( '/store/User/Getters.ts', () => {
	it( 'returns the primary language key', () => {
		expect( filledStore.getters.getPrimaryLanguage )
			.toMatch( 'de' );
	} );
} );
