<template>
  <div class="dashboard-layout-container">
    <b-row style="margin: 0; margin-bottom: 8px;" v-show="window.width <= 990">
        <HeaderFilters></HeaderFilters>
    </b-row>
    <b-row>
      <b-col>
        <HeaderFilterSelected></HeaderFilterSelected>
      </b-col> 
    </b-row>
    <b-row class="dashboard-main-row">
      <b-col class="dashboard-main-column">
        <b-row class="dashboard-header-row-container">
          <HeaderWidgetsManager/>
        </b-row>
        <b-row class="dashboard-table-row-container">
          <b-col class="dashboard-table-container dashboard-table-container-fullwidth">
            <WidgetTable/>   
          </b-col> 
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import HeaderFilters from './HeaderFilters'
  import HeaderFilterSelected from './HeaderFilterSelected'
  import HeaderWidgetsManager from './HeaderWidgetsManager'
  import WidgetMisc from './widgets/WidgetMisc'
  import WidgetTable from './widgets/WidgetTable'

  export default {
    name: 'LayoutC',
    components: {
      HeaderFilterSelected,
      HeaderFilters,
      HeaderWidgetsManager,
      WidgetMisc,
      WidgetTable 
    },
    data: function () {
      return {
        window: {
          width: 0,
          height: 0
        }
      }
    },
    created: function() {
      window.addEventListener('resize', this.handleResize)
      this.handleResize()
    },
    destroyed: function() {
      window.removeEventListener('resize', this.handleResize)
    },
    methods: {
      handleResize: function() {
        this.window.width = window.innerWidth;
      }
    },
  }
</script>

<style src="vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css"/>

<style scoped>
  @media (min-width: 1024px) {
    .dashboard-main-column .dashboard-table-row-container .dashboard-table-container-fullwidth {
        max-width: 100%;
    }
  }
</style>
