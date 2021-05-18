<script>
  import {getScopeIdRender} from "../../utils/helpers";

  export default {
    name: 'GLoadingScreen',
    setup(props, { emit }) {
      const genLoadingScreen = () => {
        return (
          <transition ref="root" name="transition">
            <div class="vld-overlay is-active">
              <div>ABC</div>
            </div>
          </transition>
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
.vld-shown {
  overflow: hidden;
}

.vld-overlay {
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  align-items: center;
  display: none;
  justify-content: center;
  overflow: hidden;
  z-index: 9999;
}

.vld-overlay.is-active {
  display: flex;
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
