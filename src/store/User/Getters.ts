import { GetterTree } from 'vuex';
import Properties from '@/store/User/Properties';

export const getters: GetterTree<Properties, any> = {
	getPrimaryLanguage( state: Properties ) {
		return state.PrimaryLanguage;
	},
};
