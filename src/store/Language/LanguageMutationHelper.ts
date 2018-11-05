import LanguageStripper from '@/store/Language/LanguageStripper';
import InvalidLanguageStripperException from '@/store/Language/exceptions/InvalidLanguageStripperException';

export default class LanguageMutationHelper {
	public static isLanguageStipper ( stripper: any ) {
		if ( !( stripper instanceof LanguageStripper ) ) {
			throw new InvalidLanguageStripperException();
		}
	}
}
