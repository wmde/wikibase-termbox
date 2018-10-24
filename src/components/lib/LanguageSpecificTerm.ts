import TermObjectWrapper from '@/components/lib/TermObjectWrapper';
import LanguageSpecificTermException from '@/components/lib/exceptions/LanguageSpecificTermException';

export default class LanguageSpecificTerm extends TermObjectWrapper {
	private defaultLanguageKey: string = '';

	constructor( LanguageKey: string, EntityJSONString: string ) {
		super( EntityJSONString );

		LanguageKey = LanguageKey.trim();

		if ( 0 === LanguageKey.trim().length ) {
			throw new LanguageSpecificTermException( 'No languageKey was given' );
		}

		this.defaultLanguageKey = LanguageKey;
	}

	public getLabel() {
		return [
			this.defaultLanguageKey,
			this.getLabelByLanguageKey( this.defaultLanguageKey ),
		];
	}

	public getAlias() {
		return [
			this.defaultLanguageKey,
			this.getAliasesByLanguageKey( this.defaultLanguageKey ),
		];
	}
}
