import DictionaryInterface from '@/components/lib/interfaces/DictionaryInterface';

export default interface TermObjectInterface {
	getId(): string;
	getType(): string;
	getLabels(): DictionaryInterface<string>;
	getDescriptions(): DictionaryInterface<string>;
	getAliases(): DictionaryInterface<string[]>;
	getLabelByLanguageKey( LanguageKey: string ): string;
	getDescriptionByLanguageKey( LanguageKey: string ): string;
	getAliasByLanguageKey( LanguageKey: string ): string[];
}
