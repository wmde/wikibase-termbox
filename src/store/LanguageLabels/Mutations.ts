import { MutationTree } from 'vuex';
import Dictionary from '@/common/interfaces/Dictionary';
import {
	LANGUAGE_LABELS_INIT,
} from '@/store/LanguageLabels/Mutation.Types';
import Properties from '@/store/LanguageLabels/Properties';
import Helper from '@/store/LanguageLabels/LanguageLabelsMutationHelper';

export const mutations: MutationTree<Properties> = {
	[LANGUAGE_LABELS_INIT] ( state: Properties, labels: Dictionary<Dictionary<string>> ): void {
		Helper.isDictionary( labels );
		state.Labels = labels;
	},
};
