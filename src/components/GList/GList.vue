<template>
  <div :class="classes"
       class="g-list"
       :style="styles"
       v-model="internalValue">
    <template v-if="!multiSection">
      <div class="singleSectionList">
        <slot name="subheader">
          <div class="g-list-header">{{subheader}}</div>
        </slot>
        <div v-for="(item, index) in renderList" :key="index" class="item">
          <slot :item="item">
            <!-- fixme: wave effect does not work  -->
            <div v-if="item.title" class="g-list-item waves-effect">
              <slot name="prepend" :item="item">
                <div :class="prependClasses">
                  <img alt="" :src="item.prepend">
                </div>
              </slot>

              <div class="g-list-item-content">
                <div class="g-list-item-text">{{item.title}}</div>
                <div class="g-list-item-text__sub"
                     :class="{'...wrap': subtitleWrap}"
                     v-if="lineNumber > 1">
                  {{item.subtitle|| '&nbsp;'}}
                </div>
                <div class="g-list-item-text__sub" v-if="lineNumber === 3">{{item.subtitle2||'&nbsp;'}}</div>
              </div>
              <!--fixme: append wait for VIcon-->
              <div class="g-list-item-action">
                <slot name="append" :item="item">

                </slot>
              </div>
            </div>
            <g-divider v-if="(divider && (index < renderList.length -1))"
                       :inset="divider === 'inset'"/>
          </slot>
        </div>
      </div>
    </template>

    <template v-else>
      <template v-for="(item) in items">
        <template v-if="item.type === 'subheader'">
          <slot name="subheader">
            <div class="g-list-header">{{item.subheader}}</div>
          </slot>
        </template>

        <g-divider v-else-if="item.type === 'divider'"></g-divider>

        <slot :item="item" v-else>
          <div class="g-list-item">
            <slot name="prepend" :item="item">
              <div :class="prependClasses">
                <img alt="" :src="item.prepend">
              </div>
            </slot>

            <div class="g-list-item-content">
              <div class="g-list-item-text">{{item.title}}</div>
              <div class="g-list-item-text__sub"
                   :class="{'...wrap': subtitleWrap}"
                   v-if="lineNumber > 1">
                {{item.subtitle || '&nbsp;&nbsp;'}}
              </div>
              <div class="g-list-item-text__sub" v-if="lineNumber === 3">{{item.subtitle2}}</div>
            </div>

            <!--fixme: append wait for VIcon-->
            <div class="g-list-item-action">
              <slot name="append" :item="item"></slot>
            </div>
          </div>
        </slot>

      </template>
    </template>
  </div>
</template>

<script>
  import {computed} from '@vue/composition-api';
  import GDivider from "../GLayout/GDivider";

  export default {
    name: 'GList',
    components: {GDivider},
    props: {
      height: String,
      width: String,
      disabled: Boolean,
      rounded: Boolean,
      shaped: Boolean,
      elevation: {
        type: [Number, String],
        default: 2,
      },
      dense: Boolean,
      nav: Boolean,
      items: Array,
      multiSection: Boolean,
      subheader: String,
      divider: {
        type: [Boolean, String],
        default: false,
      },
      prependType: {
        type: String,
        default: 'icon',
      },
      subtitleWrap: Boolean,
      value: [String, Object],
    },
    setup: function (props, context) {
      const lineNumber = computed(() => {
        if (!props.items.find(i => i.subtitle)) return 1;
        if (props.items.find(i => i.subtitle2)) return 3;
        return 2;
      })

      const classes = computed(() => ({
        'g-list__disabled': props.disabled,
        'g-list__two-line': (lineNumber.value === 2 && !props.subtitleWrap),
        'g-list__three-line': (lineNumber.value === 2 && props.subtitleWrap)||lineNumber.value === 3,
        'g-list__rounded': props.rounded,
        'g-list__shaped': props.shaped,
        ['elevation-' + props.elevation]: true,
        'g-list__dense': props.dense,
        'g-list__nav': props.nav,
      }));

      const styles = computed(() => ({
        ...props.height && {'height': props.height},
        ...props.width && {'width': props.width}
      }));

      const prependClasses = computed(() => {
        if (!['icon', 'avatar', 'image'].includes(props.prependType)) {
          return `g-list-item-icon`
        }
        return `g-list-item-${props.prependType}`;
      })

      const renderList = computed(() => props.items.filter(item => item.title))

      return {
        classes,
        styles,
        prependClasses,
        renderList,
        lineNumber
      }
    }
  }
</script>

<style scoped>

</style>
