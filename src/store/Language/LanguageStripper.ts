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
	private PrimaryLanguage: string;
	private MoreLanguages: string[];
	private AllLanguages: string[];
	private Labels: DictionaryInterface<string>;

	constructor( Tupel: any ) {
		super( Tupel );
		this.checkPrerequisites();
		/* This is neccessary for a unknown reason.
		 * If it's not done, the value of UnstrippedObject will be changed to
		 * this.UnstrippedObject[ 0 ].splice( 0 , this.UnstrippedObject[ 1 ] )
		 */
		this.PrimaryLanguage = this.UnstrippedObject[ 0 ][ 0 ];
		this.MoreLanguages = this.referMoreLanguages();
		this.AllLanguages = this.UnstrippedObject[ 0 ];
		this.Labels = this.UnstrippedObject[ 2 ];
		this.UnstrippedObject = '';
	}

	public getLabels(): DictionaryInterface<string> {
		return this.Labels;
	}

	public getPrimaryLanguage(): string {
		return this.PrimaryLanguage;
	}

	public getMoreLanguages(): string[] {
		return this.MoreLanguages;
	}

	public getAllLanguages(): string[] {
		return this.AllLanguages;
	}

	private referMoreLanguages(): string[] {
		return this.UnstrippedObject[ 0 ].splice( 0 , this.UnstrippedObject[ 1 ] );
	}

	private checkPrerequisites(): void {
		let CheckMark = this.checkTupel();
		if ( this.TUPEL_NO === CheckMark ) {
			throw new InvalidLanguageTupelException( 'There is no tupel' );
		}

		if ( this.TUPEL_NOT_WELL_FORMED === CheckMark ) {
			throw new InvalidLanguageTupelException( 'The tupel is well formed' );
		}

		CheckMark = this.isStringArray();
		if ( this.TUPEL_NO_ARRAY === CheckMark ) {
			throw new InvalidLanguageTupelException( 'The tupel contains no languagesKeys' );
		}

		if ( this.TUPEL_MIXED_ARRAY === CheckMark ) {
			throw new InvalidLanguageTupelException( 'The tupel contains no valid languagesKeys' );
		}

		CheckMark = this.isPsotitveInteger();
		if ( this.TUPEL_IS_NOT_INTEGER === CheckMark ) {
			throw new InvalidLanguageTupelException( 'The tupel contains no cut length' );
		}

		if ( this.TUPEL_IS_NOT_POSITIVE === CheckMark ) {
			throw new InvalidLanguageTupelException( 'The tupel contains no valid cut length' );
		}

		if ( this.TUPEL_IS_ILL_RANGE === CheckMark ) {
			throw new InvalidLanguageTupelException( 'The tupel contains invalid cut range' );
		}

		CheckMark = this.isStringDictionary();
		if ( this.TUPEL_IS_NOT_DICT === CheckMark ) {
			throw new InvalidLanguageTupelException( 'The tupel contains no language labels' );
		}

		if ( this.TUPLE_DICT_IS_ARRAY === CheckMark ) {
			throw new InvalidLanguageTupelException( 'The tupel part of language labels is an array and not a dictionary' );
		}

		if ( this.TUPEL_MIXED_DICT === CheckMark ) {
			throw new InvalidLanguageTupelException( 'The tupel contains no valid language labels' );
		}
	}

	private checkTupel(): number {
		if ( 'object' !== typeof this.UnstrippedObject ||
			!this.UnstrippedObject.hasOwnProperty( 'length' ) ) {
			return this.TUPEL_NO;
		}

		if ( 3 !== this.UnstrippedObject.length ) {
			return this.TUPEL_NOT_WELL_FORMED;
		}

		return this.TUPEL_PART_OK;
	}

	private isStringArray(): number {
		const Entry: any = this.UnstrippedObject[ 0 ];
		if ( 'undefined' === typeof Entry ||
			!Entry.hasOwnProperty( 'length' ) ||
			Entry.length === 0
		) {
			return this.TUPEL_NO_ARRAY;
		}

		const Filtered: string[] = Entry.filter( ( value: string ) => {
			return 'string' === typeof value;
		} );

		if ( Entry.length !== Filtered.length ) {
			return this.TUPEL_MIXED_ARRAY;
		}
		return this.TUPEL_PART_OK;
	}

	private isPsotitveInteger(): number {
		const Entry: any = this.UnstrippedObject[ 1 ];
		if ( !Number.isInteger( Entry ) ) {
			return this.TUPEL_IS_NOT_INTEGER;
		}

		if ( 0 >= Entry ) {
			return this.TUPEL_IS_NOT_POSITIVE;
		}

		if ( this.UnstrippedObject[ 0 ].length < Entry ) {
			return this.TUPEL_IS_ILL_RANGE;
		}
		return this.TUPEL_PART_OK;
	}

	private isStringDictionary(): number {
		const Entry: any = this.UnstrippedObject[ 2 ];
		if ( 'object' !== typeof Entry ) {
			return this.TUPEL_IS_NOT_DICT;
		}

		const Keys = Object.keys( Entry );

		if ( 0 === Keys.length ) {
			return this.TUPEL_IS_NOT_DICT;
		}

		if ( Array.isArray( Entry ) ) {
			return this.TUPLE_DICT_IS_ARRAY;
		}

		/* This should be applied only in context of language keys */
		Keys.forEach( ( Key: string ) => {
			if ( Key.match( /^[0-9]+$/ ) || !Entry.hasOwnProperty( Key ) ) {
				return this.TUPLE_DICT_IS_ARRAY;
			}

			if ( 'string' !== typeof Entry[ Key ] ) {
				return this.TUPEL_MIXED_DICT;
			}
		} );

		return this.TUPEL_PART_OK;
	}
}
