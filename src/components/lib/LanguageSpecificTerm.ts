import LanguageSpecificTermException from '@/components/lib/exceptions/LanguageSpecificTermException';
import TermObjectInterface from '@/components/lib/TermObjectInterface';

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

	public getLabel() {
		return [
			this.defaultLanguageKey,
			this.Term.getLabelByLanguageKey( this.defaultLanguageKey ),
		];
	}

	public getDescription() {
		return [
			this.defaultLanguageKey,
			this.Term.getDescriptionByLanguageKey( this.defaultLanguageKey ),
		];
	}

	public getAlias() {
		return [
			this.defaultLanguageKey,
			this.Term.getAliasByLanguageKey( this.defaultLanguageKey ),
		];
	}
}
