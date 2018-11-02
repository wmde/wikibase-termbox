export default class LogicalException extends Error {
	constructor( message?: string ) {
		super();
		if ( typeof message !== 'undefined' ) {
			this.message = message;
		}

		if ( Error.captureStackTrace ) {
			Error.captureStackTrace( this, LogicalException );
		}
	}
}
