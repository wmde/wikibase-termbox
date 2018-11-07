import Dictionary from '@/common/interfaces/Dictionary';
import InvalidLanguageLabelInputException from '@/store/LanguageLabels/exceptions/InvalidLanguageLabelInputException';

export default class LanguageLabelsMutationHelper {
	public static isDictionary( dict: Dictionary<Dictionary<string>> ): void {
		if ( typeof dict !== 'object' || Array.isArray( dict ) ) {
			throw new InvalidLanguageLabelInputException(
			'The given value is not dictionary',
			);
		}

		const keys = Object.keys( dict );
		keys.forEach( ( value: any ) => {
			if ( typeof dict[ value ] !== 'object' ||
				Array.isArray( dict[ value ] ) ) {
				throw new InvalidLanguageLabelInputException(
					'The given dictionary contains invalid value',
				);
			}
		} );
	}
}
