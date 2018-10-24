import TypeException from './TypeException';

export default class InvalidTermException extends TypeException {
	constructor( ...Parameter: any[] ) {
		super( ...Parameter );
	}
}
