import DictionaryInterface from '@/common/interfaces/DictionaryInterface';
import InvalidEntityException from '@/store/Entity/exceptions/InvalidEntityException';

export default class EntityStripper {

	private UnstrippedEntity: any;

	constructor( Entity: any ) {
		if ( 'string' === typeof Entity ) {
			Entity = JSON.parse( Entity );
		}

		this.checkPrerequisites( Entity );
		this.UnstrippedEntity = Entity;
	}

	public getId(): string {
		return this.UnstrippedEntity.id;
	}

	public getType(): string {
		return this.UnstrippedEntity.type;
	}

	public getLabels(): DictionaryInterface<string> {
		return this.getNestedLabels();
	}

	public getDescriptions(): DictionaryInterface<string> {
		return this.getNesatedDescriptions();
	}

	public getAliases(): DictionaryInterface<string[]> {
		return this.getNestedAliases( this.UnstrippedEntity );
	}

	private getNestedValues( EntityObject: any, Index: string ): DictionaryInterface<string> {
		const Return: DictionaryInterface<string> = {};

		if ( !EntityObject.hasOwnProperty( Index ) ) {
			return Return;
		}
		Object.keys( EntityObject[ Index ] ).forEach( ( LanguageKey: string ) => {
			Return[ LanguageKey ] = EntityObject[ Index ][ LanguageKey ].value;
		} );

		return Return;
	}

	private getNestedLabels(): DictionaryInterface<string> {
		return this.getNestedValues( this.UnstrippedEntity, 'labels' );
	}

	private getNesatedDescriptions(): DictionaryInterface<string> {
		return this.getNestedValues( this.UnstrippedEntity, 'descriptions' );
	}

	private checkPrerequisites( EntityObject: any ): void {
		if ( !EntityObject.hasOwnProperty( 'id' ) ) {
			throw new InvalidEntityException( 'Missing termid' );
		}

		if ( 0 === EntityObject.id.length ) {
			throw new InvalidEntityException( 'Missing termid' );
		}

		if ( !EntityObject.hasOwnProperty( 'type' ) ) {
			throw new InvalidEntityException( `Missing type on term ${EntityObject.id}` );
		}

		if ( 0 === EntityObject.type.length ) {
			throw new InvalidEntityException( `Missing type on term ${EntityObject.id}` );
		}
	}

	private getNestedAliases( EntityObject: any ): DictionaryInterface<string[]> {
		const Return: DictionaryInterface<string[]>  = {};
		let SubEntries: string[];
		if ( !EntityObject.hasOwnProperty( 'aliases' ) || 0 === EntityObject.aliases.length ) {
			return Return;
		}

		Object.keys( EntityObject.aliases ).forEach( ( LanguageKey: string ) => {
			SubEntries = [];
			EntityObject.aliases[ LanguageKey ].forEach( ( Value: any ) => {
				SubEntries.push( Value.value );
			} );

			Return[ LanguageKey ] = SubEntries;
		} );

		return Return;
	}
}
