import Dictionary from '@/common/interfaces/Dictionary';

export default class FingerprintableEntity {
	public readonly id: string;
	public readonly type: 'item' | 'property';
	public readonly labels: Dictionary<string>;
	public readonly descriptions: Dictionary<string>;
	public readonly aliases: Dictionary<string[]>;

	constructor(
		id: string,
		type: 'item' | 'property',
		labels: Dictionary<string>,
		descriptions: Dictionary<string>,
		aliases: Dictionary<string[]>,
	) {
		this.id = id;
		this.type = type;
		this.labels = labels;
		this.descriptions = descriptions;
		this.aliases = aliases;
	}

}
