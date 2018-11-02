import ParameterException from '@/common/exceptions/ParameterException';

export default class InvalidLanguageTupleException extends ParameterException {
	constructor( message?: string ) {
		super( message );
	}
}
