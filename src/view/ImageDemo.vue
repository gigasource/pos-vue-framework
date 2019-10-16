<template>
    <div>
        <g-img src="https://i.ytimg.com/vi/B5Qb12DqZTA/maxresdefault.jpg"
               gradient="to top right, rgba(100,115,201,.33), rgba(255,32,72,.7)"
               height="400" aspect-ratio="1" contain></g-img>
        <g-img src="https://bad.src/not/valid" width="400" height="400" contain>
        </g-img>
        <!--        <g-img src="https://i.ytimg.com/vi/B5Qb12DqZTA/maxresdefault.jpg" width="500" height="500" contain></g-img>-->
    </div>
</template>

<script>
  import GImg from '../components/GImg/GImg';

  export default {
    name: "ImageDemo",
    components: {GImg}
  }
</script>

<style scoped>
</style>
