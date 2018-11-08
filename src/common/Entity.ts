import EntityType from '@/common/interfaces/EntityType';
import Dictionary from '@/common/interfaces/Dictionary';

export default class Entity implements EntityType {
	public readonly id: string;
	public readonly type: string;
	public readonly labels: Dictionary<string>;
	public readonly descriptions: Dictionary<string>;
	public readonly aliases: Dictionary<string[]>;

	constructor( 
		id: string,
		type: string,
		labels: Dictionary<string>,
		descriptions: Dictionary<string>,
		aliases: Dictionary<string[]>
	) {
		this.id = id;
		this.type = type;
		this.labels = labels;
		this.descriptions = descriptions;
		this.aliases = aliases;
	}
}
