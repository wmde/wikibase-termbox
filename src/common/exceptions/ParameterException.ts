/* tslint:disable: variable-name */
import LogicalException from '@/common/exceptions/LogicalException';

export default class ParameterException extends LogicalException {
	constructor( message?: string ) {
		super( message );
	}
}
