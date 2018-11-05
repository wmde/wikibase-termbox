import LogicalException from '@/common/exceptions/LogicalException';

export default class RunTimeException extends LogicalException {
	constructor( message?: string ) {
		super( message );
	}
}
