<script>
  import _ from 'lodash'
  import GIcon from '../GIcon/GIcon';
  import { enterPressed } from '../../utils/keyboardHelper';

  export default {
    name: 'GIncDecNumberInput',
    components: { GIcon },
    props: {
      value: {
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
    setup(props, context) {

      function increase() {
        let val = props.value + 1
        if (val > props.max)
          val = props.max
        context.emit('input', val)
      }

      function decrease() {
        let val = props.value - 1
        if (val < props.min)
          val = props.min
        context.emit('input', val)
      }

      return function() {
        return (
            <div class='g-inc-dec-number'>
              <span class={{disabled: props.value === props.min}} vOn:click={decrease}>
                <g-icon small>remove</g-icon>
              </span>
              <input type="text" value={props.value}
                  vOn:keypress= {e => {
                    if (enterPressed(e))
                      context.emit('input', _.clamp(parseInt(e.target.value), props.min, props.max))
                  }}/>
              <span class={{ disabled:props.value === props.max }} vOn:click={increase}>
                <g-icon small>add</g-icon>
              </span>
            </div>
        )
      }
    }
  }
</script>
<style scoped lang="scss">
  .g-inc-dec-number {
    border: 1px solid #757575;
    display: inline-flex;
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
      width: 40px;
      height: 20px;
    }
  }
</style>
