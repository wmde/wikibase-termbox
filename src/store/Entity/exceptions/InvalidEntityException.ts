import TypeException from '@/common/exceptions/TypeException';

export default class InvalidEntityException extends TypeException {
	constructor( ...Parameter: any[] ) {
		super( ...Parameter );
	}
}
