import RunTimeException from '@/common/exceptions/RunTimeException';

export default class NonInitilizedLanguageException extends RunTimeException {
	constructor( message?: string ) {
		super( message );
	}
}
