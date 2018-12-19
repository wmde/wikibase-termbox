declare module 'mwbot' {
	interface MwbotOptions {
		apiUrl: string;
	}

	export default class mwbot {
		public readonly options: MwbotOptions;
		constructor( config: object );
		request( params: object, customRequestOptions: object = {} ): Promise<object>;
	}
}
