import Vuex from 'vuex';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import TermBox from '@/components/TermBox.vue';
import store from '@/store/index';
import {
	NS_ENTITY,
	NS_USER,
	NS_LANGUAGE,
} from '@/store/namespaces';
import { ENTITY_INIT } from '@/store/entity/mutationTypes';
import { LANGUAGE_INIT } from '@/store/user/mutationTypes';
import {
	LANGUAGE_TRANSLATION_UPDATE,
	LANGUAGE_UPDATE,
} from '@/store/language/mutationTypes';
import FingerprintableEntity from '@/datamodel/FingerprintableEntity';
import LanguageTranslations from '@/datamodel/LanguageTranslations';
import LanguageCollection from '@/datamodel/LanguageCollection';
import Language from '@/datamodel/Language';

const localVue = createLocalVue();
const langDe = 'Deutsch';
const labelDe  = 'All I know';
const descriptionDe = 'Jakob mag potatoes.';
const aliasesDe = [ 'Antwort auf alles', 'Ihr kennt ja nicht einmal die Frage!' ];
localVue.use( Vuex );

store.commit(
`${NS_ENTITY}/${ENTITY_INIT}`,
	new FingerprintableEntity(
		'Q42',
		{
			de: {
				language: 'de',
				value: labelDe,
			},
		},
		{
			de: {
				language: 'de',
				value: descriptionDe,
			},
		},
		{
			de: [
				{
					language: 'de',
					value: aliasesDe[0],
				},
				{
					language: 'de',
					value: aliasesDe[1],
				},
			],
		},
	),
);

store.commit(
	`${NS_LANGUAGE }/${LANGUAGE_UPDATE}`,
	{
		de: {
			code: 'de',
			directionality: 'ltr',
		},
		ar: {
			code: 'ar',
			directionality: 'rtl',
		},
	} as LanguageCollection,
);

store.commit(
	`${NS_LANGUAGE }/${LANGUAGE_TRANSLATION_UPDATE}`,
	{
		de: {
			de: langDe,
			en: 'Englisch',
		},
		en: {
			de: 'German',
			en: 'English',
		},
	} as LanguageTranslations,
);

const showContentForDe = { code: 'de', directionality: 'ltr' } as Language;
// language that causes fallbacks as entity does not have data for it
const showContentForAr = { code: 'en', directionality: 'rtl' } as Language;

describe( 'TermBox.vue', () => {
	it( 'renders the language label', () => {
		store.commit( `${NS_USER}/${LANGUAGE_INIT}`, 'de' );

		const wrapper = shallowMount( TermBox, { store, localVue, propsData: { language: showContentForDe } } );
		expect( wrapper.find( '.wikibase-termbox__language' ).text() ).toBe( langDe );
	} );

	it( 'renders random ???? in case of missing translation of language to user language', () => {
		store.commit( `${NS_USER}/${LANGUAGE_INIT}`, 'zh' );

		const wrapper = shallowMount( TermBox, { store, localVue, propsData: { language: showContentForDe } } );
		// this not part of the component
		expect( wrapper.find( '.wikibase-termbox__language' ).text() ).toBe( '????' );
	} );

	it( 'marks termbox as primaryLanguage if language shown matches user language', () => {
		store.commit( `${NS_USER}/${LANGUAGE_INIT}`, 'de' );

		const wrapper = shallowMount( TermBox, { store, localVue, propsData: { language: showContentForDe } } );
		expect( wrapper.findAll( '.wikibase-termbox--primaryLanguage' ).length ).toBe( 1 );
	} );

	it( 'renders the entity label', () => {
		const wrapper = shallowMount( TermBox, { store, localVue, propsData: { language: showContentForDe } } );
		expect( wrapper.find( '.wikibase-termbox__label' ).text() ).toBe( labelDe );
	} );

	it( 'renders ??? in case entity does not have data in language for labels', () => {
		const wrapper = shallowMount( TermBox, { store, localVue, propsData: { language: showContentForAr } } );
		expect( wrapper.find( '.wikibase-termbox__label' ).text() ).toBe( '???' );
	} );

	it( 'renders the entity description', () => {
		const wrapper = shallowMount( TermBox, { store, localVue, propsData: { language: showContentForDe } } );
		expect( wrapper.find( '.wikibase-termbox__description' ).text() ).toBe( descriptionDe );
	} );

	it( 'renders ?? in case entity does not have data in language for descriptions', () => {
		const wrapper = shallowMount( TermBox, { store, localVue, propsData: { language: showContentForAr } } );
		expect( wrapper.find( '.wikibase-termbox__description' ).text() ).toBe( '??' );
	} );

	it( 'renders the entity aliases', () => {
		const wrapper = shallowMount( TermBox, { store, localVue, propsData: { language: showContentForDe } } );
		const aliases = wrapper.findAll( '.wikibase-termbox__alias' );
		expect( aliases.at( 0 ).text() ).toStrictEqual( aliasesDe[0] );
		expect( aliases.at( 1 ).text() ).toStrictEqual( aliasesDe[1] );
	} );

	it( 'renders ? in case entity does not have data in language for aliases', () => {
		const wrapper = shallowMount( TermBox, { store, localVue, propsData: { language: showContentForAr } } );
		expect( wrapper.find( '.wikibase-termbox__aliases--placeholder' ).text() ).toBe( '?' );
	} );

	it( 'marks-up the entity data with the language directionality', () => {
		const wrapper = shallowMount( TermBox, { store, localVue, propsData: { language: showContentForAr } } );
		expect( wrapper.find( '.wikibase-termbox__term' ).attributes( 'dir' ) )
			.toBe( showContentForAr.directionality );
	} );

	it( 'marks-up the entity data with the language code', () => {
		const wrapper = shallowMount( TermBox, { store, localVue, propsData: { language: showContentForAr } } );
		expect( wrapper.find( '.wikibase-termbox__term' ).attributes( 'lang' ) )
			.toBe( showContentForAr.code );
	} );
} );
