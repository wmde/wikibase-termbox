import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import StateInterface from '@/store/root/StateInterface';
import { entity } from '@/store/Entity/Module';
import { user } from '@/store/User/Module';

Vue.use( Vuex );

const storeBundle: StoreOptions<StateInterface> = {
	modules: {
		entity,
		user,
	},
	strict: true,
};

export default new Vuex.Store<StateInterface>( storeBundle );
