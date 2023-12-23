<template>
  <div>
    <div
      id="all-npl-content-coreference-resolution"
      class="content-coreference-resolution"
    >
      Ner coreference resolution
    </div>
  </div>
</template>

<script>
const scripts = {
  REACT_PROD: '//unpkg.com/react@16/umd/react.production.min.js',
  REACT_DOM_PROD: '//unpkg.com/react-dom@16/umd/react-dom.production.min.js',
  B_HIGHLIGHT_JS: '/js/highlight.js',
}
export default {
  name: 'NerCoreferenceResolution',
  props: {
    ner: {
      type: Object,
      default: () => ({}),
    },
  },
  async mounted() {
    await this.loadScripts()
    this.loadNerContent()
  },
  methods: {
    async loadScripts() {
      // As an instance method inside a component
      await this.$loadScript(scripts.REACT_PROD)
      await this.$loadScript(scripts.REACT_DOM_PROD)
      await this.$loadScript(scripts.B_HIGHLIGHT_JS)
      return Promise.resolve(1)
    },
    loadNerContent(responseData) {
      responseData = this.ner || {}
      ReactDOM.render(
        React.createElement(Output, {
          responseData,
        }),
        document.querySelector('#all-npl-content-coreference-resolution')
      )
    },
  },
}
</script>

