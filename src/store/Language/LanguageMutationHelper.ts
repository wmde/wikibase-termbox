import LanguageStripper from '@/store/Language/LanguageStripper';
import InvalidLanguageStripperException from '@/store/Language/exceptions/InvalidLanguageStripperException';

export default class LanguageMutationHelper {
	public static isLanguageStipper ( Stripper: any ) {
		if ( !( Stripper instanceof LanguageStripper ) ) {
			throw new InvalidLanguageStripperException();
		}
	}
}
