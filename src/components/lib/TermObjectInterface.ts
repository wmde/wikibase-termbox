export default interface TermObjectInterface {
	getId(): string;
	getType(): string;
	getLabels(): any;
	getDescriptions(): any;
	getAliases(): any;
	getLabelByLanguageKey( LanguageKey: string ): string;
	getDescriptionByLanguageKey( LanguageKey: string ): string;
	getAliasByLanguageKey( LanguageKey: string ): string[];
}
