import GBtn from '../src/components/GBtn/GBtn';

export default {
  title: 'Button',
};

export const test1 = () => ({
  components: { GBtn },
  template: `<g-btn outlined raised elevation='0' x-large>XLARGE BUTTON</g-btn>`,
});
