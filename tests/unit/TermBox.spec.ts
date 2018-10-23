import { shallowMount } from '@vue/test-utils';
import App from '@/components/TermBox.vue';

describe( 'TermBox.vue', () => {
  it( 'renders item id', () => {
    const wrapper = shallowMount( App );
    expect( wrapper.text() ).toMatch( 'Q64' );
  } );
} );
