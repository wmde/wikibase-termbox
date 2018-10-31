import DictionaryInterface from '@/common/interfaces/DictionaryInterface';

export default interface Language {
	Primary: string;
	More: string[];
	All: string[];
	Labels: DictionaryInterface<string>;
	IsInit: boolean;
}
