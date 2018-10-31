import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import StateInterface from '@/store/root/StateInterface';
import { Entity } from '@/store/Entity/EntityModule';
import { Language } from '@/store/Language/LanguageModule';
import { getters } from '@/store/root/Getters';

Vue.use( Vuex );

const StoreBundle: StoreOptions<StateInterface> = {
	getters,
	modules: {
		Entity,
		Language,
	},
	strict: true,
};

export const store = new Vuex.Store<StateInterface>( StoreBundle );
