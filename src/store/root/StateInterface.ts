import EntityProperties from '@/store/Entity/EntityProperties';
import LanguageProperties from '@/store/Language/LanguageProperties';

export default interface StateInterface {
	Entity?: EntityProperties;
	Language?: LanguageProperties;
}
