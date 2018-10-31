import EntityStripper from '@/store/Entity/EntityStripper';
import InvalidEntityStripperException from '@/store/Entity/exceptions/InvalidEntityStripperException';

export default class EntityMutationHelper {
	public static isEntityStipper ( Stripper: any ) {
		if ( !( Stripper instanceof EntityStripper ) ) {
			throw new InvalidEntityStripperException();
		}
	}
}
