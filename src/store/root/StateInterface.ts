import EntityProperties from '@/store/Entity/Properties';
import UserProperties from '@/store/User/Properties';

export default interface StateInterface {
	Entity: EntityProperties;
	User: UserProperties;
}
