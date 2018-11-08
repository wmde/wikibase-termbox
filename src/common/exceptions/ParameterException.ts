import TypeException from '@/common/exceptions/LogicException';

export default class ParameterException extends TypeException {
	constructor( message?: string ) {
		super( message );
	}
}
