import isDateAllowed from '../util/isDateAllowed'
import { computed, createElement as h, reactive, watch } from '@vue/composition-api';
import { setBackgroundColor, setTextColor } from '../../../mixins/colorable'

// TODO: Themeable mixins

export default (props, context) => {
  const state = reactive({ isReversing: false })

  // computed
  const computedTransition = computed(()=>{
    return (state.isReversing ===  true /*!this.$vuetify.rtl*/) ? 'tab-reverse-transition' : 'tab-transition' // TODO: $vuetify??
  })

  const displayedMonth = computed(() => {
    return Number(props.tableDate.split('-')[1]) - 1
  })
  const displayedYear = computed(() => {
    return Number(props.tableDate.split('-')[0])
  })

  //
  watch(() => props.tableDate, (oldVal, newVal) => {
    state.isReversing = newVal < oldVal
  })

  // methods
  function genButtonClasses(isAllowed, isFloating, isSelected, isCurrent) {
    return {
      'g-size--default': !isFloating,
      'g-btn--active': isSelected,
      'g-btn--flat': !isAllowed || props.disabled,
      'g-btn--text': isSelected === isCurrent,
      'g-btn--rounded': isFloating,
      'g-btn--disabled': !isAllowed || props.disabled,
      'g-btn--outlined': isCurrent && !isSelected,
      //...props.themeClasses,
    }
  }

  function genButtonEvents (value, isAllowed, mouseEventType) {
    if (props.disabled) return undefined
    return {
      click: () => {
        isAllowed && !props.readonly && context.emit('input', value)
        context.emit(`click:${mouseEventType}`, value)
      },
      dblclick: () => context.emit(`dblclick:${mouseEventType}`, value),
    }
  }

  function genButton (value, isFloating, mouseEventType, formatter) {
    const isAllowed = isDateAllowed(value, props.min, props.max, props.allowedDates)
    const isSelected = value === props.value || (Array.isArray(props.value) && props.value.indexOf(value) !== -1)
    const isCurrent = value === props.current
    const setColor = isSelected ? setBackgroundColor : setTextColor
    const color = (isSelected || isCurrent) && (props.color || '')

    return h('button', setColor(color, {
      staticClass: 'g-btn',
      class: genButtonClasses(isAllowed, isFloating, isSelected, isCurrent),
      attrs: {
        type: 'button',
      },
      domProps: {
        disabled: props.disabled || !isAllowed,
      },
      on: genButtonEvents(value, isAllowed, mouseEventType),
    }), [
      h('div', {
        staticClass: 'g-btn__content',
      }, [formatter(value)]),
      genEvents(value),
    ])
  }

  function getEventColors (date) {
    const arrayize = (v) => Array.isArray(v) ? v : [v]
    let eventData
    let eventColors = []

    if (Array.isArray(props.events)) {
      eventData = props.events.includes(date)
    } else if (props.events instanceof Function) {
      eventData = props.events(date) || false
    } else if (props.events) {
      eventData = props.events[date] || false
    } else {
      eventData = false
    }

    if (!eventData) {
      return []
    } else if (eventData !== true) {
      eventColors = arrayize(eventData)
    } else if (typeof props.eventColor === 'string') {
      eventColors = [props.eventColor]
    } else if (typeof props.eventColor === 'function') {
      eventColors = arrayize(props.eventColor(date))
    } else if (Array.isArray(props.eventColor)) {
      eventColors = props.eventColor
    } else {
      eventColors = arrayize(props.eventColor[date])
    }

    return eventColors.filter(v => v)
  }

  function genEvents(date) {
    const eventColors = getEventColors(date)
    return eventColors.length ? h('div', {
      staticClass: 'g-date-picker-table__events',
    }, eventColors.map(color => h('div', setBackgroundColor(color, {})))) : null
  }

  function wheel(e /*: WheelEvent8*/, calculateTableDate /*: (v: number) => string*/) {
    e.preventDefault()
    context.emit('update:table-date', calculateTableDate(e.deltaY))
  }

  function touch(value /*: number*/, calculateTableDate /*: (v: number) => string*/) {
    context.emit('update:table-date', calculateTableDate(value))
  }

  function genTable (staticClass /*: string*/, children/*: VNodeChildren*/, calculateTableDate/*: (v: number) => string*/) {
    const transition = h('transition', {
      props: { name: computedTransition.value },
    }, [h('table', { key: props.tableDate }, children)])

    const touchDirective = {
      name: 'touch',
      value: {
        left: (e/*: TouchWrapper*/) => (e.offsetX < -15) && touch(1, calculateTableDate),
        right: (e/*: TouchWrapper*/) => (e.offsetX > 15) && touch(-1, calculateTableDate),
      },
    }

    return h('div', {
      staticClass,
      class: {
        'v-date-picker-table--disabled': props.disabled,
        // ...this.themeClasses,
      },
      on: (!props.disabled && props.scrollable) ? {
        wheel: (e /*: WheelEvent*/) => wheel(e, calculateTableDate),
      } : undefined,
      // TODO: directives: [touchDirective],
    }, [transition])
  }

  return {
    displayedMonth,
    displayedYear,
    genButton,
    genTable
  }
}
