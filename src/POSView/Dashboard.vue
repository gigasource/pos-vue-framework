<script>
  import {reactive} from "@vue/composition-api"
  //import component
  import GLayout from "../components/GLayout/GLayout";
  import GToolbar from "../components/GToolbar/GToolbar";
  import GSidebar from '../components/GSidebar/GSidebar';
  import GSideBarTreeView from "../components/GSidebar/GSideBarTreeView";
  import GList from "../components/GList/GList";
  import GAvatar from "../components/GAvatar/GAvatar";
  import GIcon from "../components/GIcon/GIcon";
  import GImg from "../components/GImg/GImg";
  import GBtn from "../components/GBtn/GBtn";
  import GSpacer from "../components/GLayout/GSpacer";
  //import icon
  import CashRegister from "../assets/dashboard/CashRegister.svg"
  import OrderHistory from "../assets/dashboard/OrderHistory.svg"
  import StaffReport from "../assets/dashboard/StaffReport.svg"
  import Setting from "../assets/dashboard/Setting.svg"
  import AdminDashboard from "../assets/dashboard/AdminDashboard.svg"
  import EndOfDayIcon from "../assets/dashboard/EndOfDay.svg"
  import Support from "../assets/dashboard/Support.svg"
  import LogOut from "../assets/dashboard/LogOut.svg"

  export default {
    name: 'Dashboard',
    components: {GLayout, GToolbar, GSidebar, GSideBarTreeView, GAvatar, GIcon, GBtn, GImg, GSpacer},
    setup() {

      function genDashboard() {
        const state = reactive({
          data: [{
            title: 'Dashboard', icon: 'mdi-cart-outline',
            items: [
              {title: 'Retail', icon: 'radio_button_unchecked', iconType: 'small'},
              {title: 'Retail', icon: 'radio_button_unchecked', iconType: 'small'},
              {title: 'Retail', icon: 'radio_button_unchecked', iconType: 'small'}
            ]
          }, {
            title: 'Inventory', icon: 'mdi-cart-outline',
          },],
          value: null,
        })

        return <g-layout class="container">
          <g-toolbar class="header" gradient="indigo, blue">
            <g-avatar>
              <g-img src="https://carlisletheacarlisletheatre.org/images/person-icon-flat-7.png"/>
            </g-avatar>
            <h6>Admin</h6>
            <g-spacer/>
            <h6>time & date</h6>
          </g-toolbar>
          <g-sidebar class="sidebar" width="243px">
            <g-side-bar-tree-view data={state.data} vModel={state.value}/>
            <g-spacer/>
            <div class="footer">
              <g-icon style="padding-left:21px">{LogOut}</g-icon>
              <span style="padding-left:15px">Log Out</span></div>
          </g-sidebar>
          <div class="content">
            <h5>Welcome !</h5>
            <g-btn class="btn1" height="177.5px" backgroundColor="#FFFFFF">
              <g-icon>{CashRegister}</g-icon>
            </g-btn>
            <g-btn class="btn2" height="177.5px" backgroundColor="#FFFFFF">
              <g-icon>{OrderHistory}</g-icon>
            </g-btn>
            <g-btn class="btn3" height="177.5px" backgroundColor="#FFFFFF">
              <g-icon>{StaffReport}</g-icon>
            </g-btn>
            <g-btn class="btn4" height="177.5px" backgroundColor="#FFFFFF">
              <g-icon>{Setting}</g-icon>
            </g-btn>
            <g-btn class="btn5" height="177.5px" backgroundColor="#FFFFFF">
              <g-icon>{AdminDashboard}</g-icon>
            </g-btn>
            <g-btn class="btn6" height="177.5px" backgroundColor="#FFFFFF">
              <g-icon>{EndOfDayIcon}</g-icon>
            </g-btn>
            <g-btn class="btn7" height="177.5px" backgroundColor="#FFFFFF">
              <g-icon>{Support}</g-icon>
            </g-btn>
          </div>
        </g-layout>
      }

      return {
        genDashboard
      }
    },

    render() {
      return this.genDashboard()
    }
  }
</script>

<style scoped lang="scss">
  ul::v-deep {
    .g-treeview-item {
      margin-right: 0;

      &:not(.g-treeview-subheader):hover {
        background: linear-gradient(11.17deg, #303F9F 0%, #1976D2 100%);

        i, span {
          color: #F2F2F2;
        }
      }
    }
  }

  //component css
  .container {
    display: grid;
    grid-template-columns: 243px 781px;
    grid-template-rows: 64px 712px;
    grid-template-areas: "header header" "sidebar content";
  }

  .header {
    grid-area: header;
  }

  .sidebar {
    grid-area: sidebar;

    ::v-deep .g-sidebar {
      position: relative;
    }
  }

  .content {
    grid-area: content;
    background: #F2F2F2;
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 2px 4px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
    padding-left: 20px;
    padding-right: 19.5px;

    display: grid;
    grid-template: [row1-start] ". . . ." 70px [row1-end] [row2-start] "btn1 btn2 btn3 ." 177.5px [row2-end] [row3-start] ". . . ." 80.5px [row3-end] [row4-start] "btn4 btn5 btn6 btn7" 177.5px [row4-end]
      /177.5px 177.5px 177.5px 177.5px;
    grid-column-gap: 10.5px;
  }

  .btn1 {
    grid-area: btn1;
  }

  .btn2 {
    grid-area: btn2;
  }

  .btn3 {
    grid-area: btn3;
  }

  .btn4 {
    grid-area: btn4;
  }

  .btn5 {
    grid-area: btn5;
  }

  .btn6 {
    grid-area: btn6;
  }

  .btn7 {
    grid-area: btn7;
  }

  h6 {
    color: white;
    padding-left: 10px;
  }

  .footer {
    height: 53px;
    width: 243px;
    display: flex;
    align-items: center;
    border-top: 2px solid #F2F2F2
  }

  .g-sidebar {
    position: relative;
  }

</style>