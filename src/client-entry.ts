import Vue from 'vue';
import App from '@/components/App.vue';
import { store } from '@/store/StoreBundle';
import Vuex, { StoreOptions } from 'vuex';
import EntityStripper from '@/store/Entity/EntityStripper';
import EntityProperties from '@/store/Entity/EntityProperties';
import StateInterface from '@/store/root/StateInterface';
import * as MockData from '@/mock-data/data/Q64_data.json';
import { mutations } from '@/store/Entity/EntityMutations';
import {
	ENTITY_INIT,
} from '@/store/Entity/EntityMethodNames';
import InvalidEntityStripperException from '@/store/Entity/exceptions/InvalidEntityStripperException';

Vue.config.productionTip = false;

const Entity: EntityProperties = {
	Id: '',
	Type: '',
	Labels: {},
	Descriptions: {},
	Aliases: {},
	IsInit: false,
};

declare const mw: any;

const Stripper = new EntityStripper( mw.config.get( 'wbEntity' ) );

const state: StateInterface = {
	Entity,
};

const StoreOps: StoreOptions<StateInterface> = {
	state,
	mutations,
	strict: true,
};

const Store = new Vuex.Store<StateInterface>( StoreOps );

Store.commit( ENTITY_INIT, Stripper );


new Vue( {
	store,
	render: ( h ) => h( App ),
} ).$mount( '.wikibase-entitytermsview' );
