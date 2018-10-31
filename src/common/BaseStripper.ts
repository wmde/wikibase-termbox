export default class BaseStripper {
	protected UnstrippedObject: any;

	constructor( Something: any ) {
		if ( 'string' === typeof Something ) {
			 Something = JSON.parse( Something );
		 }
		this.UnstrippedObject = Something;
	}
}
