import { MutationTree } from 'vuex';
import DictionaryInterface from '@/common/interfaces/DictionaryInterface';
import LanguageProperties from '@/store/Language/LanguageProperties';
import {
 LANGUAGE_INIT,
} from '@/store/Language/LanguageMethodNames';
import StateInterface from '@/store/root/StateInterface';
import LanguageStripper from '@/store/Language/LanguageStripper';
import LanguageMutationHelper from '@/store/Language/LanguageMutationHelper';

export const mutations: MutationTree<StateInterface> = {
	[LANGUAGE_INIT] (
		state: StateInterface,
		Tupel: LanguageStripper,
	): void {
		LanguageMutationHelper.isLanguageStipper( Tupel );
		state.Language = {
			Primary: Tupel.getPrimaryLanguage(),
			More: Tupel.getMoreLanguages(),
			All: Tupel.getAllLanguages(),
			Labels: Tupel.getLabels(),
			IsInit: true,
		};
	},
};
