<template>
    <div>
        <g-btn @click="changeSrc">Change src</g-btn>
        <g-img :src="src"
               gradient="to top right, rgba(100,115,201,.33), rgba(255,32,72,.7)"
               height="500px" width="500px"
               srcset="https://i.ytimg.com/vi/B5Qb12DqZTA/maxresdefault.jpg 1000w,https://picsum.photos/id/11/10/6 500w"
               contain></g-img>
        <div style="height: 3000px; width: 400px">
        </div>
        <g-img src="https://i.ytimg.com/vi/B5Qb12DqZTA/maxresdefault.jpg"
               lazy-src="https://picsum.photos/id/11/10/6"
               gradient="to top right, rgba(100,115,201,.33), rgba(255,32,72,.7)"
               height="400" aspect-ratio="1" contain></g-img>

        <!--        <g-img src="https://i.ytimg.com/vi/B5Qb12DqZTA/maxresdefault.jpg"></g-img>-->

        <!--        <g-img src="https://i.ytimg.com/vi/B5Qb12DqZTA/maxresdefault.jpg" height="500" aspect-ratio="0.5" contain></g-img>-->

        <!--        <g-img-->
        <!--                src="https://i.ytimg.com/vi/B5Qb12DqZTA/maxresdefault.jpg"-->
        <!--                lazy-src="https://picsum.photos/id/11/10/6"-->
        <!--                aspect-ratio="1"-->
        <!--                class="grey lighten-2"-->
        <!--                width="500"-->
        <!--                height="500"-->
        <!--                contain-->
        <!--            <template v-slot:placeholder>-->
        <!--            </template>-->
        <!--            <p bgStyle="color: #00AEFF;">Hello World!</p>-->
        <!--        </g-img>-->
        <!--        <g-img-->
        <!--                src="https://i.ytimg.resdefault.jpg"-->
        <!--                lazy-src="https://picsum.photos/id/11/10/6"-->
        <!--                aspect-ratio="1"-->
        <!--                class="grey lighten-2"-->
        <!--                width="500"-->
        <!--                height="500"-->
        <!--                contain-->
        <!--        >-->
        <!--            <template v-slot:placeholder>-->
        <!--                <div bgStyle="height: 100%;width: 100%; align-content: center">-->
        <!--                    <p>$$$</p>-->
        <!--                </div>-->
        <!--            </template>-->
        <!--            <p bgStyle="color: #00AEFF;">Hello World!</p>-->
        <!--        </g-img>-->
        <!--        <div bgStyle="height: 3000px; width: 500px"></div>-->
        <!--        <g-img-->
        <!--                src="https://i.ytimg.com/vi/B5Qb12DqZTA/maxresdefault.jpg"-->
        <!--                lazy-src="https://picsum.photos/id/11/10/6"-->
        <!--                aspect-ratio="1"-->
        <!--                class="grey lighten-2"-->
        <!--                width="500"-->
        <!--                height="500"-->
        <!--                contain-->
        <!--        >-->
        <!--            <template v-slot:placeholder>-->

        <!--            </template>-->
        <!--            <p bgStyle="color: #00AEFF;">Hello World!</p>-->
        <!--        </g-img>-->
    </div>
</template>

<script>
  import GImg from '../components/GImg/GImg';
  import GBtn from "../components/GBtn/GBtn";

  export default {
    name: "ImageDemo",
    components: {GBtn, GImg},
    data: () => ({
      src: 'https://i.ytimg.com/vi/B5Qb12DqZTA/maxresdefault.jpg',
      changedSrc: false
    }),
    methods: {
      changeSrc() {
        this.src = this.changedSrc ? 'https://i.ytimg.com/vi/B5Qb12DqZTA/maxresdefault.jpg' : 'https://picsum.photos/id/11/10/6'
        this.changedSrc = !this.changedSrc
      }
    }
  }
</script>

<style scoped>
</style>
