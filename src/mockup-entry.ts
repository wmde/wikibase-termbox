import MWConfig from '@/mock-data/MwConfig';
import MwUls from '@/mock-data/MwUls';

declare let mw: any;

mw = {
	config: new MWConfig(),
	uls: new MwUls(),
};
