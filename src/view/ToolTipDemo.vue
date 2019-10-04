<template>
    <div>
        <div>
            <h3>1) Click to toggle tooltip</h3>
            <g-tool-tip right>
                <template #activator="{on}">
                    <button v-on="on">Click to toggle tool tip</button>
                </template>
                <span>Content</span>
            </g-tool-tip>
        </div>
        <br/>
        <div>
            <h3>2) Open on hover</h3>

            <div>
                <h4>Hovering</h4>
                <g-tool-tip open-on-hover bottom>
                    <template #activator="{on}">
                        <button v-on="on">open-on-hover</button>
                    </template>
                    <span>...</span>
                </g-tool-tip>
            </div>

            <div>
                <h4>Delay</h4>
                <g-tool-tip open-on-hover open-delay="500">
                    <template #activator="{on}">
                        <button v-on="on">Open delay 500</button>
                    </template>
                    <span>Open delay 200</span>
                </g-tool-tip>

                <br>
                <g-tool-tip open-on-hover close-delay="500">
                    <template #activator="{on}">
                        <button v-on="on">Close delay 500</button>
                    </template>
                    <span>Close delay 2000</span>
                </g-tool-tip>
            </div>
        </div>

        <div>
            <h3>3) Positioning</h3>
            <div>
                <h4>3.1) Align</h4>
                <g-tool-tip open-on-hover right>
                    <template #activator="{on}">
                        <button v-on="on">Align right</button>
                    </template>
                    <span>Align right</span>
                </g-tool-tip>


                <g-tool-tip open-on-hover top>
                    <template #activator="{on}">
                        <button v-on="on">Align top</button>
                    </template>
                    <span>Align top</span>
                </g-tool-tip>


                <g-tool-tip open-on-hover left>
                    <template #activator="{on}">
                        <button v-on="on">Align left</button>
                    </template>
                    <span>Align left</span>
                </g-tool-tip>

                <g-tool-tip open-on-hover bottom>
                    <template #activator="{on}">
                        <button v-on="on">Align bottom</button>
                    </template>
                    <span>Align bottom</span>
                </g-tool-tip>
            </div>

            <div>
                <h4>3.2) Nudge</h4>
                <g-tool-tip open-on-hover nudge-right="300">
                    <template #activator="{on}">
                        <button v-on="on">Nudge right 300</button>
                    </template>
                    <span>...</span>
                </g-tool-tip>

                <g-tool-tip open-on-hover nudge-bottom="300">
                    <template #activator="{on}">
                        <button v-on="on">Nudge bottom 300</button>
                    </template>
                    <span>...</span>
                </g-tool-tip>
            </div>

            <div>
                <h4>3.3) Fixed</h4>
                <g-tool-tip open-on-hover fixed>
                    <template #activator="{on}">
                        <button v-on="on">Fixed</button>
                    </template>
                    <span>Fixed</span>
                </g-tool-tip>
            </div>

            <g-layout>
                <h4>3.4) Absolute</h4>
            </g-layout>
        </div>

        <div>
            <h3>4) Coloring</h3>
            <g-tool-tip open-on-hover color="#ff4444">
                <template #activator="{on}">
                    <button v-on="on">Tooltip color #ff4444</button>
                </template>
                <span>Tooltip color #ff4444</span>
            </g-tool-tip>
        </div>
    </div>
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
