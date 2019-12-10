<template>
  <b-col class="dashboard-table-container" flex>
    <perfect-scrollbar>
      <b-row class="dashboard-table-row-container-content" style="min-height: 350px; max-width: 100%; margin: 0 auto;">
        <b-col class="m-0 p-0">
          <WidgetAccountPerformanceOvertime />   
        </b-col>
      </b-row>
      <div class="dashboard-table-row-container-content-sep" style="min-height: 10px;"></div>
      <b-row class="dashboard-table-row-container-content" style="min-height: 350px; max-width: 100%; margin: 0 auto;">
        <b-col class="m-0 p-0">
          <WidgetDailyPL />   
        </b-col>
      </b-row>
      <div class="dashboard-table-row-container-content-sep" style="min-height: 10px;"></div>
      <b-row class="dashboard-table-row-container-content" style="min-height: 350px; max-width: 100%; margin: 0 auto;">
        <b-col class="m-0 p-0">
          <WidgetAccountPerformanceOvertime />   
        </b-col>
      </b-row>
    </perfect-scrollbar>
  </b-col>
</template>


<script>

  import WidgetAccountPerformanceOvertime from './widgets/WidgetAccountPerformanceOvertime'
  import WidgetDailyPL from './widgets/WidgetDailyPL'
  import { PerfectScrollbar } from 'vue2-perfect-scrollbar'

  export default {
    name: 'RightWidgetsManager',
    components: {
      PerfectScrollbar,
      WidgetAccountPerformanceOvertime,
      WidgetDailyPL
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
