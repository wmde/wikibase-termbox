import { MutationTree } from 'vuex';
import EntityProperties from '@/store/Entity/EntityProperties';
import EntityStripper from '@/store/Entity/EntityStripper';
import EntityMutationHelper from '@/store/Entity/EntityMutationHelper';
import {
 ENTITY_INIT,
} from '@/store/Entity/EntityMethodNames';
import StateInterface from '@/store/root/StateInterface';

export const mutations: MutationTree<StateInterface> = {
	[ENTITY_INIT] ( state: StateInterface, Stripper: EntityStripper ): void {
		EntityMutationHelper.isEntityStipper( Stripper );
		state.Entity = {
			Id: Stripper.getId(),
			Type: Stripper.getType(),
			Labels: Stripper.getLabels(),
			Descriptions: Stripper.getDescriptions(),
			Aliases: Stripper.getAliases(),
			IsInit: true,
		};
	},
};
