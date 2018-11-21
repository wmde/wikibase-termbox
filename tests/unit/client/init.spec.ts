import ImmediatelyInvokingEntityLoadedHookHandler from '@/mock-data/ImmediatelyInvokingEntityLoadedHookHandler';
import init from '@/client/init';
import TermboxRequest from '@/common/TermboxRequest';
import MwWindow from '../../../src/client/MwWindow';

function mockMwEnv( language: string, entity: any ) {
	( window as MwWindow ).mw = {
		config: { get( key ) {
			switch ( key ) {
				case 'wgUserLanguage':
					return language;
				case 'wbEntityId':
					return entity.id;
				default:
					return null;
			}
		} },
		hook: () => new ImmediatelyInvokingEntityLoadedHookHandler( entity ),
	};
}

describe( 'client/init', () => {

	it( 'returns a Promise with a TermboxRequest', () => {
		mockMwEnv( 'de', { id: 'Q1', labels: {}, descriptions: {}, aliases: {} } );
		const termboxRequestPromise = init();

		expect( termboxRequestPromise ).toBeInstanceOf( Promise );
		expect( termboxRequestPromise ).resolves.toBeInstanceOf( TermboxRequest );
	} );

	it( 'loads a TermboxRequest from the mw environment', async () => {
		const entity = {
			id: 'Q666',
			labels: { en: { language: 'en', value: 'duck' } },
			descriptions: { en: { language: 'en', value: 'aquatic bird' } },
			aliases: { en: [{ language: 'en', value: 'floaty bird' }] },
		};

		mockMwEnv( 'en', entity );

		return init().then( ( request ) => {
			expect( request.language ).toBe( 'en' );
			expect( request.entityId ).toBe( entity.id );
		} );
	} );

} );
