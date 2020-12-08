<script>
  import { getCurrentInstance } from 'vue';
  const PassThrough = {
    inheritAttrs: false,
    render() {
      const instance = getCurrentInstance();
      const children = instance.vnode.children;
      return children && typeof(children.default) === 'function' && children.default()
    }
  }
  export default PassThrough
</script>
