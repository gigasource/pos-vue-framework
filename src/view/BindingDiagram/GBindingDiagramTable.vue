<script>
  export default {
    name: 'GBindingDiagramTable',
    props: {
      value: Array
		},
    setup (props, context) {

      const genBindingConnection = (connection) => {
				return <tr>
					<td>{connection.type}</td>
					<td>{connection.foreign}</td>
					<td>{connection.local}</td>
				</tr>
			}

      const genTable = () => {
				return <table>
					<tr>
						<th></th>
						<th>parent</th>
						<th>children</th>
					</tr>
					{props.value.map((connection) => genBindingConnection(connection))}
				</table>
			}

			return {
        genTable
			}
		},
		render () {
      return this.genTable()
		}
  }
</script>
<style scoped lang="scss">
	table {
		width: 100%
	}

	th, td {
		width: 33.33%
	}

	table, th, td {
		border: 1px solid black;
		border-collapse: collapse;
	}
</style>