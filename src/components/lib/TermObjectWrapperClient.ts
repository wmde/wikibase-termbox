import TermObjectInterface from '@/components/lib/TermObjectInterface';
import InvalidTermException from '@/components/lib/exceptions/InvalidTermException';

export default class TermObjectWrapperClient implements TermObjectInterface {
	protected Labels: any;
	protected Aliases: any;
	protected Descriptions: any;
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

	public getLabels(): any[] {
		return this.Labels;
	}

	public getDescriptions(): any[] {
		return this.Descriptions;
	}

	public getAliases(): any[] {
		return this.Aliases;
	}

	public getLabelByLanguageKey( Key: any ): string {
		if ( this.Labels.hasOwnProperty( Key ) ) {
			return this.Labels[ Key ];
		} else {
			return '';
		}
	}

	public getDescriptionByLanguageKey( Key: any ): string {
		if ( this.Descriptions.hasOwnProperty( Key ) ) {
			return this.Descriptions[ Key ];
		} else {
			return '';
		}
	}

	public getAliasByLanguageKey( Key: any ): string[] {
		if ( this.Aliases.hasOwnProperty( Key ) ) {
			return this.Aliases[ Key ];
		} else {
			return [];
		}
	}

	private getNestedValues( TermObject: any, Index: string ): any {
		const Return: any = {};

		if ( !TermObject.hasOwnProperty( Index ) ) {
			return [];
		}
		Object.keys( TermObject[ Index ] ).forEach( ( LanguageKey: string ) => {
			Return[ LanguageKey ] = TermObject[ Index ][ LanguageKey ].value;
		} );

		return Return;
	}

	private getNestedLabels( TermObject: any ): any {
		return this.getNestedValues( TermObject, 'labels' );
	}

	private getNesatedDescriptions( TermObject: any ): any {
		return this.getNestedValues( TermObject, 'descriptions' );
	}

	private checkPrerequisites( TermObject: any ) {
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

	private getNestedAliases( TermObject: any ): string[] {
		const Return: any = {};
		let SubEntries: string[];
		if ( !TermObject.hasOwnProperty( 'aliases' ) || 0 === TermObject.aliases.length ) {
			return [];
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
