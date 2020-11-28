import { createApp, h } from 'vue'

const Comp1 = {
  props: { modelValue: null },
  setup(props) { return { testProps: props } },
  render() { return <div> nothing </div> }
}

const Comp2 = {
  props: { modelValue: null },
  setup(props) { return { testProps: props } },
  render() { return <div> { this.modelValue } </div> }
}

const makeApp = () => {
  document.getElementsByTagName('html')[0].innerHTML = ''
  const el = document.createElement('div')
  el.id = 'app'
  document.body.appendChild(el)
  return el
}

const mount = (Comp, attrs) => {
  const app = makeApp()
  return createApp({
    components: [ Comp ],
    render() { return <Comp {...attrs} ref="test"/> },
    mounted() { this.tc = this.$refs.test }
  }).mount(app);
}

describe('TestComponent', () => {
  it('should match', () => {
    expect(mount(Comp1, { modelValue: [5] }).tc.testProps.modelValue).toStrictEqual([5])
  })

  it('should match', () => {
    expect(mount(Comp2, { modelValue: [5] }).tc.testProps.modelValue).toStrictEqual([5])
  })
})
