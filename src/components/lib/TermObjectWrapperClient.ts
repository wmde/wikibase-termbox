import DictionaryInterface from '@/components/lib/interfaces/DictionaryInterface';
import TermObjectInterface from '@/components/lib/interfaces/TermObjectInterface';
import InvalidTermException from '@/components/lib/exceptions/InvalidTermException';

export default class TermObjectWrapperClient implements TermObjectInterface {
	protected Labels: DictionaryInterface<string>;
	protected Aliases: DictionaryInterface<string[]>;
	protected Descriptions: DictionaryInterface<string>;
	private Id: string;
	private Type: string;
	constructor( EntityJSONString: string ) {
		const TermObject: any = JSON.parse( EntityJSONString );
		this.checkPrerequisites( TermObject );

		this.Id = TermObject.id;
		this.Type = TermObject.type;
		this.Labels = this.getNestedLabels( TermObject );
		this.Descriptions = this.getNesatedDescriptions( TermObject );
		this.Aliases = this.getNestedAliases( TermObject );
	}

	public getId(): string {
		return this.Id;
	}

	public getType(): string {
		return this.Type;
	}

	public getLabels(): DictionaryInterface<string> {
		return this.Labels;
	}

	public getDescriptions(): DictionaryInterface<string> {
		return this.Descriptions;
	}

	public getAliases(): DictionaryInterface<string[]> {
		return this.Aliases;
	}

	public getLabelByLanguageKey( Key: string ): string {
		if ( this.Labels.hasOwnProperty( Key ) ) {
			return this.Labels[ Key ];
			return '';
		} else {
			return '';
		}
	}

	public getDescriptionByLanguageKey( Key: string ): string {
		if ( this.Descriptions.hasOwnProperty( Key ) ) {
			return this.Descriptions[ Key ];
		} else {
			return '';
		}
	}

	public getAliasByLanguageKey( Key: string ): string[] {
		if ( this.Aliases.hasOwnProperty( Key ) ) {
			return this.Aliases[ Key ];
		} else {
			return [];
		}
	}

	private getNestedValues( TermObject: any, Index: string ): DictionaryInterface<string> {
		const Return: DictionaryInterface<string> = {};

		if ( !TermObject.hasOwnProperty( Index ) ) {
			return Return;
		}
		Object.keys( TermObject[ Index ] ).forEach( ( LanguageKey: string ) => {
			Return[ LanguageKey ] = TermObject[ Index ][ LanguageKey ].value;
		} );

		return Return;
	}

	private getNestedLabels( TermObject: any ): DictionaryInterface<string> {
		return this.getNestedValues( TermObject, 'labels' );
	}

	private getNesatedDescriptions( TermObject: any ): DictionaryInterface<string> {
		return this.getNestedValues( TermObject, 'descriptions' );
	}

	private checkPrerequisites( TermObject: any ): void {
		if ( !TermObject.hasOwnProperty( 'id' ) ) {
			throw new InvalidTermException( 'Missing termid' );
		}

		if ( 0 === TermObject.id.length ) {
			throw new InvalidTermException( 'Missing termid' );
		}

		if ( !TermObject.hasOwnProperty( 'type' ) ) {
			throw new InvalidTermException( `Missing type on term ${TermObject.id}` );
		}

		if ( 0 === TermObject.type.length ) {
			throw new InvalidTermException( `Missing type on term ${TermObject.id}` );
		}
	}

	private getNestedAliases( TermObject: any ): DictionaryInterface<string[]> {
		const Return: DictionaryInterface<string[]>  = {};
		let SubEntries: string[];
		if ( !TermObject.hasOwnProperty( 'aliases' ) || 0 === TermObject.aliases.length ) {
			return Return;
		}

		Object.keys( TermObject.aliases ).forEach( ( LanguageKey: string ) => {
			SubEntries = [];
			TermObject.aliases[ LanguageKey ].forEach( ( Value: any ) => {
				SubEntries.push( Value.value );
			} );

			Return[ LanguageKey ] = SubEntries;
		} );

		return Return;
	}
}
