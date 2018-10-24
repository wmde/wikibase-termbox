export default class LogicalException {
	constructor( ...Parameter: any[] ) {
		console.trace( new Error( ...Parameter ) );
	}
}
