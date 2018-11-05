import * as entity from './data/Q64_data.json';
import * as languages from './data/en_lang_data.json';

export default class MWConfig {
	public get( key: string ): string {
		const config: { [ index: string]: string } = {
			wgULSLanguages: JSON.stringify( languages.default ),
			wbEntity: JSON.stringify( entity.default ),
		};

		return config[ key ];
	}
}
