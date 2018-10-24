import InvalidTermException from './exceptions/invalidTermException';

export default class {
	private entityObject: any;

	constructor( entityJSONString: string ) {
		if ( 0 === entityJSONString.length ) {
			throw new InvalidTermException( 'There was no object given' );
		}

		this.entityObject = JSON.parse( entityJSONString );

		this.checkPrerequisites();
	}

	public getId(): string {
		return this.entityObject.id;
	}

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

	public getLabelByLanguageKey( Key: string ): string {
		if ( !this.isEmptyProperty( 'labels' ) ) {
			return '';
		}

		if ( Key in this.entityObject.labels ) {
			if ( this.entityObject.labels[ Key ].hasOwnProperty( 'value' ) ) {
				return this.entityObject.labels[ Key ].value;
			} else {
				return '';
				}
		} else {
			return '';
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

	private checkPrerequisites() {
		if ( !this.entityObject.hasOwnProperty( 'id' ) ) {
			throw new InvalidTermException( 'Missing termid' );
		}

		if ( 0 === this.entityObject.id.length ) {
			throw new InvalidTermException( 'Missing termid' );
		}

		if ( !this.entityObject.hasOwnProperty( 'type' ) ) {
			throw new InvalidTermException( `Missing type on term ${this.entityObject.id}` );
		}

		if ( 0 === this.entityObject.type.length ) {
			throw new InvalidTermException( `Missing type on term ${this.entityObject.id}` );
		}
	}

	private isEmptyProperty( Key: string ) {
		return this.entityObject.hasOwnProperty( Key );
	}

	private getNestedAliases( AliasList: any ): string[] {
		const Return: string[] = [];

		if ( 0 === AliasList.length ) {
			return [];
		}

		AliasList.forEach( ( Item: any ) => {
			if ( Item.hasOwnProperty( 'value' ) ) {
				Return.push( Item.value );
			}
		} );

		return Return;
	}
}
