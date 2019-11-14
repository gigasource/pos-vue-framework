<script>
  import {reactive, computed} from "@vue/composition-api"
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
  import CashRegister from "../assets/dashboard/code.svg"
  import OrderHistory from "../assets/dashboard/history.svg"
  import StaffReport from "../assets/dashboard/report.svg"
  import Setting from "../assets/dashboard/gear.svg"
  import AdminDashboard from "../assets/dashboard/dashboard.svg"
  import EndOfDayIcon from "../assets/dashboard/calendar.svg"
  import Support from "../assets/dashboard/info.svg"
  import LogOut from "../assets/dashboard/LogOut.svg"

  export default {
    name: 'Dashboard',
    components: {GLayout, GToolbar, GSidebar, GSideBarTreeView, GAvatar, GIcon, GBtn, GImg, GSpacer},
    setup() {


      function genHeader() {
        return <g-toolbar class="header" gradient="indigo, blue">
          <g-avatar size="37">
            <g-img src="https://carlisletheacarlisletheatre.org/images/person-icon-flat-7.png"/>
          </g-avatar>
          <h6 class="user">Admin</h6>
          <g-spacer/>
          <div class="time">
            <p>2:28 PM</p>
            <p>14/11/2019</p>
          </div>
        </g-toolbar>
      }

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

      function genSidebar() {

        return <g-sidebar class="sidebar" width="100%">
          <g-side-bar-tree-view data={state.data} vModel={state.value}/>
          <g-spacer/>
          <div class="footer">
            <g-icon style="margin: 16px 12px 13px 21px">{LogOut}</g-icon>
            <span>Log Out</span></div>
        </g-sidebar>
      }

      function genContent() {
        return <div class="content">
          <p class="welcome">Welcome !</p>
          <div class="line"/>
          <g-btn class="btn1" backgroundColor="#FFFFFF" height="100%">
            <div>
              <g-icon>{CashRegister}</g-icon>
              <div class="btn-text" style="margin-top: 15px">Cash Register</div>
            </div>
          </g-btn>
          <g-btn class="btn2" backgroundColor="#FFFFFF" height="100%">
            <div>
              <g-icon>{OrderHistory}</g-icon>
              <div class="btn-text">Order History</div>
            </div>
          </g-btn>
          <g-btn class="btn3" backgroundColor="#FFFFFF" height="100%">
            <div>
              <g-icon>{StaffReport}</g-icon>
              <div class="btn-text">Staff Report</div>
            </div>
          </g-btn>
          <g-btn class="btn4" backgroundColor="#FFFFFF" height="100%">
            <div>
              <g-icon>{Setting}</g-icon>
              <div class="btn-text">Setting</div>
            </div>
          </g-btn>
          <g-btn class="btn5" backgroundColor="#FFFFFF" height="100%">
            <div>
              <g-icon>{AdminDashboard}</g-icon>
              <div class="btn-text">Admin Dashboard</div>
            </div>
          </g-btn>
          <g-btn class="btn6" backgroundColor="#FFFFFF" height="100%">
            <div>
              <g-icon>{EndOfDayIcon}</g-icon>
              <div class="btn-text">End of Day</div>
            </div>
          </g-btn>
          <g-btn class="btn7" backgroundColor="#FFFFFF" height="100%">
            <div>
              <g-icon>{Support}</g-icon>
              <div class="btn-text">Support</div>
            </div>
          </g-btn>
        </div>
      }

      function genDashboard() {
        return <g-layout class="container">
          {genHeader()}
          {genSidebar()}
          {genContent()}
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
  .container {
    display: grid;
    grid-template-columns: 23.75% 76.25%;
    grid-template-rows: 8.25% 91.75%;
    grid-template-areas: "header header" "sidebar content";
    max-width: 1500px;
    max-height: 100%;
  }

  .header {
    grid-area: header;
    //min-height: 40px;
    height: 100% !important;

    font-family: Muli;
    font-style: normal;
    text-align: right;
    color: #FFFFFF;

    .time {
      font-weight: 100;
      font-size: 13px;
      line-height: 16px;
    }

    .user {
      font-weight: 800;
      font-size: 13px;
      line-height: 16px;
    }

    ::v-deep .g-toolbar-content {
      padding: 1.28% 1.28% 1.28% 2.56%;
      height: 100% !important;
    }

    ::v-deep .g-toolbar-background {
      height: 100% !important;

      div {
        height: 100% !important;
      }
    }
  }

  .sidebar {
    grid-area: sidebar;

    &::v-deep .g-sidebar {
      position: relative;
      max-width: 100%;
      overflow: hidden;
    }

    ul::v-deep {
      .g-treeview-item {
        margin-right: 0;
      }

      .g-treeview__active {
        background: linear-gradient(11.17deg, #303F9F 0%, #1976D2 100%) !important;
        color: white;

        .g-icon {
          color: inherit;
        }
      }

      .g-treeview-icon {
        margin: 17.25px 18px 15.75px 22.25px;
      }

      .g-treeview-icon__small {
        margin: 20px 23px 20px 28px;
      }
    }

    .footer {
      height: 53px;
      width: 243px;
      display: flex;
      align-items: center;
      border-top: 2px solid #F2F2F2
    }
  }

  .content {
    grid-area: content;
    background: #F2F2F2;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 1px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    padding-left: 2.25%;
    padding-right: 2.25%;

    display: grid;
    grid-template: [row1-start] "welcome welcome . ." 12% [row1-end] [row2-start] "btn1 btn2 btn3 ." 25% [row2-end] [row3-start] "line line line line" 12.5% [row3-end] [row4-start] "btn4 btn5 btn6 btn7" 25% [row4-end]
      /23.875% 23.875% 23.875% 23.875%;
    grid-column-gap: 1.5%;

  }

  .line {
    grid-area: line;
    align-self: center;
    height: 1px;
    background-color: #E0E0E0;
  }

  .btn1 {
    grid-area: btn1;
    //height: 25%;
  }

  .btn2 {
    grid-area: btn2;
    //height: 25%;
  }

  .btn3 {
    grid-area: btn3;
    //height: 25%;
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

  .btn-text {
    font-size: 16px;
    letter-spacing: 0;
    color: #424242;
    margin-top: 20px;
  }

  .welcome {
    grid-area: welcome;
    align-self: center;
    font-family: Muli;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 30px;

    color: #424242;
  }

  h6 {
    color: white;
    padding-left: 10px;
  }

  body {
    margin: 0;
  }

  .elevation-4 {
    box-shadow: 2px 0 0px -1px rgba(0, 0, 0, 0.2), 1px 0 2px 0px rgba(0, 0, 0, 0.14), 2px 0 5px 0px rgba(0, 0, 0, 0.12);
  }
</style>