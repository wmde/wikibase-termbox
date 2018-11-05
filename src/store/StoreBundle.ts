import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import StateInterface from '@/store/root/StateInterface';
import { entity } from '@/store/Entity/EntityModule';
import { language } from '@/store/Language/LanguageModule';
import { rootGetters as getters } from '@/store/root/Getters';

Vue.use( Vuex );

const storeBundle: StoreOptions<StateInterface> = {
	getters,
	modules: {
		entity,
		language,
	},
	strict: true,
};

export const store = new Vuex.Store<StateInterface>( storeBundle );
