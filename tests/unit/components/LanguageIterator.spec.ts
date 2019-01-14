import { shallowMount } from '@vue/test-utils';
import LanguageIterator from '@/components/LanguageIterator.vue';

describe( 'LanguageIterator.vue', () => {
	it( 'renders the component a the given modfier', () => {
		const modifier = 'toefften';
		const wrapper = shallowMount(
			LanguageIterator,
			{
				propsData: {
					modifier,
					languages: [],
					showButtonLabel: '',
				},
			},
		);
		expect( wrapper.classes( modifier ) ).toBeTruthy();
	} );

	it( 'renders the "show" link', () => {
		const modifier = 'toefften';
		const wrapper = shallowMount(
			LanguageIterator,
			{
				propsData: {
					modifier,
					languages: [],
					showButtonLabel: 'test',
					show: 'aref',
				},
			},
		);
		expect( wrapper.findAll( '.wikibase-termbox__switch' ).length === 1 ).toBeTruthy();
	} );

	it( 'renders the showButtonLabel of the "show" link', () => {
		const modifier = 'toefften';
		const showButtonLabel = 'test';
		const wrapper = shallowMount(
			LanguageIterator,
			{
				propsData: {
					modifier,
					languages: [],
					showButtonLabel,
					show: 'aref',
				},
			},
		);
		expect( wrapper.find( '.wikibase-termbox__switch>a' ).text() ).toBe( showButtonLabel );
	} );

	it( 'renders the reference of the "show" link', () => {
		const modifier = 'toefften';
		const show = 'test';
		const wrapper = shallowMount(
			LanguageIterator,
			{
				propsData: {
					modifier,
					languages: [],
					showButtonLabel: '',
					show,
				},
			},
		);
		expect( wrapper.find( '.wikibase-termbox__switch>a' ).attributes( 'href' ) ).toBe( show );
	} );

	it( 'does not render the "show" link if no reference is given', () => {
		const modifier = 'toefften';
		const wrapper = shallowMount(
			LanguageIterator,
			{
				propsData: {
					modifier,
					languages: [ 'de', 'en' ],
					showButtonLabel: 'test',
				},
			},
		);
		expect( wrapper.findAll( '.wikibase-termbox__switch' ).length === 0 ).toBeTruthy();
	} );

	it( 'renders the given languages if the expand flag is true', () => {
		const modifier = 'toefften';
		const languages = [ 'de', 'en' ];
		const wrapper = shallowMount(
			LanguageIterator,
			{
				propsData: {
					modifier,
					languages,
					isExpanded: true,
					showButtonLabel: '',
				},
			},
		);
		expect(
			wrapper.findAll( '.wikibase-termbox__languages' ).length === 2,
		).toBeTruthy();
	} );

	it( 'does not render given languages if isExpanded flag is false', () => {
		const modifier = 'toefften';
		const languages = [ 'de', 'en' ];
		const wrapper = shallowMount(
			LanguageIterator,
			{
				propsData: {
					modifier,
					languages,
					isExpanded: false,
					showButtonLabel: '',
				},
			},
		);
		expect(
			wrapper.findAll( '.wikibase-termbox__languages' ).length === 0,
		).toBeTruthy();
	} );

	it( 'changes the value of isExpanded flag if the button was clicked', () => {
		const modifier = 'toefften';
		const languages = [ 'de', 'en' ];
		const wrapper = shallowMount(
			LanguageIterator,
			{
				propsData: {
					modifier,
					languages,
					isExpanded: false,
					showButtonLabel: 'test',
					show: 'test',
				},
			},
		);
		wrapper.find( '.wikibase-termbox__switch>a' ).trigger( 'click' );
		expect(
			wrapper.findAll( '.wikibase-termbox__languages' ).length === 2,
		).toBeTruthy();
	} );
} );
