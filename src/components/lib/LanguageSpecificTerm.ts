import LanguageSpecificTermException from '@/components/lib/exceptions/LanguageSpecificTermException';
import TermObjectInterface from '@/components/lib/interfaces/TermObjectInterface';

export default class LanguageSpecificTerm {
	private defaultLanguageKey: string = '';
	private Term: TermObjectInterface;

	constructor( LanguageKey: string, Term: TermObjectInterface ) {
		LanguageKey = LanguageKey.trim();

		if ( 0 === LanguageKey.length ) {
			throw new LanguageSpecificTermException( 'No languageKey was given' );
		}

		this.defaultLanguageKey = LanguageKey;
		this.Term = Term;
	}

	public getLabel(): [string, string] {
		return [
			this.defaultLanguageKey,
			this.Term.getLabelByLanguageKey( this.defaultLanguageKey ),
		];
	}

	public getDescription(): [string, string] {
		return [
			this.defaultLanguageKey,
			this.Term.getDescriptionByLanguageKey( this.defaultLanguageKey ),
		];
	}

	public getAlias(): [string, string[]] {
		return [
			this.defaultLanguageKey,
			this.Term.getAliasByLanguageKey( this.defaultLanguageKey ),
		];
	}
}
