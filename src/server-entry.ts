import Vue from 'vue';
import App from '@/components/App.vue';
import { NS_ENTITY, NS_USER } from '@/store/namespaces';
import { ENTITY_INIT } from '@/store/entity/mutationTypes';
import { LANGUAGE_INIT } from '@/store/user/mutationTypes';
import mwbot from 'mwbot';
import store from '@/store';
import EntityInitializer from '@/common/EntityInitializer';
import Entity from '@/store/entity/Entity';

Vue.config.productionTip = false;

const app = new App();

export default ( context: any ) => {
	app.$data.requestContext = {
		entity: context.entity,
		language: context.language,
	};

	app.$store = store;

	app.$store.commit( `${NS_USER}/${LANGUAGE_INIT}`, context.language );

	const id = context.entity;

	const api = new mwbot( {
		// todo get from .env
		apiUrl: 'http://web/mediawiki/api.php',
	} );

	return api.request( {
		ids: id,
		action: 'wbgetentities',
	} )
		// todo custom catch
		.then( ( response: any ) => {
			return response.entities[ id ];
		} )
		.then( ( entity: object ) => {
			return ( new EntityInitializer() ).newFromSerialization( entity );
		} )
		.then( ( entity: Entity ) => {
			app.$store.commit( `${NS_ENTITY}/${ENTITY_INIT}`, entity );
			return app;
		} );
};
