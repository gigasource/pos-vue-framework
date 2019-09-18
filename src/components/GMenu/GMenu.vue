<template>
	<div class="r">
		<slot name="activator" :click="activate"></slot>
		<div v-show="computedValue" :style="styles" v-click-outside:[clickOutsideDirective.args]="clickOutsideDirective.value" ref="content">
			<slot><p>text</p></slot>
		</div>
	</div>
</template>

<script>
  import GLayout from '../GLayout/GLayout';
  import ClickOutside from '../../directives/click-outside/click-outside';

  export default {
    name: 'GMenu',
    components: { GLayout },
    directives: {
      ClickOutside
    },
    data() {
      return {
        absoluteX: 0,
        absoluteY: 0,
        top: 0
      }
    },
    props: {
      positionX: [Number, String],
      positionY: [Number, String],
      offsetX: {
        type: Boolean
      },
      offsetY: {
        type: Boolean,
        default: true
      },
      value: Boolean,
    },
    computed: {
      computedValue: {
        get() {
          return this.value
        },
        set(value) {
          this.$emit('input', value)
        }
      },
      computedTop() {
        let top = 0;
        if (this.offsetY) {
          top += -this.absolutePosition().height;
        }
      },
      styles() {
        return {
          top: this.top + 'px',
          left: '0',
          zIndex: '10',
          position: 'absolute',
          display: 'inline-block',
          'max-width': '80%',
          'overflow-y': 'auto',
          'overflow-x': 'hidden',
          'contain': 'content'
        }
      },
      clickOutsideDirective() {
        return {
          name: 'click-outside',
          value: () => {
            this.computedValue = false
          },
          args: {
            closeConditional: this.closeConditional,
            include: () => [this.$el],
          },
        }
      },
    },
    methods: {
      genActivatorListeners() {
        //todo: open on hover
      },
      closeConditional(e) {
        const target = e.target
        return this.computedValue && !this.$refs.content.contains(target)
      },
      absolutePosition: () => ({
        top: this.positionY || this.absoluteY,
        bottom: this.positionY || this.absoluteY,
        left: this.positionX || this.absoluteX,
        right: this.positionX || this.absoluteX,
        height: 0,
        width: 0,
      }),
      activate(event) {
        const activator = event.target || event.currentTarget;
        this.absoluteX = event.clientX;
        this.absoluteY = event.clientY;
        if (!activator) {
          return;
        }
        const activatorDimensions = this.measure(activator);
        activatorDimensions.offsetLeft = activator.offsetLeft;
        activatorDimensions.offsetTop = 0;
        this.top = activatorDimensions.height;
        this.computedValue = !this.computedValue;
      },
      measure(el) {
        const rect = this.getRoundedBoundedClientRect(el);
        const style = window.getComputedStyle(el);
        rect.left = parseInt(style.marginLeft);
        rect.top = parseInt(style.marginTop);

        return rect
      },
      getRoundedBoundedClientRect(el) {
        const rect = el.getBoundingClientRect();
        return {
          top: Math.round(rect.top),
          left: Math.round(rect.left),
          bottom: Math.round(rect.bottom),
          right: Math.round(rect.right),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
        }
      },
    }
  }
</script>

<style scoped>

</style>