import { computed } from '@vue/composition-api';

export default (props, context) => {
  const breadcrumbClasses = computed(() => {
    return {
      'g-breadcrumbs': true,
    }
  });

  const breadcrumbStyles = computed(() => {

  });


  return {
    breadcrumbClasses,
    breadcrumbStyles
  }
}
