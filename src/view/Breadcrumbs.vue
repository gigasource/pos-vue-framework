<template>
  <div>
    <g-breadcrumbs :divider="divider" :items="items">
      <template v-slot:divider>
        <g-icon>mdi-chevron-right</g-icon>
      </template>

<!--      <template v-slot:item="props">-->
<!--        <g-breadcrumbs-item-->
<!--            :class="[props.item.disabled && 'disabled']"-->
<!--            :href="props.item.href"-->
<!--        >-->
<!--          {{ props.item.text.toUpperCase() }}-->
<!--        </g-breadcrumbs-item>-->
<!--      </template>-->
    </g-breadcrumbs>
  </div>

</template>

<script>
  import GBreadcrumbsItem from '../components/GBreadcrumbs/GBreadcrumbsItem';
  import GBreadcrumbs from '../components/GBreadcrumbs/GBreadcrumbs';
  import GIcon from '../components/GIcon/GIcon';

  export default {
    name: 'Breadcrumbs',
    components: { GBreadcrumbsItem, GBreadcrumbs, GIcon },
    data: () => ({
      items: [
        {
          text: 'Dashboard',
          disabled: false,
          href: '/',
        },
        {
          text: 'Selection Control',
          disabled: false,
          href: 'selection-control',
        },
        {
          text: 'Date Picker',
          disabled: true,
          href: 'date-picker-demo',
        },
        {
          text: 'Text Area',
          disabled: true,
          href: 'textarea',
        },
        {
          text: 'Pulse',
          disabled: false,
          href: 'pulse-demo',
        },
      ],
      divider: '/',
      dividers: ['/', '\\', '.', ';', '>', '-'],
    })
  }
</script>

<style scoped>

</style>
