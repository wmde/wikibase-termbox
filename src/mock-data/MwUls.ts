import * as entity from './data/Q64_data.json';

export default class MWConfig {
	public getBrowserLanguage(): string {
		return 'de';
	}
	public getFrequentLanguageList(): string[] {
		return [ 'en', 'de', 'fr', 'bar', 'nds', 'nl', 'it', 'es', 'ru', 'vmf' ];
	}
}
