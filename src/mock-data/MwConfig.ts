import * as entity from './data/Q64_data.json';
import * as languages from './data/en_lang_data.json';

export default class MWConfig {
	public get( key: string ): string {
		const config: { [ index: string]: string } = {
			wbEntity: JSON.stringify( entity.default ),
			wgUserLanguage: 'de',
		};

		return config[ key ];
	}
}
