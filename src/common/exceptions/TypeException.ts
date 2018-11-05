export default class TypeExcpetion extends TypeError {
	constructor( message?: string ) {
		super();
		if ( typeof message !== 'undefined' ) {
			this.message = message;
		}

		if ( Error.captureStackTrace ) {
			Error.captureStackTrace( this, TypeExcpetion );
		}
	}
}
