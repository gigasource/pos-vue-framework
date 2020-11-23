import { reactive } from 'vue';


export default function routable(props, context) {
  let exact = props.exact;
  let tag;

  let data = reactive({
    isActive: false,
    proxyClass: '',
    route: null
  });

  let click = (e) => {
    context.emit('click', e);
  };

  const scopedData = {
    attrs: {
      tabindex: 'tabindex' in context.attrs ? context.attrs.tabindex : undefined,
    },
    props: {},
    [props.to ? 'nativeOn' : 'on']: {
      ...context.listeners,
      click: click,
    },
    ref: 'link',
  };

  if (typeof props.exact === 'undefined') {
    exact = props.to === '/' ||
      (props.to === Object(props.to) && props.to.path === '/')
  }

  if (props.to) {
    let activeClass = props.activeClass;
    let exactActiveClass = props.exactActiveClass || activeClass;

    if (data.proxyClass) {
      activeClass = `${activeClass} ${data.proxyClass}`.trim();
      exactActiveClass = `${exactActiveClass} ${data.proxyClass}`.trim();
    }

    tag = 'router-link';
    Object.assign(scopedData.props, {
      to: props.to,
      exact,
      activeClass,
      exactActiveClass,
      append: props.append,
      replace: props.replace,
    })
  } else {
    tag = (props.href && 'a') || props.tag || 'div';

    if (tag === 'a' && props.href) {
      scopedData.attrs.href = props.href;
    }
  }

  if (props.target) {
    scopedData.attrs.target = props.target;
  }

  return { tag, scopedData, data }
}
