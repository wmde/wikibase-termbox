import Vue from 'vue';
import App from '@/components/App.vue';
import store from '@/store/StoreBundle';

Vue.config.productionTip = false;

new Vue( {
	store,
	render: ( h ) => h( App ),
} ).$mount( '.wikibase-entitytermsview' );
