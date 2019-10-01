<template>
    <g-layout class="justify-center">
        <g-button width="100px" height="50px" @click="overlay = !overlay">Show Overlay</g-button>
        <g-overlay :value="overlay" color="teal" opacity="0.8">
            <g-button width="100px" height="50px" @click="overlay = false">Close</g-button>
        </g-overlay>
    </g-layout>
</template>

<script>
    import GOverlay from "../components/GOverlay/GOverlay";
    import GButton from "../components/GButton/GButton";
    import GLayout from "../components/GLayout/GLayout";
    export default {
        name: "OverlayDemo",
        components: {GLayout, GButton, GOverlay},
        data() {
            return {
                overlay: false
            }
        }
    }
</script>

<style scoped>

</style>