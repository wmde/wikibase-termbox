/* tslint:disable: variable-name */
import TypeException from '@/common/exceptions/TypeException';

export default class InvalidEntityException extends TypeException {
	constructor( message?: string ) {
		super( message );
	}
}
