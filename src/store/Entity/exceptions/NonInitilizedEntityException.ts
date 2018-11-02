/* tslint:disable: variable-name */
import RunTimeException from '@/common/exceptions/RunTimeException';

export default class NonInitilizedEntityException extends RunTimeException {
	constructor( message?: string ) {
		super( message );
	}
}
