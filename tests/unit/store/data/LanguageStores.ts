import { Module } from 'vuex';
import LanugageProperties from '@/store/Language/LanguageProperties';
import StateInterface from '@/store/root/StateInterface';
import * as MockData from '@/mock-data/data/en_lang_data.json';
import { languageGetters as getters } from '@/store/Language/LanguageGetters';
import DictionaryInterface from '@/common/interfaces/DictionaryInterface';
import LanguageStripper from '@/store/Language/LanguageStripper';

export const filledLanguageStripper = new LanguageStripper( [
	[ 'en', 'ru', 'gr', 'it', 'zh' ],
	3,
	MockData.default,
] );
const namespaced = true;

let languageValue: LanugageProperties = {
	Primary: '',
	More: [],
	All: [],
	Labels: {},
	IsInit: false,
};

let state: StateInterface = {
	Language: languageValue,
};

export const emptyLanguageState = state;

export const emptyLanguageModule: Module<StateInterface, any> = {
	namespaced,
	state,
	getters,
};

languageValue = {
	Primary: filledLanguageStripper.getPrimaryLanguage(),
	More: filledLanguageStripper.getMoreLanguages(),
	All: filledLanguageStripper.getAllLanguages(),
	Labels: filledLanguageStripper.getLabels(),
	IsInit: true,
};

state = {
	Language: languageValue,
};

export const filledLanguageState = state;

export const filledLanguageModule = {
	namespaced,
	state,
	getters,
};
