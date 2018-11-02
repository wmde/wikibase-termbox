import BaseStripper from '@/common/BaseStripper';
import DictionaryInterface from '@/common/interfaces/DictionaryInterface';
import InvalidLanguageTupelException from '@/store/Language/exceptions/InvalidLanguageTupelException';

export default class LanguageStripper extends BaseStripper {
	private readonly TUPEL_PART_OK = 0x0;
	private readonly TUPEL_NO_ARRAY = 0x1;
	private readonly TUPEL_MIXED_ARRAY = 0x2;
	private readonly TUPEL_IS_NOT_INTEGER = 0x3;
	private readonly TUPEL_IS_NOT_POSITIVE = 0x4;
	private readonly TUPEL_IS_ILL_RANGE = 0x5;
	private readonly TUPEL_IS_NOT_DICT = 0x6;
	private readonly TUPLE_DICT_IS_ARRAY = 0x7;
	private readonly TUPEL_MIXED_DICT = 0x8;
	private readonly TUPEL_NO = 0x9;
	private readonly TUPEL_NOT_WELL_FORMED = 0xa;
	private primaryLanguage: string;
	private moreLanguages: string[];
	private allLanguages: string[];
	private labels: DictionaryInterface<string>;

	constructor( tupel: any ) {
		super( tupel );
		this.checkPrerequisites();
		/* This is neccessary for a unknown reason.
		 * If it's not done, the value of unstrippedObject will be changed to
		 * this.unstrippedObject[ 0 ].splice( 0 , this.unstrippedObject[ 1 ] )
		 */
		this.primaryLanguage = this.unstrippedObject[ 0 ][ 0 ];
		this.moreLanguages = this.referMoreLanguages();
		this.allLanguages = this.unstrippedObject[ 0 ];
		this.labels = this.unstrippedObject[ 2 ];
		this.unstrippedObject = '';
	}

	public getLabels(): DictionaryInterface<string> {
		return this.labels;
	}

	public getPrimaryLanguage(): string {
		return this.primaryLanguage;
	}

	public getMoreLanguages(): string[] {
		return this.moreLanguages;
	}

	public getAllLanguages(): string[] {
		return this.allLanguages;
	}

	private referMoreLanguages(): string[] {
		return this.unstrippedObject[ 0 ].splice( 0 , this.unstrippedObject[ 1 ] );
	}

	private checkPrerequisites(): void {
		let checkMark: number = this.checkTupel();
		if ( this.TUPEL_NO === checkMark ) {
			throw new InvalidLanguageTupelException( 'There is no tupel' );
		}

		if ( this.TUPEL_NOT_WELL_FORMED === checkMark ) {
			throw new InvalidLanguageTupelException( 'The tupel is well formed' );
		}

		checkMark = this.isStringArray();
		if ( this.TUPEL_NO_ARRAY === checkMark ) {
			throw new InvalidLanguageTupelException( 'The tupel contains no languageskeys' );
		}

		if ( this.TUPEL_MIXED_ARRAY === checkMark ) {
			throw new InvalidLanguageTupelException( 'The tupel contains no valid languageskeys' );
		}

		checkMark = this.isPsotitveInteger();
		if ( this.TUPEL_IS_NOT_INTEGER === checkMark ) {
			throw new InvalidLanguageTupelException( 'The tupel contains no cut length' );
		}

		if ( this.TUPEL_IS_NOT_POSITIVE === checkMark ) {
			throw new InvalidLanguageTupelException( 'The tupel contains no valid cut length' );
		}

		if ( this.TUPEL_IS_ILL_RANGE === checkMark ) {
			throw new InvalidLanguageTupelException( 'The tupel contains invalid cut range' );
		}

		checkMark = this.isStringDictionary();
		if ( this.TUPEL_IS_NOT_DICT === checkMark ) {
			throw new InvalidLanguageTupelException( 'The tupel contains no language labels' );
		}

		if ( this.TUPLE_DICT_IS_ARRAY === checkMark ) {
			throw new InvalidLanguageTupelException( 'The tupel part of language labels is an array and not a dictionary' );
		}

		if ( this.TUPEL_MIXED_DICT === checkMark ) {
			throw new InvalidLanguageTupelException( 'The tupel contains no valid language labels' );
		}
	}

	private checkTupel(): number {
		if ( typeof this.unstrippedObject !== 'object' ||
			!this.unstrippedObject.hasOwnProperty( 'length' ) ) {
			return this.TUPEL_NO;
		}

		if ( this.unstrippedObject.length !== 3 ) {
			return this.TUPEL_NOT_WELL_FORMED;
		}

		return this.TUPEL_PART_OK;
	}

	private isStringArray(): number {
		const entry: any = this.unstrippedObject[ 0 ];
		if ( typeof entry === 'undefined' ||
			!entry.hasOwnProperty( 'length' ) ||
			entry.length === 0
		) {
			return this.TUPEL_NO_ARRAY;
		}

		const filtered: string[] = entry.filter( ( value: string ) => {
			return typeof value === 'string';
		} );

		if ( entry.length !== filtered.length ) {
			return this.TUPEL_MIXED_ARRAY;
		}
		return this.TUPEL_PART_OK;
	}

	private isPsotitveInteger(): number {
		const entry: any = this.unstrippedObject[ 1 ];
		if ( !Number.isInteger( entry ) ) {
			return this.TUPEL_IS_NOT_INTEGER;
		}

		if ( entry <= 0 ) {
			return this.TUPEL_IS_NOT_POSITIVE;
		}

		if ( this.unstrippedObject[ 0 ].length < entry ) {
			return this.TUPEL_IS_ILL_RANGE;
		}
		return this.TUPEL_PART_OK;
	}

	private isStringDictionary(): number {
		const entry: any = this.unstrippedObject[ 2 ];
		if ( typeof entry  !== 'object' ) {
			return this.TUPEL_IS_NOT_DICT;
		}

		const keys = Object.keys( entry );

		if ( keys.length === 0 ) {
			return this.TUPEL_IS_NOT_DICT;
		}

		if ( Array.isArray( entry ) ) {
			return this.TUPLE_DICT_IS_ARRAY;
		}

		/* This should be applied only in context of language keys */
		keys.forEach( ( key: string ) => {
			if ( key.match( /^[0-9]+$/ ) || !entry.hasOwnProperty( key ) ) {
				return this.TUPLE_DICT_IS_ARRAY;
			}

			if ( typeof entry[ key ] !== 'string' ) {
				return this.TUPEL_MIXED_DICT;
			}
		} );

		return this.TUPEL_PART_OK;
	}
}
