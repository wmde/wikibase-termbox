import Entity from '@/store/entity/Entity';

export default interface WikibaseRepo {
	getEntity( id: string ): Promise<Entity>;
}
