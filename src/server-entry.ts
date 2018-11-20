import buildApp from '@/common/buildApp';
import { instance } from './common/TermboxFactory';
import MwBotLanguageRepo from './server/data-access/MwBotLanguageRepo';
import mwbot from "mwbot";

instance.setLanguageRepository(
	new MwBotLanguageRepo(
		new mwbot( {
			apiUrl: 'http://default.web.mw.localhost/mediawiki/api.php',
		} ),
	)
);

export default buildApp;
