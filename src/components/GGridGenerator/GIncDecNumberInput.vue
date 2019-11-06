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
        default: 0
      },
      max: {
        type: [Number, String],
        default: Number.MAX_VALUE
      },
      min: {
        type: [Number, String],
        default: 0
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
              <span class='g-inc-dec-number__dec' vOn:click={decrease}>
                <g-icon small color="#718792">remove</g-icon>
              </span>
              <input type="text" value={props.value}
                  vOn:keypress= {e => {
                    if (enterPressed(e))
                      context.emit('input', _.clamp(parseInt(e.target.value), props.min, props.max))
                  }}/>
              <span class='g-inc-dec-number__inc' vOn:click={increase}>
                <g-icon small color="#718792">add</g-icon>
              </span>
            </div>
        )
      }
    }
  }
</script>
<style scoped lang="scss">
  .g-inc-dec-number {
    border: 1px solid #0003;
    border-radius: 3px;
    display: inline-flex;
    justify-content: stretch;


    &>span {
      width: 20px;
      background-color: #c1d5e0;
      text-align: center;
      height: 20px;
      line-height: 16px;

      &:hover {
        background-color: #e2f1f8;
        cursor: pointer;
      }
    }

    &> input {
      padding: 0 5px;
      width: 40px;
      height: 20px;
    }

  }
</style>
