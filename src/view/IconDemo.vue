<template>
    <div>
        <table>
            <tr>
                <td>
                    <g-icon color="red" xLarge disabled>fas fa-cat</g-icon>
                </td>
                <td>
                    <g-icon color="yellow" large>fas fa-car</g-icon>
                </td>
                <td>
                    <g-icon color="blue" medium>home</g-icon>
                </td>
                <td>
                    <g-icon color="green" dense>mdi-domain</g-icon>
                </td>
                <td>
                    <g-icon @click="foo" large color="red">{{svgPath}}</g-icon>
                </td>
                <td>
                    <g-icon @click="foo" large color="red" disabled>{{svgPath}}</g-icon>
                </td>
            </tr>
        </table>
        <g-btn class="ma-2" dark>
            <g-icon left color="yellow">fas fa-car</g-icon>Cancel
        </g-btn>
        <g-btn class="ma-2" dark>
            Cancel<g-icon right disabled>fas fa-cat</g-icon>
        </g-btn>
    </div>
</template>

<script>
  import GIcon from "../components/GIcon/GIcon";
  import {mdiAccount} from '@mdi/js';
  import GBtn from "../components/GBtn/GBtn";

  export default {
    name: "IconDemo",
    components: {GBtn, GIcon},
    // props: {
    //   icon: {
    //     type: String,
    //     default: '$cancel'
    //   }
    // },
    data: () => ({
      svgPath: mdiAccount
    }),
    methods:{
      foo(){}
    }
  }
</script>

<style scoped>

</style>
