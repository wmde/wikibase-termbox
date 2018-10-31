import RunTimeException from '@/common/exceptions/RunTimeException';

export default class NonInitilizedEntityException extends RunTimeException {
	constructor( ...Parameter: any[] ) {
		super( ...Parameter );
	}
}
