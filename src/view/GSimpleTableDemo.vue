<template>
	<div>
		<p>Default table/Fixed height</p>
		<g-simple-table borderless hover>
			<template v-slot:default>
				<thead>
				<tr>
					<th class="text-left">Name</th>
					<th class="text-left">Calories</th>
				</tr>
				</thead>
				<tbody>
				<tr v-for="item in desserts" :key="item.name">
					<td>{{ item.name }}</td>
					<td>{{ item.calories }}</td>
				</tr>
				</tbody>
			</template>
		</g-simple-table>

		<p>Fixed height/Striped/Fixed header</p>

		<g-simple-table striped text-center>
			<template v-slot:default>
				<thead>
				<tr>
					<th class="text-left">Name</th>
					<th class="text-left">Name</th>
					<th class="text-left">Calories</th>
					<th class="text-left">Calories</th>
					<th class="text-left">Calories</th>
				</tr>
				</thead>
				<tbody>
				<tr v-for="item in desserts" :key="item.name">
					<td>{{ item.name }}</td>
					<td>{{ item.name }}</td>
					<td>{{ item.calories }}</td>
					<td>{{ item.calories }}</td>
					<td>{{ item.calories }}</td>
				</tr>
				</tbody>
			</template>
		</g-simple-table>
	</div>

</template>

<script>
  import GSimpleTable from '../components/GSimpleTable/GSimpleTable';

  export default {
    name: 'GSimpleTableDemo',
    components: { GSimpleTable },
    data: () => ({
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
        },
        {
          name: 'Eclair',
          calories: 262,
        },
        {
          name: 'Cupcake',
          calories: 305,
        },
        {
          name: 'Gingerbread',
          calories: 356,
        },
        {
          name: 'Jelly bean',
          calories: 375,
        },
        {
          name: 'Lollipop',
          calories: 392,
        },
        {
          name: 'Honeycomb',
          calories: 408,
        },
        {
          name: 'Donut',
          calories: 452,
        },
        {
          name: 'KitKat',
          calories: 518,
        },
        {
          name: 'Sugar',
          calories: 408,
        },
        {
          name: 'Salt',
          calories: 452,
        },
        {
          name: 'Pepper',
          calories: 518,
        }
      ],
    })
  }
</script>

<style scoped>

</style>
