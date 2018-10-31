import { MutationTree } from 'vuex';
import DictionaryInterface from '@/common/interfaces/DictionaryInterface';
import LanguageProperties from '@/store/Language/LanguageProperties';
import {
 LANGUAGE_INIT,
} from '@/store/Language/LanguageMethodNames';
import StateInterface from '@/store/root/StateInterface';
import InvalidLanguageTupelException from '@/store/Language/exceptions/InvalidLanguageTupelException';

function checkLanguageTuple( Tupel: any ) {
	if ( 'undefined' === typeof Tupel[ 0 ] || 
		( !Tupel[0].hasOwnProperty( 'length' ) || Tupel[ 0 ].length === 0 ) ||
		( !Number.isInteger( Tupel[1] ) || 0 >= Tupel[1] )
	) {
		throw new InvalidLanguageTupelException();
	}
	
	const Filtered: string[] = Tupel[ 0 ].filter( ( value: string ) => {
		return 'string' === typeof value;
	} );

 	if ( Tupel[0].length !== Filtered.length ) {
		throw new InvalidLanguageTupelException();
	}

	Object.keys( Tupel[2] ).forEach( ( Key: string ) => {
		 if( Key.match( /^[0-9]+$/ ) ) {
			throw new InvalidLanguageTupelException();
		 }

		if( 'string' !== typeof Tupel[2][Key] ) {
			throw new InvalidLanguageTupelException();
		}
	} );
}

export const mutations: MutationTree<StateInterface> = {
	[LANGUAGE_INIT] (
		state: any,
		Languages: [
			string[],
			number,
			DictionaryInterface<string>
		],
	): void {
		checkLanguageTuple( Languages );
		state.Language = {
			Primary: Languages[0][0],
			More: Languages[0].slice( 0, Languages[1] ),
			All: Languages[0],
			Labels: Languages[2],
			IsInit: true
		};
	},
};
