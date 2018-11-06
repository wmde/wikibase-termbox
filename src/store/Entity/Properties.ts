import Dictionary from '@/common/interfaces/Dictionary';

export default interface EntityProperties {
	Id: string;
	Type: string;
	Labels: Dictionary<string>;
	Descriptions: Dictionary<string>;
	Aliases: Dictionary<string[]>;
}
