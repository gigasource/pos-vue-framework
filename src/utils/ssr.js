export const isSSR = typeof(window) === 'undefined'
export const isCSR = !isSSR
export const ssrWarn = target => console.warn(`${target} get used in SSR`)
