import LogicalException from '@/common/exceptions/LogicalException';

export default class RunTimeException extends LogicalException {
	constructor( ...Parameter: any[] ) {
		super( ...Parameter );
	}
}
