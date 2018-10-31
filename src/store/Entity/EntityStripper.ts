import DictionaryInterface from '@/common/interfaces/DictionaryInterface';
import InvalidEntityException from '@/store/Entity/exceptions/InvalidEntityException';
import BaseStripper from '@/common/BaseStripper';

export default class EntityStripper extends BaseStripper {
	private UnstrippedEntity: any;

	constructor( Entity: any ) {
		super( Entity );
		this.checkPrerequisites();
		/* see: @/store/Language/LanguageStripper */
		this.UnstrippedEntity = this.UnstrippedObject;
		this.UnstrippedObject = '';
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

	private checkPrerequisites(): void {
		if ( !this.UnstrippedObject.hasOwnProperty( 'id' ) ) {
			throw new InvalidEntityException( 'Missing entityid' );
		}

		if ( 'string' !== typeof this.UnstrippedObject.id ) {
			throw new InvalidEntityException( 'Unsupported type of entityid' );
		}

		if ( 0 === this.UnstrippedObject.id.length ) {
			throw new InvalidEntityException( 'Missing entityid' );
		}

		if ( !this.UnstrippedObject.hasOwnProperty( 'type' ) ) {
			throw new InvalidEntityException( `Missing type on entiy ${this.UnstrippedObject.id}` );
		}

		if ( 'string' !== typeof this.UnstrippedObject.type ) {
			throw new InvalidEntityException( 'Unsupported type of entitytype' );
		}

		if ( 0 === this.UnstrippedObject.type.length ) {
			throw new InvalidEntityException( `Missing type on entity ${this.UnstrippedObject.id}` );
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
