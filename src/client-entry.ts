import Vue from 'vue';
import App from '@/components/App.vue';
import store from '@/store/StoreBundle';

Vue.config.productionTip = false;
console.log( store );
store.commit( 'initilizeLanguageLabels', [ 12 ] );
new Vue( {
	store,
	render: ( h ) => h( App ),
} ).$mount( '.wikibase-entitytermsview' );
