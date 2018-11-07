import { MutationTree } from 'vuex';
import EntityStripper from '@/store/Entity/EntityStripper';
import EntityMutationHelper from '@/store/Entity/EntityMutationHelper';
import {
	ENTITY_INIT,
} from '@/store/Entity/Mutation.Types';
import Properties from '@/store/Entity/Properties';

export const mutations: MutationTree<Properties> = {
	[ENTITY_INIT] ( state: Properties, stripper: EntityStripper ): void {
		EntityMutationHelper.isEntityStipper( stripper );
		state.Id = stripper.getId();
		state.Type = stripper.getType();
		state.Labels = stripper.getLabels();
		state.Descriptions = stripper.getDescriptions();
		state.Aliases = stripper.getAliases();
	},
};
