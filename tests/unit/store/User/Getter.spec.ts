import Vue from 'vue';
import Vuex, { Module, StoreOptions } from 'vuex';
import Properties from '@/store/User/Properties';
import {
	emptyUserModule,
	filledUserModule,
} from '../data/UserStores';

Vue.use( Vuex );

let user: Module<Properties, any> = emptyUserModule;

let storeBundle: StoreOptions<Properties> = {
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

const filledStore = new Vuex.Store<Properties>( storeBundle );

describe( '/store/User/Getters.ts', () => {
	it( 'returns the primary language key', () => {
		expect( filledStore.getters.getPrimaryLanguage )
			.toMatch( 'de' );
	} );
} );
