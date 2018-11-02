/* tslint:disable: variable-name */
import LogicalException from '@/common/exceptions/LogicalException';

export default class ParameterException extends LogicalException {
	constructor( ...Parameter: any[] ) {
		super( ...Parameter );
	}
}
