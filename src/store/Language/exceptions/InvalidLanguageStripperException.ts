/* tslint:disable: variable-name */
import ParameterException from '@/common/exceptions/ParameterException';

export default class InvalidLanguageStripperException extends ParameterException {
	constructor( ...Parameter: any[] ) {
		super( ...Parameter );
	}
}
