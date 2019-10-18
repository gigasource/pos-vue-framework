<template>
	<div style="margin: 30px">
		<g-data-table fixed-header height="800" striped>
			<template v-slot:default>
				<thead>
				<tr>
					<th class="text-left">Name<i class="material-icons" style="float: right">keyboard_arrow_down</i></th>
					<th class="text-left">Position<i class="material-icons" style="float: right">keyboard_arrow_down</i></th>
					<th class="text-left">Office<i class="material-icons" style="float: right">keyboard_arrow_down</i></th>
					<th class="text-left">Age<i class="material-icons" style="float: right">keyboard_arrow_down</i></th>
					<th class="text-left">Gender<i class="material-icons" style="float: right">keyboard_arrow_down</i></th>
				</tr>
				</thead>
				<tbody>
				<tr v-for="item in desserts">
					<td>{{ item.name }}</td>
					<td>{{ item.position }}</td>
					<td>{{ item.office }}</td>
					<td>{{ item.age }}</td>
					<td>{{ item.gender }}</td>
				</tr>
				</tbody>
				<tfoot>
				<tr>
					<th class="text-left">Name</th>
					<th class="text-left">Position</th>
					<th class="text-left">Office</th>
					<th class="text-left">Age</th>
					<th class="text-left">Gender</th>
				</tr>
				</tfoot>
			</template>
		</g-data-table>
	</div>

</template>

<script>
  import GDataTable from '../components/GDataTable/GDataTable';

  export default {
    name: 'DataTableDemo',
    components: { GDataTable },
    data: () => ({
      desserts: [
        {
          name: 'Frozen Yogurt',
          position: 159,
          office: 'Alaska',
          age: 23,
          gender: 'F'
        },
        {
          name: 'Ice cream sandwich',
          position: 237,
          office: 'London',
          age: 23,
          gender: 'F'
        },
        {
          name: 'Eclair',
          position: 262,
          office: 'Hanoi',
          age: 23,
          gender: 'F'
        },
        {
          name: 'Cupcake',
          position: 305,
          office: 'Singapore',
          age: 23,
          gender: 'F'
        },
        {
          name: 'Gingerbread',
          position: 356,
          office: 'Tokyo',
          age: 23,
          gender: 'M'
        },
        {
          name: 'Jelly bean',
          position: 375,
          office: 'San Francisco',
          age: 23,
          gender: 'M'
        },
        {
          name: 'Lollipop',
          position: 392,
          office: 'Edinburgh',
          age: 23,
          gender: 'M'
        },
        {
          name: 'Honeycomb',
          position: 408,
          office: 'Melbourne',
          age: 23,
          gender: 'M'
        },
        {
          name: 'Donut',
          position: 452,
          office: 'Sydney',
          age: 23,
          gender: 'M'
        },
        {
          name: 'KitKat',
          position: 518,
          office: 'Saigon',
          age: 23,
          gender: 'M'
        },
        {
          name: 'Sugar',
          position: 408,
          office: 'Da Nang',
          age: 23,
          gender: 'M'
        },
        {
          name: 'Salt',
          position: 452,
          office: 'Okinawa',
          age: 23,
          gender: 'M'
        },
        {
          name: 'Pepper',
          position: 518,
          office: 'Hanoi',
          age: 23,
          gender: 'M'
        },
        {
          name: 'Honeycomb',
          position: 408,
          office: 'Melbourne',
          age: 23,
          gender: 'M'
        },
        {
          name: 'Donut',
          position: 452,
          office: 'Sydney',
          age: 23,
          gender: 'M'
        },
        {
          name: 'KitKat',
          position: 518,
          office: 'Saigon',
          age: 23,
          gender: 'M'
        },
        {
          name: 'Sugar',
          position: 408,
          office: 'Da Nang',
          age: 23,
          gender: 'M'
        },
        {
          name: 'Salt',
          position: 452,
          office: 'Okinawa',
          age: 23,
          gender: 'M'
        },
        {
          name: 'Pepper',
          position: 518,
          office: 'Hanoi',
          age: 23,
          gender: 'M'
        }, {
          name: 'Honeycomb',
          position: 408,
          office: 'Melbourne',
          age: 23,
          gender: 'M'
        },
        {
          name: 'Donut',
          position: 452,
          office: 'Sydney',
          age: 23,
          gender: 'M'
        },
        {
          name: 'KitKat',
          position: 518,
          office: 'Saigon',
          age: 23,
          gender: 'M'
        },
        {
          name: 'Sugar',
          position: 408,
          office: 'Da Nang',
          age: 23,
          gender: 'M'
        },
        {
          name: 'Salt',
          position: 452,
          office: 'Okinawa',
          age: 23,
          gender: 'M'
        },
        {
          name: 'Pepper',
          position: 518,
          office: 'Hanoi',
          age: 23,
          gender: 'M'
        },
        {
          name: 'Gingerbread',
          position: 356,
          office: 'Tokyo',
          age: 23,
          gender: 'M'
        },
        {
          name: 'Jelly bean',
          position: 375,
          office: 'San Francisco',
          age: 23,
          gender: 'M'
        },
        {
          name: 'Lollipop',
          position: 392,
          office: 'Edinburgh',
          age: 23,
          gender: 'M'
        },
        {
          name: 'Honeycomb',
          position: 408,
          office: 'Melbourne',
          age: 23,
          gender: 'M'
        },
        {
          name: 'Donut',
          position: 452,
          office: 'Sydney',
          age: 23,
          gender: 'M'
        },
        {
          name: 'KitKat',
          position: 518,
          office: 'Saigon',
          age: 23,
          gender: 'M'
        },
        {
          name: 'Sugar',
          position: 408,
          office: 'Da Nang',
          age: 23,
          gender: 'M'
        },
        {
          name: 'Salt',
          position: 452,
          office: 'Okinawa',
          age: 23,
          gender: 'M'
        },
        {
          name: 'Pepper',
          position: 518,
          office: 'Hanoi',
          age: 23,
          gender: 'M'
        },
        {
          name: 'Honeycomb',
          position: 408,
          office: 'Melbourne',
          age: 23,
          gender: 'M'
        },
        {
          name: 'Donut',
          position: 452,
          office: 'Sydney',
          age: 23,
          gender: 'M'
        },
        {
          name: 'KitKat',
          position: 518,
          office: 'Saigon',
          age: 23,
          gender: 'M'
        },
        {
          name: 'Sugar',
          position: 408,
          office: 'Da Nang',
          age: 23,
          gender: 'M'
        },
        {
          name: 'Salt',
          position: 452,
          office: 'Okinawa',
          age: 23,
          gender: 'M'
        },
        {
          name: 'Pepper',
          position: 518,
          office: 'Hanoi',
          age: 23,
          gender: 'M'
        }, {
          name: 'Honeycomb',
          position: 408,
          office: 'Melbourne',
          age: 23,
          gender: 'M'
        },
        {
          name: 'Donut',
          position: 452,
          office: 'Sydney',
          age: 23,
          gender: 'M'
        },
        {
          name: 'KitKat',
          position: 518,
          office: 'Saigon',
          age: 23,
          gender: 'M'
        },
        {
          name: 'Sugar',
          position: 408,
          office: 'Da Nang',
          age: 23,
          gender: 'M'
        },
        {
          name: 'Salt',
          position: 452,
          office: 'Okinawa',
          age: 23,
          gender: 'M'
        },
        {
          name: 'Pepper',
          position: 518,
          office: 'Hanoi',
          age: 23,
          gender: 'M'
        }
      ],
    })
  }
</script>

<style scoped>

</style>
