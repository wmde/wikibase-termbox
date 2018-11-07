import ParameterException from '@/common/exceptions/ParameterException';

export default class InvalidLanguageLabelInputException
extends ParameterException {
	constructor( message?: string ) {
		super( message );
	}
}
