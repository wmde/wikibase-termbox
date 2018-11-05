import ParameterException from '@/common/exceptions/ParameterException';

export default class InvalidEntityStripperException extends ParameterException {
	constructor( message?: string ) {
		super( message );
	}
}
