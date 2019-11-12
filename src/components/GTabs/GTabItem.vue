<script>
  import { computed, inject } from '@vue/composition-api'

  export default {
    name: 'GTabItem',
    props: {
      item: null
    },
    setup(props, context) {
      const model = inject('model');
      const show = computed(() => (model.value === props.item));
      const _transition = inject('transition');

      return () =>
          <transition name={_transition.value}>
            <div vShow={show.value} className="g-tab-item">
              {context.slots.default()}
            </div>
          </transition>
    }
  }
</script>

<style scoped lang="scss">
	.g-tab-transition {
		&-enter {
			opacity: 0;
			transform: translateX(100%);
		}

		&-enter-to {
			opacity: 1;
		}

		&-enter-active {
			transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
			transition-duration: 0.3s;
		}

		&-leave {
			opacity: 1;
		}

		&-leave-to {
			opacity: 0;
			transform: translateX(-100%);
		}

		&-leave-active {
			transition-timing-function: ease-in;
			transition-duration: 0.3s;
			position: absolute;
		}
	}

	.g-tab-transition-reverse {
		&-enter {
			opacity: 0;
			transform: translateX(-100%);
		}

		&-enter-to {
			opacity: 1;
		}

		&-enter-active {
			transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
			transition-duration: 0.3s;
			position: absolute;
		}

		&-leave {
			opacity: 1;
		}

		&-leave-to {
			opacity: 0;
			transform: translateX(100%);
		}

		&-leave-active {
			transition-timing-function: ease-in;
			transition-duration: 0.3s;
		}
	}
</style>