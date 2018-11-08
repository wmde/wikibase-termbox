import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { entity } from '@/store/Entity/Module';
import { user } from '@/store/User/Module';

Vue.use( Vuex );

// any should be replaces if root gets properties
const storeBundle: StoreOptions<any> = {
	modules: {
		entity,
		user,
	},
	strict: process.env.NODE_ENV !== 'production',
};

export default new Vuex.Store<any>( storeBundle );