<style lang="scss">
.v-application {
  .content-coreference-resolution {
    .highlight-container {
      line-height: 42px !important;
      align-items: center;
      display: flex;
      flex-wrap: wrap;
      white-space: pre;
      cursor: default;
    }

    /* Bottom Label Layout */

    .highlight-container.highlight-container--bottom-labels {
      padding: 10px 1.125em;
      align-items: flex-start;
    }

    /* Diagram Layout */

    .highlight-container.highlight-container--diagram {
      align-items: flex-start;
    }

    .highlight-container.highlight-container--diagram.passage.model__content__summary {
      background: transparent;
      align-items: stretch;
      padding: 0;
    }

    .highlight {
      border: 2px solid;
      color: #232323;
      margin: 4px 6px 4px 3px;
      vertical-align: middle;
      box-shadow: 2px 4px 20px rgba(0, 0, 0, 0.1);
      position: relative;
      cursor: default;
      min-width: 26px;
      line-height: 22px;
      display: flex;
    }

    .highlight:last-child {
      margin-right: 4px;
    }

    .highlight:first-child {
      margin-left: 0;
    }

    .highlight,
    .highlight span {
      transition: background-color 0.1s ease, box-shadow 0.1s ease,
        opacity 0.1s ease;
    }

    .highlight.short-text {
      text-align: center;
    }

    .highlight__label {
      align-items: center;
      justify-content: center;
      display: flex;
      padding: 0 8px;
      text-align: center;
      user-select: none;
    }

    .highlight__label strong,
    .highlight__label span.highlight__label__secondary-label {
      display: block;
      font-size: 11px;
      color: #fff;
      -webkit-font-smoothing: subpixel-antialiased;
      letter-spacing: 0.1em;
    }

    .highlight__label strong {
      text-transform: uppercase;
    }

    .highlight__label span.highlight__label__secondary-label {
      opacity: 0.75;
      padding-left: 6px;
    }

    .highlight__content {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      padding: 2px 2px 2px 6px;
    }

    /* Bottom Label Layout */

    .highlight-container.highlight-container--bottom-labels .highlight.bottom {
      margin-top: 6px;
    }

    .highlight.bottom {
      display: block;
      white-space: normal;
    }

    .highlight.bottom .highlight__content:after {
      content: ' ';
      padding-right: 3px;
    }

    .highlight.bottom .highlight__label {
      line-height: 14px;
      padding-top: 1px;
    }

    /* Top Label Layout */

    .highlight.top {
      flex-direction: column;
      white-space: normal;
    }

    .highlight.top .highlight__label {
      min-height: 22px;
    }

    /* Interactions */

    .highlight.active,
    .highlight.active span {
      color: #fff;
    }

    .highlight.active .highlight:not(.active) span {
      color: #232323;
    }

    .highlight.clickable {
      cursor: pointer;
    }

    .highlight.clickable.clicking {
      opacity: 0.66;
      transition-duration: 0s;
    }

    .clicking .highlight,
    .clicking .highlight span,
    .clicking .highlight:before,
    .clicking .highlight:after {
      transition-duration: 0s;
    }

    /********************************************
          Colors
          ********************************************/

    /* Gray (Default) */

    .highlight.gray {
      background: #f2f4f6 !important;
    }

    .highlight.gray,
    .highlight-arrow--gray .highlight-arrow__triangle {
      border-color: #a0aab5 !important;
    }

    .highlight.gray .highlight__label,
    .highlight-arrow--gray .highlight-arrow__stalk,
    .highlight.gray .highlight__button .highlight__button__body {
      background-color: #a0aab5 !important;
    }

    .highlight.gray.active {
      background: #a0aab5 !important;
    }

    .highlight.gray.active .highlight__label {
      background-color: #aab3bd !important;
    }

    .highlight.gray .highlight__button svg {
      fill: #a0aab5 !important;
    }

    /********************************************/

    /* Blue */

    .highlight.blue {
      background: #edf4fa !important;
    }

    .highlight.blue,
    .highlight-arrow--blue .highlight-arrow__triangle {
      border-color: #4db1f7 !important;
    }

    .highlight.blue > .highlight__label,
    .highlight-arrow--blue .highlight-arrow__stalk,
    .highlight.blue .highlight__button .highlight__button__body {
      background-color: #4db1f7 !important;
    }

    .highlight.blue.active {
      background: #4db1f7 !important;
    }

    .highlight.blue.active > .highlight__label {
      background-color: #5fb9f8;
    }

    .highlight.blue .highlight__button svg {
      fill: #4db1f7 !important;
    }

    /********************************************/

    /* Green */

    .highlight.green {
      background: #f1f4f1 !important;
    }

    .highlight.green,
    .highlight-arrow--green .highlight-arrow__triangle {
      border-color: #90ac4e !important;
    }

    .highlight.green > .highlight__label,
    .highlight-arrow--green .highlight-arrow__stalk,
    .highlight.green .highlight__button .highlight__button__body {
      background-color: #90ac4e !important;
    }

    .highlight.green.active {
      background: #90ac4e !important;
    }

    .highlight.green.active > .highlight__label {
      background-color: #9bb460 !important;
    }

    .highlight.green .highlight__button svg {
      fill: #90ac4e !important;
    }

    /********************************************/

    /* Pink */

    .highlight.pink {
      background: #f4f1f4 !important;
    }

    .highlight.pink,
    .highlight-arrow--pink .highlight-arrow__triangle {
      border-color: #ce6587 !important;
    }

    .highlight.pink > .highlight__label,
    .highlight-arrow--pink .highlight-arrow__stalk,
    .highlight.pink .highlight__button .highlight__button__body {
      background-color: #ce6587 !important;
    }

    .highlight.pink.active {
      background: #ce6587 !important;
    }

    .highlight.pink.active > .highlight__label {
      background-color: #d37593 !important;
    }

    .highlight.pink .highlight__button svg {
      fill: #ce6587 !important;
    }

    /********************************************/

    /* Orange */

    .highlight.orange {
      background: #f2f4f4 !important;
    }

    .highlight.orange,
    .highlight-arrow--orange .highlight-arrow__triangle {
      border-color: #dd9e3e !important;
    }

    .highlight.orange > .highlight__label,
    .highlight-arrow--orange .highlight-arrow__stalk,
    .highlight.orange .highlight__button .highlight__button__body {
      background-color: #dd9e3e !important;
    }

    .highlight.orange.active {
      background: #dd9e3e !important;
    }

    .highlight.orange.active > .highlight__label {
      background-color: #e0a852 !important;
    }

    .highlight.orange .highlight__button svg {
      fill: #dd9e3e !important;
    }

    /********************************************/

    /* Purple */

    .highlight.purple {
      background: #f1f0f7 !important;
    }

    .highlight.purple,
    .highlight-arrow--purple .highlight-arrow__triangle {
      border-color: #9a5eba !important;
    }

    .highlight.purple > .highlight__label,
    .highlight-arrow--purple .highlight-arrow__stalk,
    .highlight.purple .highlight__button .highlight__button__body {
      background-color: #9a5eba !important;
    }

    .highlight.purple.active {
      background: #9a5eba !important;
    }

    .highlight.purple.active > .highlight__label {
      background-color: #a46ec1 !important;
    }

    .highlight.purple .highlight__button svg {
      fill: #9a5eba !important;
    }

    /********************************************/

    /* Teal */

    .highlight.teal {
      background: #eef4f6 !important;
    }

    .highlight.teal,
    .highlight-arrow--teal .highlight-arrow__triangle {
      border-color: #5bb1ad !important;
    }

    .highlight.teal > .highlight__label,
    .highlight-arrow--teal .highlight-arrow__stalk,
    .highlight.teal .highlight__button .highlight__button__body {
      background-color: #5bb1ad !important;
    }

    .highlight.teal.active {
      background: #5bb1ad !important;
    }

    .highlight.teal.active > .highlight__label {
      background-color: #6cb9b5 !important;
    }

    .highlight.teal .highlight__button svg {
      fill: #5bb1ad !important;
    }

    /********************************************/

    /* Tan */

    .highlight.tan {
      background: #f2f4f4 !important;
    }

    .highlight.tan,
    .highlight-arrow--tan .highlight-arrow__triangle {
      border-color: #b0a481 !important;
    }

    .highlight.tan > .highlight__label,
    .highlight-arrow--tan .highlight-arrow__stalk,
    .highlight.tan .highlight__button .highlight__button__body {
      background-color: #b0a481 !important;
    }

    .highlight.tan.active {
      background: #b0a481 !important;
    }

    .highlight.tan.active > .highlight__label {
      background-color: #b8ad8e !important;
    }

    .highlight.tan .highlight__button svg {
      fill: #b0a481 !important;
    }

    /********************************************/

    /* Red */

    .highlight.red {
      background: #f5eef0 !important;
    }

    .highlight.red,
    .highlight-arrow--red .highlight-arrow__triangle {
      border-color: #df3838 !important;
    }

    .highlight.red > .highlight__label,
    .highlight-arrow--red .highlight-arrow__stalk,
    .highlight.red .highlight__button .highlight__button__body {
      background-color: #df3838 !important;
    }

    .highlight.red.active {
      background: #df3838 !important;
    }

    .highlight.red.active > .highlight__label {
      background-color: #e24c4c !important;
    }

    .highlight.red .highlight__button svg {
      fill: #df3838 !important;
    }

    /********************************************/

    /* Cobalt */

    .highlight.cobalt {
      background: #eef0f5 !important;
    }

    .highlight.cobalt,
    .highlight-arrow--cobalt .highlight-arrow__triangle {
      border-color: #5f5b97 !important;
    }

    .highlight.cobalt > .highlight__label,
    .highlight-arrow--cobalt .highlight-arrow__stalk,
    .highlight.cobalt .highlight__button .highlight__button__body {
      background-color: #5f5b97 !important;
    }

    .highlight.cobalt.active {
      background: #5f5b97 !important;
    }

    .highlight.cobalt.active > .highlight__label {
      background-color: #6f6ca2 !important;
    }

    .highlight.cobalt .highlight__button svg {
      fill: #5f5b97 !important;
    }

    /********************************************/

    /* Brown */

    .highlight.brown {
      background: #f2f4f6 !important;
    }

    .highlight.brown,
    .highlight-arrow--brown .highlight-arrow__triangle {
      border-color: #6a4e3d !important;
    }

    .highlight.brown > .highlight__label,
    .highlight-arrow--brown .highlight-arrow__stalk,
    .highlight.brown .highlight__button .highlight__button__body {
      background-color: #6a4e3d !important;
    }

    .highlight.brown.active {
      background: #6a4e3d !important;
    }

    .highlight.brown.active > .highlight__label {
      background-color: #796051 !important;
    }

    .highlight.brown .highlight__button svg {
      fill: #6a4e3d !important;
    }

    /********************************************/

    /* Slate */

    .highlight.slate {
      background: #eceff1 !important;
    }

    .highlight.slate,
    .highlight-arrow--slate .highlight-arrow__triangle {
      border-color: #3b4247 !important;
    }

    .highlight.slate > .highlight__label,
    .highlight-arrow--slate .highlight-arrow__stalk,
    .highlight.slate .highlight__button .highlight__button__body {
      background-color: #3b4247 !important;
    }

    .highlight.slate.active {
      background: #3b4247 !important;
    }

    .highlight.slate.active > .highlight__label {
      background-color: #4f555a !important;
    }

    .highlight.slate .highlight__button svg {
      fill: #3b4247 !important;
    }

    /********************************************/

    /* Fuchsia */

    .highlight.fuchsia {
      background: #f5f1f9 !important;
    }

    .highlight.fuchsia,
    .highlight-arrow--fuchsia .highlight-arrow__triangle {
      border-color: #e875e8 !important;
    }

    .highlight.fuchsia > .highlight__label,
    .highlight-arrow--fuchsia .highlight-arrow__stalk,
    .highlight.fuchsia .highlight__button .highlight__button__body {
      background-color: #e875e8 !important;
    }

    .highlight.fuchsia.active {
      background: #e875e8 !important;
    }

    .highlight.fuchsia.active > .highlight__label {
      background-color: #ea83ea !important;
    }

    .highlight.fuchsia .highlight__button svg {
      fill: #e875e8 !important;
    }

    /********************************************
          Tooltip
          ********************************************/

    .highlight__tooltip {
      display: block;
      position: absolute;
      box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
      border-radius: 6px;
      background: rgba(70, 70, 70, 0.9);
      padding: 4px 9px 5px 9px;
      opacity: 0;
      z-index: -9;
      left: 50%;
      top: 100%;
      margin-top: 10px;
      font-size: 14px;
      color: #fff;
      transform: translate(-50%, -6px);
      transition: opacity 0.2s ease, z-index 0.2s ease, transform 0.2s ease 0.3s;
      font-weight: bold;
      white-space: nowrap;
      user-select: none;
      cursor: default;
    }

    .highlight__tooltip:before {
      display: block;
      position: absolute;
      left: 50%;
      top: 0;
      margin-top: -6px;
      margin-left: -6px;
      content: '';
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 6px 6px 6px;
      border-color: transparent transparent rgba(70, 70, 70, 0.9) transparent;
    }

    .highlight:hover .highlight__tooltip {
      z-index: 9;
      opacity: 1;
      transform: translate(-50%, 0);
      transition-delay: 0s;
    }

    .highlight__tooltip:hover {
      z-index: -9 !important;
    }
  }

  .content-coreference-resolution.not-show-all {
    .highlight {
      box-shadow: unset;
      pointer-events: none;
      .highlight__label {
        /*display: none;*/
        opacity: 0;
      }
    }
    /* Gray (Default) */
    .highlight.gray {
      background: transparent !important;
    }

    .highlight.gray,
    .highlight-arrow--gray .highlight-arrow__triangle {
      border-color: transparent !important;
    }

    .highlight.gray .highlight__label,
    .highlight-arrow--gray .highlight-arrow__stalk,
    .highlight.gray .highlight__button .highlight__button__body {
      background-color: transparent !important;
    }

    .highlight.gray.active {
      background: transparent !important;
    }

    .highlight.gray.active .highlight__label {
      background-color: transparent !important;
    }

    .highlight.gray .highlight__button svg {
      fill: transparent !important;
    }

    /********************************************/

    /* Blue */

    .highlight.blue {
      background: transparent !important;
    }

    .highlight.blue,
    .highlight-arrow--blue .highlight-arrow__triangle {
      border-color: transparent !important;
    }

    .highlight.blue > .highlight__label,
    .highlight-arrow--blue .highlight-arrow__stalk,
    .highlight.blue .highlight__button .highlight__button__body {
      background-color: transparent !important;
    }

    .highlight.blue.active {
      background: transparent !important;
    }

    .highlight.blue.active > .highlight__label {
      background-color: transparent;
    }

    .highlight.blue .highlight__button svg {
      fill: transparent !important;
    }

    /********************************************/

    /* Green */

    .highlight.green {
      background: transparent !important;
    }

    .highlight.green,
    .highlight-arrow--green .highlight-arrow__triangle {
      border-color: transparent !important;
    }

    .highlight.green > .highlight__label,
    .highlight-arrow--green .highlight-arrow__stalk,
    .highlight.green .highlight__button .highlight__button__body {
      background-color: transparent !important;
    }

    .highlight.green.active {
      background: transparent !important;
    }

    .highlight.green.active > .highlight__label {
      background-color: transparent !important;
    }

    .highlight.green .highlight__button svg {
      fill: transparent !important;
    }

    /********************************************/

    /* Pink */

    .highlight.pink {
      background: transparent !important;
    }

    .highlight.pink,
    .highlight-arrow--pink .highlight-arrow__triangle {
      border-color: transparent !important;
    }

    .highlight.pink > .highlight__label,
    .highlight-arrow--pink .highlight-arrow__stalk,
    .highlight.pink .highlight__button .highlight__button__body {
      background-color: transparent !important;
    }

    .highlight.pink.active {
      background: transparent !important;
    }

    .highlight.pink.active > .highlight__label {
      background-color: transparent !important;
    }

    .highlight.pink .highlight__button svg {
      fill: transparent !important;
    }

    /********************************************/

    /* Orange */

    .highlight.orange {
      background: transparent !important;
    }

    .highlight.orange,
    .highlight-arrow--orange .highlight-arrow__triangle {
      border-color: transparent !important;
    }

    .highlight.orange > .highlight__label,
    .highlight-arrow--orange .highlight-arrow__stalk,
    .highlight.orange .highlight__button .highlight__button__body {
      background-color: transparent !important;
    }

    .highlight.orange.active {
      background: transparent !important;
    }

    .highlight.orange.active > .highlight__label {
      background-color: transparent !important;
    }

    .highlight.orange .highlight__button svg {
      fill: transparent !important;
    }

    /********************************************/

    /* Purple */

    .highlight.purple {
      background: transparent !important;
    }

    .highlight.purple,
    .highlight-arrow--purple .highlight-arrow__triangle {
      border-color: transparent !important;
    }

    .highlight.purple > .highlight__label,
    .highlight-arrow--purple .highlight-arrow__stalk,
    .highlight.purple .highlight__button .highlight__button__body {
      background-color: transparent !important;
    }

    .highlight.purple.active {
      background: transparent !important;
    }

    .highlight.purple.active > .highlight__label {
      background-color: transparent !important;
    }

    .highlight.purple .highlight__button svg {
      fill: transparent !important;
    }

    /********************************************/

    /* Teal */

    .highlight.teal {
      background: transparent !important;
    }

    .highlight.teal,
    .highlight-arrow--teal .highlight-arrow__triangle {
      border-color: transparent !important;
    }

    .highlight.teal > .highlight__label,
    .highlight-arrow--teal .highlight-arrow__stalk,
    .highlight.teal .highlight__button .highlight__button__body {
      background-color: transparent !important;
    }

    .highlight.teal.active {
      background: transparent !important;
    }

    .highlight.teal.active > .highlight__label {
      background-color: transparent !important;
    }

    .highlight.teal .highlight__button svg {
      fill: transparent !important;
    }

    /********************************************/

    /* Tan */

    .highlight.tan {
      background: transparent !important;
    }

    .highlight.tan,
    .highlight-arrow--tan .highlight-arrow__triangle {
      border-color: transparent !important;
    }

    .highlight.tan > .highlight__label,
    .highlight-arrow--tan .highlight-arrow__stalk,
    .highlight.tan .highlight__button .highlight__button__body {
      background-color: transparent !important;
    }

    .highlight.tan.active {
      background: transparent !important;
    }

    .highlight.tan.active > .highlight__label {
      background-color: transparent !important;
    }

    .highlight.tan .highlight__button svg {
      fill: transparent !important;
    }

    /********************************************/

    /* Red */

    .highlight.red {
      background: transparent !important;
    }

    .highlight.red,
    .highlight-arrow--red .highlight-arrow__triangle {
      border-color: transparent !important;
    }

    .highlight.red > .highlight__label,
    .highlight-arrow--red .highlight-arrow__stalk,
    .highlight.red .highlight__button .highlight__button__body {
      background-color: transparent !important;
    }

    .highlight.red.active {
      background: transparent !important;
    }

    .highlight.red.active > .highlight__label {
      background-color: transparent !important;
    }

    .highlight.red .highlight__button svg {
      fill: transparent !important;
    }

    /********************************************/

    /* Cobalt */

    .highlight.cobalt {
      background: transparent !important;
    }

    .highlight.cobalt,
    .highlight-arrow--cobalt .highlight-arrow__triangle {
      border-color: transparent !important;
    }

    .highlight.cobalt > .highlight__label,
    .highlight-arrow--cobalt .highlight-arrow__stalk,
    .highlight.cobalt .highlight__button .highlight__button__body {
      background-color: transparent !important;
    }

    .highlight.cobalt.active {
      background: transparent !important;
    }

    .highlight.cobalt.active > .highlight__label {
      background-color: transparent !important;
    }

    .highlight.cobalt .highlight__button svg {
      fill: transparent !important;
    }

    /********************************************/

    /* Brown */

    .highlight.brown {
      background: transparent !important;
    }

    .highlight.brown,
    .highlight-arrow--brown .highlight-arrow__triangle {
      border-color: transparent !important;
    }

    .highlight.brown > .highlight__label,
    .highlight-arrow--brown .highlight-arrow__stalk,
    .highlight.brown .highlight__button .highlight__button__body {
      background-color: transparent !important;
    }

    .highlight.brown.active {
      background: transparent !important;
    }

    .highlight.brown.active > .highlight__label {
      background-color: transparent !important;
    }

    .highlight.brown .highlight__button svg {
      fill: transparent !important;
    }

    /********************************************/

    /* Slate */

    .highlight.slate {
      background: transparent !important;
    }

    .highlight.slate,
    .highlight-arrow--slate .highlight-arrow__triangle {
      border-color: transparent !important;
    }

    .highlight.slate > .highlight__label,
    .highlight-arrow--slate .highlight-arrow__stalk,
    .highlight.slate .highlight__button .highlight__button__body {
      background-color: transparent !important;
    }

    .highlight.slate.active {
      background: transparent !important;
    }

    .highlight.slate.active > .highlight__label {
      background-color: transparent !important;
    }

    .highlight.slate .highlight__button svg {
      fill: transparent !important;
    }

    /********************************************/

    /* Fuchsia */

    .highlight.fuchsia {
      background: transparent !important;
    }

    .highlight.fuchsia,
    .highlight-arrow--fuchsia .highlight-arrow__triangle {
      border-color: transparent !important;
    }

    .highlight.fuchsia > .highlight__label,
    .highlight-arrow--fuchsia .highlight-arrow__stalk,
    .highlight.fuchsia .highlight__button .highlight__button__body {
      background-color: transparent !important;
    }

    .highlight.fuchsia.active {
      background: transparent !important;
    }

    .highlight.fuchsia.active > .highlight__label {
      background-color: transparent !important;
    }

    .highlight.fuchsia .highlight__button svg {
      fill: transparent !important;
    }
  }
  .theme--dark {
    .content-coreference-resolution.not-show-all {
      .highlight {
        color: #ffffff;
      }
    }
  }
}
</style>
