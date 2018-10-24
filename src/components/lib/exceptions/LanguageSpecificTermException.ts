import LogicalException from '@/components/lib/exceptions/LogicalException';

export default class LanguageSpecificTermException extends LogicalException {
	constructor( ...Parameter: any[] ) {
		super( ...Parameter );
	}
}
