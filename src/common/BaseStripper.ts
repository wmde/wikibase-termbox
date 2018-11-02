export default class BaseStripper {
	protected unstrippedObject: any;

	constructor( something: any ) {
		if ( typeof something === 'string' ) {
			something = JSON.parse( something );
		}
		this.unstrippedObject = something;
	}
}
