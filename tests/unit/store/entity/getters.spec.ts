import { getters } from '@/store/entity/getters';
import Entity from '@/store/entity/Entity';

function newMinimalStore( fields: any ): Entity {
	return {
		id: 'Q1',
		type: 'item',
		...fields, // overrides id and type, if present
	} as Entity;
}

describe( 'entity/Getters', () => {

	it( 'has an id', () => {
		expect( getters.id( newMinimalStore( { id: 'Q123' } ), null, null, null ) )
			.toBe( 'Q123' );
	} );

	it( 'has a type', () => {
		expect( getters.type( newMinimalStore( { type: 'property' } ), null, null, null ) )
			.toBe( 'property' );
	} );

	it( 'has labels', () => {
		const labels = { en: 'potato' };

		expect( getters.labels(
			newMinimalStore( { labels } ), null, null, null,
		) ).toBe( labels );
	} );

	it( 'has descriptions', () => {
		const descriptions = { en: 'root vegetable' };

		expect( getters.descriptions(
			newMinimalStore( { descriptions } ), null, null, null,
		) ).toBe( descriptions );
	} );

	it( 'has aliases', () => {
		const aliases = { en: ['p0tato', 'potat0'] };
		expect( getters.aliases(
			newMinimalStore( { aliases } ), null, null, null,
		) ).toBe( aliases );
	} );

	describe( 'getLabelByLanguage', () => {

		it( 'returns the label for the given language', () => {
			const labels = {
				en: 'potato',
				de: 'Kartoffel',
			};

			expect( getters.getLabelByLanguage(
				newMinimalStore( { labels } ), null, null, null,
			)( 'de' ) ).toBe( labels.de );
		} );

		it( 'returns an empty string if the language does not exist', () => {
			const labels = {
				en: 'potato',
			};
			expect( getters.getLabelByLanguage(
				newMinimalStore( { labels } ), null, null, null,
			)( 'de' ) ).toBe( '' );
		} );

	} );

	describe( 'getDescriptionByLanguage', () => {

		it( 'returns the description for the given language', () => {
			const descriptions = {
				en: 'root vegetable',
				de: 'Nutzpflanze aus der Familie der Nachtschattengewächse',
			};

			expect( getters.getDescriptionByLanguage(
				newMinimalStore( { descriptions } ), null, null, null,
			)( 'de' ) ).toBe( descriptions.de );
		} );

		it( 'returns an empty string if the language does not exist', () => {
			const descriptions = {
				en: 'root vegetable',
			};
			expect( getters.getDescriptionByLanguage(
				newMinimalStore( { descriptions } ), null, null, null,
			)( 'de' ) ).toBe( '' );
		} );

	} );

	describe( 'getAliasesByLanguage', () => {

		it( 'returns the label for the given language', () => {
			const aliases = {
				en: [],
				de: ['Erdapfel', 'Erdbirne', 'Potaten'],
			};

			expect( getters.getAliasesByLanguage(
				newMinimalStore( { aliases } ), null, null, null,
			)( 'de' ) ).toBe( aliases.de );
		} );

		it( 'returns an empty array if no aliases for the given language exist', () => {
			const aliases = {
				en: ['Solanum tuberosum'],
			};
			expect( getters.getAliasesByLanguage(
				newMinimalStore( { aliases } ), null, null, null,
			)( 'de' ) ).toEqual( [] );
		} );

	} );

} );
