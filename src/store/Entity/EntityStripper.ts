import DictionaryInterface from '@/common/interfaces/DictionaryInterface';
import InvalidEntityException from '@/store/Entity/exceptions/InvalidEntityException';
import BaseStripper from '@/common/BaseStripper';

export default class EntityStripper extends BaseStripper {
	private unstrippedEntity: any;

	constructor( entity: any ) {
		super( entity );
		this.checkPrerequisites();
		/* see: @/store/Language/LanguageStripper */
		this.unstrippedEntity = this.unstrippedObject;
		this.unstrippedObject = '';
	}

	public getId(): string {
		return this.unstrippedEntity.id;
	}

	public getType(): string {
		return this.unstrippedEntity.type;
	}

	public getLabels(): DictionaryInterface<string> {
		return this.getNestedLabels();
	}

	public getDescriptions(): DictionaryInterface<string> {
		return this.getNesatedDescriptions();
	}

	public getAliases(): DictionaryInterface<string[]> {
		return this.getNestedAliases( this.unstrippedEntity );
	}

	private getNestedValues( entityObject: any, index: string ): DictionaryInterface<string> {
		const value: DictionaryInterface<string> = {};

		if ( !entityObject.hasOwnProperty( index ) ) {
			return value;
		}
		Object.keys( entityObject[ index ] ).forEach( ( languageKey: string ) => {
			value[ languageKey ] = entityObject[ index ][ languageKey ].value;
		} );

		return value;
	}

	private getNestedLabels(): DictionaryInterface<string> {
		return this.getNestedValues( this.unstrippedEntity, 'labels' );
	}

	private getNesatedDescriptions(): DictionaryInterface<string> {
		return this.getNestedValues( this.unstrippedEntity, 'descriptions' );
	}

	private checkPrerequisites(): void {
		if ( !this.unstrippedObject.hasOwnProperty( 'id' ) ) {
			throw new InvalidEntityException( 'Missing entityid' );
		}

		if ( typeof this.unstrippedObject.id !== 'string' ) {
			throw new InvalidEntityException( 'Unsupported type of entityid' );
		}

		if ( this.unstrippedObject.id.length === 0 ) {
			throw new InvalidEntityException( 'Missing entityid' );
		}

		if ( !this.unstrippedObject.hasOwnProperty( 'type' ) ) {
			throw new InvalidEntityException( `Missing type on entiy ${this.unstrippedObject.id}` );
		}

		if ( typeof this.unstrippedObject.type !== 'string' ) {
			throw new InvalidEntityException( 'Unsupported type of entitytype' );
		}

		if ( this.unstrippedObject.type.length === 0 ) {
			throw new InvalidEntityException( `Missing type on entity ${this.unstrippedObject.id}` );
		}
	}

	private getNestedAliases( entityObject: any ): DictionaryInterface<string[]> {
		const aliases: DictionaryInterface<string[]>  = {};
		let subEntries: string[];
		if ( !entityObject.hasOwnProperty( 'aliases' ) || entityObject.aliases.length === 0 ) {
			return aliases;
		}

		Object.keys( entityObject.aliases ).forEach( ( languageKey: string ) => {
			subEntries = [];
			entityObject.aliases[ languageKey ].forEach( ( value: any ) => {
				subEntries.push( value.value );
			} );

			aliases[ languageKey ] = subEntries;
		} );

		return aliases;
	}
}
