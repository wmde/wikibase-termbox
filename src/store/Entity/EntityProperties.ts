import DictionaryInterface from '@/common/interfaces/DictionaryInterface';

export default interface EntityProperties {
	Id: string;
	Type: string;
	Labels: DictionaryInterface<string>;
	Descriptions: DictionaryInterface<string>;
	Aliases: DictionaryInterface<string[]>;
	IsInit: boolean;
}
