<!--
/**
 * @fileoverview ProgressBar component
 * @license MIT
 * @author Rafal Pospiech <neuronet.io@gmail.com>
 * @package GanttElastic
 */
-->
<template>
  <g
    class="gantt-elastic__chart-row-progress-bar-wrapper"
    :style="root.style('chart-row-progress-bar-wrapper', task.style['chart-row-progress-bar-wrapper'])"
  >
    <defs>
      <pattern
        id="diagonalHatch"
        :width="$store.state.GanttElastic.options.chart.progress.width"
        :height="$store.state.GanttElastic.options.chart.progress.width"
        patternTransform="rotate(45 0 0)"
        patternUnits="userSpaceOnUse"
      >
        <line
          class="chart-row-progress-bar-line"
          :style="root.style('chart-row-progress-bar-line', task.style['chart-row-progress-bar-line'])"
          x1="0"
          y1="0"
          x2="0"
          :y2="$store.state.GanttElastic.options.chart.progress.width"
        />
      </pattern>
    </defs>
    <rect
      v-if="$store.state.GanttElastic.options.chart.progress.bar"
      class="gantt-elastic__chart-row-progress-bar-solid"
      :style="root.style('chart-row-progress-bar-solid', task.style['chart-row-progress-bar-solid'])"
      x="0"
      y="0"
      :width="getProgressWidth"
    ></rect>
    <g v-if="$store.state.GanttElastic.options.chart.progress.pattern">
      <rect
        class="gantt-elastic__chart-row-progress-bar-pattern"
        :style="root.style('chart-row-progress-bar-pattern', task.style['chart-row-progress-bar-pattern'])"
        :x="getProgressWidth"
        y="0"
        :width="((100 - task.progress) || 0) + '%'"
        height="100%"
      ></rect>
      <path
        class="gantt-elastic__chart-row-progress-bar-outline"
        :style="
          root.style('chart-row-progress-bar-outline', task.style['base'], task.style['chart-row-progress-bar-outline'])
        "
        :d="getLinePoints"
      ></path>
    </g>
  </g>
</template>

<script>
export default {
  name: 'ProgressBar',
  inject: ['root'],
  props: ['task'],
  data() {
    return {};
  },

  computed: {
    /**
     * Get progress width
     *
     * @returns {string}
     */
    getProgressWidth() {
      return (this.task.progress || 0) + "%";
    },

    /**
     * Get line points
     *
     * @returns {string}
     */
    getLinePoints() {
      const start = (this.task.width / 100) * this.task.progress;
      return `M ${start || 0} 0 L ${start || 0} ${this.task.height}`;
    },

    /**
     * Get solid style
     *
     * @returns {object}
     */
    getSolidStyle() {
      return Object.assign(
        {},
        this.$store.state.GanttElastic.options.chart.progress.styles.bar.solid,
        this.task.progressBarStyle.bar
      );
    },

    /**
     * Get line style
     *
     * @returns {object}
     */
    getLineStyle() {
      return Object.assign(
        {},
        {
          stroke: this.$store.state.GanttElastic.options.row.styles.bar.stroke + 'a0',
          'stroke-width': this.$store.state.GanttElastic.options.row.styles.bar['stroke-width'] / 2
        },
        this.task.style
      );
    }
  }
};
</script>
