import TypeException from '@/components/lib/exceptions/TypeException';

export default class InvalidTermException extends TypeException {
	constructor( ...Parameter: any[] ) {
		super( ...Parameter );
	}
}
