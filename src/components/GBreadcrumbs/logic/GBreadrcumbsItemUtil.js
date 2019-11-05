import { computed } from '@vue/composition-api';

export default (props, context) => {
  const breadcrumbsItemClasses = computed(() => {
    return {
      'g-breadcrumbs-item': true,
      [props.activeClass]: props.disabled,
    }
  });

  const breadcrumbsItemStyles = computed(() => {

  });

  const breadcrumbClasses = computed(() => {
    return {
      'g-breadcrumbs': true,
    }
  });

  const breadcrumbStyles = computed(() => {

  });


  return {
    breadcrumbsItemClasses,
    breadcrumbsItemStyles,
    breadcrumbClasses,
    breadcrumbStyles
  }
}
