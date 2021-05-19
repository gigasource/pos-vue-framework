<script>
  import { computed } from 'vue'
  import {getScopeIdRender} from '../../utils/helpers'
  import Spinner from './spinner'

  export default {
    name: 'GLoadingScreen',
    components: { Spinner },
    emit: ['update:modelValue'],
    props: {
      modelValue: {
        type: Boolean,
        default: false
      },
      backgroundColor: String,
      opacity: Number,
      blur: {
        type: String,
        default: '2px'
      },
      width: Number,
      height: Number
    },
    setup(props, context) {
      const bgStyle = computed(() => {
        return {
          background: props.backgroundColor,
          opacity: props.opacity,
          backdropFilter: `blur(${props.blur})`
        }
      })

      const genLoadingScreen = () => {
        return (
          <div class="g-loading-screen">
            {props.modelValue ?
              <div class="vld-overlay is-active">
                <div class="vld-background"
                     style={bgStyle.value}
                />
                <div class="vld-icon">
                  <spinner width={props.width} height={props.height}/>
                  {context.slots.default()}
                </div>
              </div>
              : null
            }
          </div>
        )
      }

      return {
        genLoadingScreen
      }
    },
    render() {
      const scopeIdRender = getScopeIdRender()
      return scopeIdRender(this.genLoadingScreen)()
    }
  }
</script>

<style scoped lang="scss">
.g-loading-screen {
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.6);
  z-index: 9999;
}



.vld-shown {
  overflow: hidden;
}

.vld-overlay {
  width: 100vw;
  height: 100vh;
  float: left;
  align-items: center;
  display: none;
  justify-content: center;
  overflow: hidden;
  z-index: 9999;
}

.vld-overlay.is-active {
  display: flex;
  text-align: center;
}

.vld-overlay.is-full-page {
  z-index: 9999;
  position: fixed;
}

.vld-overlay .vld-background {
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  background: #fff;
  opacity: 0.5;
}

.vld-overlay .vld-icon, .vld-parent {
  position: relative;
}
</style>
