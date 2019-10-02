import { createLocalVue, mount } from '@vue/test-utils';
import VueCompositionApi from '@vue/composition-api';
import GToolbar from '../GToolbar';

const localVue = createLocalVue()
localVue.use(VueCompositionApi)

describe('Toolbar', () => {
  let mountFunction

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(GToolbar, {
        localVue,
        ...options
      })
    }
  })

  it('should render', () => {
    const wrapper = mountFunction()
    expect(wrapper.html()).toMatchSnapshot()
  })
})