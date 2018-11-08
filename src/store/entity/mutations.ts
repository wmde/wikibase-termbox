import { MutationTree } from 'vuex';
import Entity from '@/store/entity/Entity';
import {
	ENTITY_INIT,
} from '@/store/entity/mutationTypes';
import InvalidEntityException from '@/store/entity/exceptions/InvalidEntityException';
import FingerprintableEntity from '@/datamodel/FingerprintableEntity';

export const mutations: MutationTree<Entity> = {
	[ENTITY_INIT] ( state: Entity, entity: FingerprintableEntity ): void {
		if ( !( entity instanceof FingerprintableEntity ) ) {
			throw new InvalidEntityException();
		}

		state.id = entity.id;
		state.labels = entity.labels;
		state.descriptions = entity.descriptions;
		state.aliases = entity.aliases;
	},
};
