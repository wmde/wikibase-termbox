import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import LanugageProperties from '@/store/Language/LanguageProperties';
import StateInterface from '@/store/root/StateInterface';
import * as MockData from '@/mock-data/data/en_lang_data.json';
import { mutations } from '@/store/Language/LanguageMutations';
import {
	LANGUAGE_INIT,
} from '@/store/Language/LanguageMethodNames';
import InvalidLanguageTupleException from '@/store/Language/exceptions/InvalidLanguageTupelException';

const Language: LanugageProperties = {
	Primary: '',
	More: [],
	All: [],
	Labels: {},
	IsInit: false,
};
const state: StateInterface = {
	Language,
};

const TestTuple: [ Array<string>, number, any ] = [
	[ 'en', 'ru', 'gr', 'it', 'zh' ],
	3,
	MockData.default
];	

Vue.use( Vuex );

const StoreOps: StoreOptions<StateInterface> = {
	state,
	mutations,
};

