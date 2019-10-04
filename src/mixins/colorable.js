function isCssColor (color) {
    return !!color && !!color.match(/^(#|(rgb|hsl)a?\()/)
}

function setBackgroundColor(color, data) {
    data = data || {}
    if (typeof data.style === 'string') {
        // istanbul ignore next
        console.log('style must be an object', this)
        // istanbul ignore next
        return data
    }
    if (typeof data.class === 'string') {
        // istanbul ignore next
        console.log('class must be an object', this)
        // istanbul ignore next
        return data
    }
    if (isCssColor(color)) {
        data.style = {
            ...data.style,
            'background-color': `${color}`,
            'border-color': `${color}`,
        }
    } else if (color) {
        data.class = {
            ...data.class,
            [color]: true,
        }
    }
    return data
}

function setTextColor (color, data) {
    data = data || {}
    if (typeof data.style === 'string') {
        // istanbul ignore next
        console.log('style must be an object', this)
        // istanbul ignore next
        return data
    }
    if (typeof data.class === 'string') {
        // istanbul ignore next
        console.log('class must be an object', this)
        // istanbul ignore next
        return data
    }
    if (isCssColor(color)) {
        data.style = {
            ...data.style,
            color: `${color}`,
            'caret-color': `${color}`,
        }
    } else if (color) {
        const [colorName, colorModifier] = color.toString().trim().split(' ', 2)
        data.class = {
            ...data.class,
            [colorName + '--text']: true,
        }
        if (colorModifier) {
            data.class['text--' + colorModifier] = true
        }
    }
    return data
}

export default {
    setBackgroundColor,
    setTextColor
}
