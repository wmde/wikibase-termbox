import DictionaryInterface from '@/common/interfaces/DictionaryInterface';

export default interface EntityProperties {
	Id: string;
	Type: string;
	Labels: DictionaryInterface<string>;
	Descriptions: DictionaryInterface<string>;
	Aliases: DictionaryInterface<string[]>;
	/* Mangement Variables */
	IsInit: boolean;
	/*
	getTermId(): string;
	getTermType(): string;
	getTermLabels(): DictionaryInterface<string>;
	getTermLabel(): [string, string];
	getTermDescriptions(): DictionaryInterface<string>;
	getTermDescription(): [string, string];
	getTermAliases(): DictionaryInterface<string[]>;
	getTermAlias(): [string, string[]];
/*	public getLabelByLanguageKey( LanguageKey: string ): string;
	public getDescriptionByLanguageKey( LanguageKey: string ): string;
	public getAliasByLanguageKey( LanguageKey: string ): string[];*/
	/* Mutations */
	/* Actions */
}
