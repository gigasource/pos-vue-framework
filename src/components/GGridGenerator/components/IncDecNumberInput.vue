<script>
  import _ from 'lodash'
  import GIcon from '../../GIcon/GIcon';
  import { enterPressed } from '../../../utils/keyboardHelper';
  import { getScopeIdRender } from '../../../utils/helpers';

  export default {
    name: 'GIncDecNumberInput',
    components: { GIcon },
    emits: ['update:modelValue'],
    props: {
      modelValue: {
        type: Number,
        default: Number.MIN_SAFE_INTEGER
      },
      max: {
        type: [Number, String],
        default: Number.MAX_SAFE_INTEGER
      },
      min: {
        type: [Number, String],
        default: Number.MIN_SAFE_INTEGER
      }
    },
    events: ['update:modelValue'],
    setup(props, context) {

      function increase() {
        let val = props.modelValue + 1
        if (val > props.max)
          val = props.max
        context.emit('update:modelValue', val)
      }

      function decrease() {
        let val = props.modelValue - 1
        if (val < props.min)
          val = props.min
        context.emit('update:modelValue', val)
      }

      function renderFn() {
        return (
            <div class='g-inc-dec-number'>
              <span class={{ disabled: props.modelValue === props.min }} onClick={decrease}>
                <g-icon small>remove</g-icon>
              </span>
              <input type="text" value={props.modelValue}
                  onKeypress= {e => {
                    if (enterPressed(e))
                      context.emit('update:modelValue', _.clamp(parseInt(e.target.value), props.min, props.max))
                  }}/>
              <span class={{ disabled: props.modelValue === props.max }} onClick={increase}>
                <g-icon small>add</g-icon>
              </span>
            </div>
        )
      }

      return getScopeIdRender()(renderFn)
    }
  }
</script>
<style scoped lang="scss">
  .g-inc-dec-number {
    border: 1px solid #757575;
    display: flex;
    justify-content: stretch;

    &>span {
      width: 20px;
      background-color: #bdbdbd;
      color: #616161;
      text-align: center;
      height: 20px;
      line-height: 16px;

      &:hover {
        background-color: #757575;
        color: #fff;
        cursor: pointer;
      }
    }

    &>input {
      padding: 0 5px;
      min-width: 0;
      height: 20px;
      flex: 1;
    }
  }
</style>
