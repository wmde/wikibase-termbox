import Dictionary from '@/common/interfaces/Dictionary';
import InvalidEntityException from '@/store/Entity/exceptions/InvalidEntityException';

export default class EntityStripper {
	private unstrippedEntity: any;

	constructor( entity: any ) {
		if ( typeof entity === 'string' ) {
			entity = JSON.parse( entity );
		}

		this.unstrippedEntity = entity;
		this.checkPrerequisites();
	}

	public getId(): string {
		return this.unstrippedEntity.id;
	}

	public getType(): string {
		return this.unstrippedEntity.type;
	}

	public getLabels(): Dictionary<string> {
		return this.getNestedLabels();
	}

	public getDescriptions(): Dictionary<string> {
		return this.getNesatedDescriptions();
	}

	public getAliases(): Dictionary<string[]> {
		return this.getNestedAliases( this.unstrippedEntity );
	}

	private getNestedValues( entityObject: any, index: string ): Dictionary<string> {
		const value: Dictionary<string> = {};

		if ( !entityObject.hasOwnProperty( index ) ) {
			return value;
		}
		Object.keys( entityObject[ index ] ).forEach( ( languageKey: string ) => {
			value[ languageKey ] = entityObject[ index ][ languageKey ].value;
		} );

		return value;
	}

	private getNestedLabels(): Dictionary<string> {
		return this.getNestedValues( this.unstrippedEntity, 'labels' );
	}

	private getNesatedDescriptions(): Dictionary<string> {
		return this.getNestedValues( this.unstrippedEntity, 'descriptions' );
	}

	private checkPrerequisites(): void {
		if ( !this.unstrippedEntity.hasOwnProperty( 'id' ) ) {
			throw new InvalidEntityException( 'Missing entityid' );
		}

		if ( typeof this.unstrippedEntity.id !== 'string' ) {
			throw new InvalidEntityException( 'Unsupported type of entityid' );
		}

		if ( this.unstrippedEntity.id.length === 0 ) {
			throw new InvalidEntityException( 'Missing entityid' );
		}

		if ( !this.unstrippedEntity.hasOwnProperty( 'type' ) ) {
			throw new InvalidEntityException( `Missing type on entiy ${this.unstrippedEntity.id}` );
		}

		if ( typeof this.unstrippedEntity.type !== 'string' ) {
			throw new InvalidEntityException( 'Unsupported type of entitytype' );
		}

		if ( this.unstrippedEntity.type.length === 0 ) {
			throw new InvalidEntityException( `Missing type on entity ${this.unstrippedEntity.id}` );
		}
	}

	private getNestedAliases( entityObject: any ): Dictionary<string[]> {
		const aliases: Dictionary<string[]>  = {};
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
