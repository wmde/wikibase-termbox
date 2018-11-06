import { GetterTree } from 'vuex';
import StateInterface from '@/store/User/StateInterface';

export const getters: GetterTree<StateInterface, any> = {
	getPrimaryLanguage( state: StateInterface ) {
		return state.User.PrimaryLanguage;
	},
};
