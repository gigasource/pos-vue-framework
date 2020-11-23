// Created at 2019-10-28 14:07 by Thinh Vu
import { createLocalVue } from '@vue/test-utils'
import plugin from 'vue'
import {getPropsNameAZPrimitiveFirst} from '../util'

describe('/GTreeFactoryTest', () => {
  createLocalVue().use(plugin)

  const itemChildren = (node, isRoot) => {
    if (Array.isArray(node)) {
      return node
    } else if (typeof node === 'object') {
      const firstPropValue = node[Object.keys(node)[0]]
      const converter = node => Object.keys(node).map(k => ({ [k]: node[k] }))
      if (isRoot) {
        return converter(node)
      } else if (Array.isArray(firstPropValue)) {
        return firstPropValue;
      } else {
        return converter(firstPropValue);
      }
    } else {
      // primitive
      return node;
    }
  }

  let data = {
    a: 1,
    b: [2, 3],
    c: {
      d: 4,
      e: 5
    }
  }

  it('array', () => {
    expect(itemChildren([])).toEqual([])
    expect(itemChildren([1, 2])).toEqual([1, 2])
    expect(itemChildren([{a:1, b:2}, {c:2, d:4}])).toEqual([{a:1, b:2}, {c:2, d:4}])
  })

  it('object', () => {

    let d = data;
    expect(itemChildren({ a: 1, b: [2, 3] }, true)).toEqual([{ a: 1 }, { b: [2, 3] }])
    expect(itemChildren({ d: 4, e: 5 }, false)).toEqual([])

    expect(itemChildren({ a: 1, b: [2] }, true)).toEqual([ {a:1}, {b:[2]}])
    expect(itemChildren({ a: 1, b: [2] }, false)).toEqual([])

    expect(itemChildren({ a: [1], b: 2 }, true)).toEqual([{a: [1]}, {b: 2}])
    expect(itemChildren({ a: [1], b: 2 }, false)).toEqual([1])
    expect(itemChildren({ a: [1, 2], b: 2 }, false)).toEqual([1, 2])
  })

  it('primitive', () => {
    expect(itemChildren(5)).toBe(5)
    expect(itemChildren('10')).toBe('10')
  })
})

describe('getPropsNameAZPrimitiveFirst', () => {
  it('Should work as expected', () => {
    const testCases = [
      {input: { a1: 'hello', b1: false }, output: [ 'b1', 'a1' ]},
      {input: { a2: 'hello', b2: 'abc' }, output: [ 'a2', 'b2' ]},
      {input: { a3: 'hello', b3: 5 }, output: [ 'b3', 'a3' ]},
      {input: { a: true, b: 5 }, output: [ 'a', 'b' ]},
      {input: { a: () => {}, b: 5 }, output: [ 'b', 'a' ]},
      {input: { a: () => {}, b: {} }, output: [ 'b', 'a' ]},
      {input: { a: [], b: {} }, output: [ 'a', 'b' ]},
    ]

    for(let i=0; i<testCases.length; ++i) {
      expect(getPropsNameAZPrimitiveFirst(testCases[i].input)).toEqual(testCases[i].output)
    }
  })
})
