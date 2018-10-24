import TypeException from './typeException';

export default class InvalidTermException extends TypeException {
	constructor( ...Parameter: any[] ) {
		super( ...Parameter );
	}
}
