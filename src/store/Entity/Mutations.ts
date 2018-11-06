import { MutationTree } from 'vuex';
import EntityStripper from '@/store/Entity/EntityStripper';
import EntityMutationHelper from '@/store/Entity/EntityMutationHelper';
import {
	ENTITY_INIT,
} from '@/store/Entity/Mutation.Types';
import StateInterface from '@/store/Entity/StateInterface';

export const mutations: MutationTree<StateInterface> = {
	[ENTITY_INIT] ( state: StateInterface, stripper: EntityStripper ): void {
		EntityMutationHelper.isEntityStipper( stripper );
		state.Entity = {
			Id: stripper.getId(),
			Type: stripper.getType(),
			Labels: stripper.getLabels(),
			Descriptions: stripper.getDescriptions(),
			Aliases: stripper.getAliases(),
		};
	},
};
