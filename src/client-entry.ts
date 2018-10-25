import Vue from 'vue';
import App from '@/components/App.vue';
import LanguageSpecificTerm from '@/components/lib/LanguageSpecificTerm';
import TermObjectWrapperClient from '@/components/lib/TermObjectWrapperClient';
import Vuex from 'vuex';
import StoreStates from '@/StoreStates';

declare const mw: any;

Vue.use( Vuex );
Vue.config.productionTip = false;

const store = new Vuex.Store<StoreStates>( {
	state: {
		term: new LanguageSpecificTerm(
			mw.uls.getBrowserLanguage(),
			new TermObjectWrapperClient( mw.config.get( 'wbEntity' ) ),
		),
	},
	mutations: {
	},
	getters: {
	},
	actions: {
	},
} );

new Vue( {
  store,
  render: ( h ) => h( App ),
} ).$mount( '.wikibase-entitytermsview' );
