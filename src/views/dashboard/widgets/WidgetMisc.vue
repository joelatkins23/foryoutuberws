<template>
  <div class="dashboard-widget-container">
    <div class="dashboard-widget-header">
      <h5 class="dashboard-widget-title">Title</h5>
      <button class="dashboard-widget-config-button" @click="configButton">
        <img src="/img/dashboard/gear.svg" alt="" srcset="">
      </button>
    </div>
    <div class="dashboard-widget-body">
      <!-- <highcharts :options="chartOptions"></highcharts> -->
      <custom-progress percentage="90" width="50"></custom-progress>
    </div>
  </div>
</template>




<script>

  import CustomProgress from "./CustomProgress"

  // console.log(ProgressCircleB)

  export default {
    name: 'WidgetMisc',
    components: {
      'custom-progress': CustomProgress
    },
    data: function () {
      return {}
    },
    methods: {
      configButton: function(event) {
        this.$store.dispatch('toggleWidgetsWindow')
      }
    }
  }
</script>
