import GBtnBs from '../../GBtn/GBtnBs'
import GIcon from '../../GIcon/GIcon'
import GBottomNavigation from '../../GBottomNavigation/GBottomNavigation'

export const demo = () =>({
  components: {GBtnBs, GIcon, GBottomNavigation},
  data() {
    return {
      active: 0
    }
  },
  methods: {
    getCls(index) {
      return index === this.active ? 'active' : ''
    }
  },
  template: `
  <div class="w-100 h-100 overflow-y-scroll" style="" id="container">
    <div style="width: 300px; height: 300px; border: 1px solid #aaa; position: relative; overflow: hidden">
      <g-bottom-navigation absolute hide-on-scroll background-color="#e0e0e0" scroll-target="#x">
        <g-btn-bs :class="getCls(0)" @click="active = 0">
          <g-icon>icon-restaurant</g-icon>
          <span>Home</span>
        </g-btn-bs>
        <g-btn-bs :class="getCls(1)" @click="active = 1"><g-icon>icon-delivery</g-icon>
          <span>Delivery</span>
        </g-btn-bs>
        <g-btn-bs :class="getCls(2)" @click="active = 2"><g-icon>icon-reservation</g-icon>
          <span>Reservation</span>
        </g-btn-bs>
      </g-bottom-navigation>

      <div style="width: 100%; height: 100%; overflow: scroll" id="x">
        <div style="width: 100%; height: 200%;"></div>
      </div>
    </div>

    <div style="width: 100%; height: 200%"></div>

    <g-bottom-navigation fixed hide-on-scroll background-color="#fff" scroll-target="#container" grow shift horizontal>
      <g-btn-bs :class="getCls(0)" @click="active = 0">
        <g-icon>icon-restaurant</g-icon>
        <span>Home</span>
      </g-btn-bs>
      <g-btn-bs :class="getCls(1)" @click="active = 1"><g-icon>icon-delivery</g-icon>
        <span>Delivery</span>
      </g-btn-bs>
      <g-btn-bs :class="getCls(2)" @click="active = 2"><g-icon>icon-reservation</g-icon>
        <span>Reservation</span>
      </g-btn-bs>
    </g-bottom-navigation>
  </div>`
})
