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

      function genSidebar() {
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
        return <g-sidebar class="sidebar" width="243px">
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
          <g-btn class="btn1" height="177.5px" backgroundColor="#FFFFFF">
            <div>
              <g-icon>{CashRegister}</g-icon>
              <div class="btn-text" style="margin-top: 15px">Cash Register</div>
            </div>
          </g-btn>
          <g-btn class="btn2" height="177.5px" backgroundColor="#FFFFFF">
            <div>
              <g-icon>{OrderHistory}</g-icon>
              <div class="btn-text">Order History</div>
            </div>
          </g-btn>
          <g-btn class="btn3" height="177.5px" backgroundColor="#FFFFFF">
            <div>
              <g-icon>{StaffReport}</g-icon>
              <div class="btn-text">Staff Report</div>
            </div>
          </g-btn>
          <g-btn class="btn4" height="177.5px" backgroundColor="#FFFFFF">
            <div>
              <g-icon>{Setting}</g-icon>
              <div class="btn-text">Setting</div>
            </div>
          </g-btn>
          <g-btn class="btn5" height="177.5px" backgroundColor="#FFFFFF">
            <div>
              <g-icon>{AdminDashboard}</g-icon>
              <div class="btn-text">Admin Dashboard</div>
            </div>
          </g-btn>
          <g-btn class="btn6" height="177.5px" backgroundColor="#FFFFFF">
            <div>
              <g-icon>{EndOfDayIcon}</g-icon>
              <div class="btn-text">End of Day</div>
            </div>
          </g-btn>
          <g-btn class="btn7" height="177.5px" backgroundColor="#FFFFFF">
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
    grid-template-columns: 243px 781px;
    grid-template-rows: 64px 712px;
    grid-template-areas: "header header" "sidebar content";
  }

  .header {
    grid-area: header;

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
      padding: 10px 10px 10px 20px;
    }
  }

  .sidebar {
    grid-area: sidebar;

    ::v-deep .g-sidebar {
      position: relative;
    }

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

  .btn-text {
    font-size: 16px;
    letter-spacing: 0;
    color: #424242;
    margin-top: 20px;
    //line-height: 20px;
    //text-align: center;
    //font-weight: bold;
  }

  .welcome {
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

</style>