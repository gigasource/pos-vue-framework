<template>
    <div>
        <g-button @click="overlay = !overlay">Show Overlay</g-button>
        <h1>Hello World</h1>
        <g-overlay :value="overlay" color="black" opacity="0.5" z-index="-1">
            <g-button width="100" height="50" @click="overlay = false">Close</g-button>
        </g-overlay>
    </div>
</template>

<script>
    import GOverlay from "../components/GOverlay/GOverlay";
    import GButton from "../components/GButton/GButton";
    export default {
        name: "OverlayDemo",
        components: {GButton, GOverlay},
        data() {
            return {
                overlay: false
            }
        }
    }
</script>

<style scoped>

</style>