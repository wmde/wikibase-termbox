import ParameterException from '@/common/exceptions/ParameterException';

export default class InvalidLanguageStripperException extends ParameterException {
	constructor( message?: string ) {
		super( message );
	}
}
