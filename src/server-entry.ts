import buildApp from '@/common/buildApp';
import { factory } from './common/TermboxFactory';
import MwBotSpecialPageEntityRepo from './server/data-access/MwBotSpecialPageEntityRepo';
import EntityInitializer from './common/EntityInitializer';
import BundleBoundaryPassingException, { ErrorReason } from '@/server/exceptions/BundleBoundaryPassingException';
import EntityNotFound from '@/common/data-access/error/EntityNotFound';
import MwBotWikibaseContentLanguagesRepo from './server/data-access/MwBotWikibaseContentLanguagesRepo';
import TranslationLanguageNotFound from './common/data-access/error/TranslationLanguageNotFound';
import ContentLanguagesLanguageTranslationRepo from './server/data-access/ContentLanguagesLanguageTranslationRepo';
import ContentLanguagesLanguageRepo from './server/data-access/ContentLanguagesLanguageRepo';
import MwBotWikibaseMessagesRepo from './server/data-access/MwBotWikibaseMessagesRepo';
import WaitingForLanguageWikibaseContentLanguagesRepo
	from './server/data-access/WaitingForLanguageWikibaseContentLanguagesRepo';
import BundleRendererContext from './server/bundle-renderer/BundleRendererContext';
import { MessageKeys } from '@/common/MessageKeys';

export default ( context: BundleRendererContext ) => {
	const apiBot = context.services.mediawikiBot;

	const languageRepo = new WaitingForLanguageWikibaseContentLanguagesRepo(
		new MwBotWikibaseContentLanguagesRepo(
			apiBot,
		),
	);

	factory.setLanguageTranslationRepository(
		new ContentLanguagesLanguageTranslationRepo( languageRepo ),
	);
	factory.setLanguageRepository(
		new ContentLanguagesLanguageRepo( languageRepo ),
	);
	factory.setMessagesRepository(
		new MwBotWikibaseMessagesRepo(
			apiBot ,
			Object.values( MessageKeys ),
		),
	);
	factory.setEntityRepository(
		new MwBotSpecialPageEntityRepo(
			apiBot,
			new EntityInitializer(),
		),
	);
	factory.setEntityEditabilityResolver( {
		isEditable() {
			// hiding elements used for editing is done by the consumer of the SSR service
			return Promise.resolve( true );
		},
	} );

	return buildApp( context.request ).catch( ( err: any ) => {
		if ( err instanceof EntityNotFound ) {
			throw new BundleBoundaryPassingException( ErrorReason.EntityNotFound );
		} else if ( err instanceof TranslationLanguageNotFound ) {
			throw new BundleBoundaryPassingException( ErrorReason.LanguageNotFound );
		}

		throw err;
	} );
};
