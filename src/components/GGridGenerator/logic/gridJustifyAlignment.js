// References: https://css-tricks.com/snippets/css/complete-guide-grid/
export const _gridItemOptions = ['', 'start', 'end', 'center', 'stretch']
export const _gridContentOptions = ['', 'start', 'end', 'center', 'stretch', 'space-around', 'space-between', 'space-evenly']

export const getAlignSelf = grid => grid['align-self']
export const getAlignItems = grid => grid['align-items']
export const getAlignContent = grid => grid['align-content']
export const getJustifySelf = grid => grid['justify-self']
export const getJustifyItems = grid => grid['justify-items']
export const getJustifyContent = grid => grid['justify-content']
// change align/justify
export const setAlignSelf = (grid, value) => grid['align-self'] = value
export const setAlignItems = (grid, value) => grid['align-items'] = value
export const setAlignContent = (grid, value) => grid['align-content'] = value
export const setJustifySelf = (grid, value) => grid['justify-self'] = value;
export const setJustifyItems = (grid, value) => grid['justify-items'] = value;
export const setJustifyContent = (grid, value) => grid['justify-content'] = value
// check current align/justify
export const isActiveAlignSelf = (grid, value) => grid['align-self'] === value
export const isActiveAlignItems = (grid, value) => grid['align-items'] === value
export const isActiveAlignContent = (grid, value) => grid['align-content'] === value
export const isActiveJustifySelf = (grid, value)  => grid['justify-self'] === value
export const isActiveJustifyItems = (grid, value) => grid['justify-items'] === value
export const isActiveJustifyContent = (grid, value) => grid['justify-content'] === value
