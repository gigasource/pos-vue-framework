<template>
    <g-layout>
        <p>Click to shown tool tip</p>
        <g-tool-tip right>
            <template #activator="{on}">
                <button v-on="on">Click me</button>
            </template>
            <span>Content</span>
        </g-tool-tip>

        <br/>
        <p>Hover to shown tool tip</p>
        <g-tool-tip left open-on-hover fixed>
            <template #activator="{on}">
                <button v-on="on">Hover me</button>
            </template>
            <span>Hover</span>
        </g-tool-tip>
    </g-layout>
</template>
<script>
    import GToolTip from '@/components/GToolTip/GToolTip';
    import GLayout from '@/components/GLayout/GLayout';

    export default {
        name: 'ToolTipDemo',
        components: { GLayout, GToolTip },
    }
</script>
<style scoped>
</style>
