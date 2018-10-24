export default class TypeExcpetion {
	constructor( ...Parameter: any[] ) {
		console.trace( new TypeError( ...Parameter ) );
	}
}
