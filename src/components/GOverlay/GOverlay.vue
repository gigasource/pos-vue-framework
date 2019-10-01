<template>
    <div class="overlay" :class="overlayClass" :style="overlayStyle">
        <div class="overlay-scrim" :style="scrimStyle"></div>
        <div v-if="value" class="overlay-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "GOverlay",
        props: {
            absolute: Boolean,
            value: {
                type: Boolean,
                default: false
            },
            opacity: {
                type: [Number, String],
                default: 0.46
            },
            color: {
                type: String,
                default: '#212121',
            },
            zIndex: {
                type: [Number, String],
                default: 5,
            }
        },
        computed: {
            computedOpacity() {
                return this.value ? this.opacity : 0;
            },
            overlayStyle() {
                return {
                    zIndex: this.zIndex
                }
            },
            overlayClass() {
                return {
                    overlay__active: this.value,
                    overlay__absolute: this.absolute
                }
            },
            scrimStyle() {
                return {
                    opacity: this.computedOpacity,
                    backgroundColor: this.color
                }
            }
        }
    }
</script>

<style scoped>

</style>