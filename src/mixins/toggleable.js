import { watch } from '@vue/composition-api';

export function factory(prop, event) {
    prop = prop || 'value'
    event = event || 'input'

    // mixin function
    return function(props, context) {
        let isActive = props[prop]
        watch(() => props[prop], (val) => {
            isActive = !!val
        })
        watch(() => isActive, (val) => {
            !!val !== props[prop] && context.emit(event, val)
        })

        return {
            isActive
        }
    }
}

export default factory()
