import RunTimeException from '@/common/exceptions/RunTimeException';

export default class NonInitilizedLanguageException extends RunTimeException {
	constructor( ...Parameter: any[] ) {
		super( ...Parameter );
	}
}
