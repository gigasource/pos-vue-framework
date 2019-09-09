import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import GButton from '../src/components/GButton';

storiesOf('Button', module)
.add('with text', () => ({
  components: { GButton },
  template: '<g-button @click="action">Hello Button</g-button>',
  methods: { action: action('clicked') },
}))
.add('with icon', () => ({
  components: { GButton },
  template: '<g-button @click="action"><img src="/config/setting.svg"></g-button>',
  methods: { action: action('clicked') },
}))
.add('with icon & text', () => ({
  components: { GButton },
  template: '<g-button @click="action"><img src="/config/setting.svg"> Setting</g-button>',
  methods: { action: action('clicked') },
}))
.add('raised', () => ({
  components: { GButton },
  template: '<g-button @click="action" raised>Test</g-button>',
  methods: { action: action('clicked') },
}))
.add('flat', () => ({
  components: { GButton },
  template: '<g-button @click="action" flat>Test</g-button>',
  methods: { action: action('clicked') },
}))
.add('outline', () => ({
  components: { GButton },
  template: '<g-button @click="action" outline>Test</g-button>',
  methods: { action: action('clicked') },
}))
.add('disabled', () => ({
  components: { GButton },
  template: '<g-button @click="action" disabled>Test</g-button>',
  methods: { action: action('clicked') },
}))
.add('outline dashed', () => ({
  components: { GButton },
  template: '<g-button @click="action" outline dashed>Test</g-button>',
  methods: { action: action('clicked') },
}))
.add('raised', () => ({
  components: { GButton },
  template: '<g-button @click="action" raised>Test</g-button>',
  methods: { action: action('clicked') },
}))
.add('color (red)', () => ({
  components: { GButton },
  template: '<g-button @click="action" color="red">Test</g-button>',
  methods: { action: action('clicked') },
}))
.add('text color (red)', () => ({
  components: { GButton },
  template: '<g-button @click="action" textColor="red">Test</g-button>',
  methods: { action: action('clicked') },
}))
.add('width (100px)', () => ({
  components: { GButton },
  template: '<g-button @click="action" width="100px">Test</g-button>',
  methods: { action: action('clicked') },
}))
.add('height (100px)', () => ({
  components: { GButton },
  template: '<g-button @click="action" height="100px">Test</g-button>',
  methods: { action: action('clicked') },
}))
.add('icon (24px x 24px)', () => ({
  components: { GButton },
  template: '<g-button @click="action" width="24px" height="24px" icon><img src="/config/expand.svg"></g-button>',
  methods: { action: action('clicked') },
}));