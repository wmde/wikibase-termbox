/**
 * TODO
 * Exceptions on id and type
 */

export default class {
	private entityObject: any;

	constructor( entityJSONString: string ) {
		this.entityObject = JSON.parse( entityJSONString );
	}

	public getId(): string {
		if ( !this.isEmptyProperty( 'id' ) ) {
			return '';
		} else {
			return this.entityObject.id;
		}
	}

	public isItem(): boolean {
		return this.entityObject.type === 'item';
	}

	/* Every Term should have a type */
	public getType(): string {
		return this.entityObject.type;
	}

	public getLabels(): any {
		 if ( !this.isEmptyProperty( 'labels' ) ) {
			 return [];
		 } else {
			 return this.entityObject.labels;
		 }
	}

	public getLabelByLanguageKey( Key: string ): any {
		if ( !this.isEmptyProperty( 'labels' ) ) {
			return [];
		}

		if ( Key in this.entityObject.labels ) {
			return this.entityObject.labels[ Key ].value;
		} else {
			return [];
		}
	}

	public getAliases(): any {
		if ( !this.isEmptyProperty( 'aliases' ) ) {
			return [];
		} else {
			return this.entityObject.aliases;
		}
	}

	public getAliasByLanguageKey( Key: string ): string[] {
		if ( !this.isEmptyProperty( 'aliases' ) ) {
			return [];
		}

		if ( Key in this.entityObject.aliases ) {
			return this.getNestedAliases( this.entityObject.aliases[ Key ] );
		} else {
			return [];
		}
	}

	private isEmptyProperty( Key: string ) {
		return this.entityObject.hasOwnProperty( Key );
	}

	private getNestedAliases( AliasList: any ): string[] {
		let Index: string;
		const Return: string[] = [];

		if ( 0 === AliasList.length ) {
			return [];
		}

		for ( Index in AliasList ) {
			Return.push( AliasList[ Index ].value );
		}

		return Return;
	}
}
