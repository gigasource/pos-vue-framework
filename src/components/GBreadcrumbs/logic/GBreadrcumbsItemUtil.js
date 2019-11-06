import { computed } from '@vue/composition-api';

export default (props, context) => {
  const breadcrumbClasses = computed(() => {
    return {
      'g-breadcrumbs': true,
      'g-breadcrumbs__large': props.large
    }
  });

  return {
    breadcrumbClasses
  }
}
