import { Module } from 'vuex';
import LanugageProperties from '@/store/Language/LanguageProperties';
import StateInterface from '@/store/root/StateInterface';
import * as MockData from '@/mock-data/data/en_lang_data.json';
import { getters } from '@/store/Language/LanguageGetters';
import DictionaryInterface from '@/common/interfaces/DictionaryInterface';
import LanguageStripper from '@/store/Language/LanguageStripper';

export const FilledLanguageStripper = new LanguageStripper( [
	[ 'en', 'ru', 'gr', 'it', 'zh' ],
	3,
	MockData.default,
] );
const namespaced = true;

let LanguageValue: LanugageProperties = {
	Primary: '',
	More: [],
	All: [],
	Labels: {},
	IsInit: false,
};

let state: StateInterface = {
	Language: LanguageValue,
};

export const EmptyLanguageState = state;

export const EmptyLanguageModule: Module<StateInterface, any> = {
        namespaced,
        state,
        getters,
};
LanguageValue = {
	Primary: FilledLanguageStripper.getPrimaryLanguage(),
	More: FilledLanguageStripper.getMoreLanguages(),
	All: FilledLanguageStripper.getAllLanguages(),
	Labels: FilledLanguageStripper.getLabels(),
	IsInit: true,
};

state = {
	Language: LanguageValue,
};

export const FilledLanguageState = state;

export const FilledLanguageModule = {
	namespaced,
	state,
	getters,
};
