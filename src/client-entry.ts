import Vue from 'vue';
import App from '@/components/App.vue';
import store from '@/store';

Vue.config.productionTip = false;

declare const mw: any;

store.state.languageKey = mw.uls.getBrowserLanguage();
store.state.termData = mw.config.get( 'wbEntity' );

new Vue( {
  store,
  render: ( h ) => h( App ),
} ).$mount( '.wikibase-entitytermsview' );
