/* variable rule cannot applied here otherwise it destroy the special syntax for multible parameter */
/* tslint:disable: variable-name */
export default class LogicalException {
	constructor( ...Parameter: any[] ) {
		console.trace( new Error( ...Parameter ) );
	}
}
