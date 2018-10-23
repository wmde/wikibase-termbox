import * as Entity from './Q64_data.json';

const Data = Entity as any;

export default class MWConfig {
	public EntityData: any = '';

	constructor() {
		this.EntityData = Data;
	}

	public get( ignoreMe: string ) {
		return JSON.stringify( this.EntityData.default );
	}
}
