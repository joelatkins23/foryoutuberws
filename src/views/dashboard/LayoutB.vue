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
      <b-row class="dashboard-secondary-column">
        <b-col class="dashboard-column-2">
          <WidgetsManager column="2" layout="2" :windowWidth="window.width"/>
        </b-col>
      </b-row>
    </b-row>
  </div>
</template>

<script>
  import HeaderFilters from './HeaderFilters'
  import HeaderFilterSelected from './HeaderFilterSelected'
  import HeaderWidgetsManager from './HeaderWidgetsManager'
  import WidgetsManager from './WidgetsManager'
  import WidgetTable from './widgets/WidgetTable'


  export default {
    name: 'LayoutB',
    components: {
      HeaderFilterSelected,
      HeaderFilters,
      HeaderWidgetsManager,
      WidgetsManager,
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
      },
    }
  }
</script>

<style scoped>
  .dashboard-column-2 {
    max-width: 350px;
    margin-left: 5px;
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 0;
    max-height: 100%;
    overflow-y: overlay;
  } 
  .dashboard-secondary-column {
    display: flex;
  } 

  @media (max-width: 1024px) {
    .dashboard-column-2 {
        max-width: none;
        margin: 20px 0 0 0;
    }

    .dashboard-column-2 > div.ps {
        flex-direction: row;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }

    .dashboard-column-2 >>> div.dashboard-widget-container {
      flex: 0 48%;
      min-width: unset;
    }

    .dashboard-column-2 >>> div.dashboard-widget-container:nth-child(1),
    .dashboard-column-2 >>> div.dashboard-widget-container:nth-child(2) {
      margin-top: 0;
    }

    .dashboard-secondary-column {
      flex-direction: row;
      margin: 0;
    } 
  }

  @media (max-width: 768px) {

    .dashboard-column-2 >>> div.dashboard-widget-container {
      flex: 1;
      min-width: 100%t;
    }

    .dashboard-column-2 >>> div.dashboard-widget-container:nth-child(2) {
      margin-top: 10px;
    }

    .dashboard-secondary-column {
      flex-direction: row;
      margin: 0;
    } 

    .dashboard-column-2 > div.ps {
        flex-direction: column;
        flex-wrap: wrap;
        padding: 0;
    }

  }

  @media (min-width: 1024px) {
    .dashboard-main-column .dashboard-table-row-container .dashboard-table-container-fullwidth {
        max-width: 100%;
    }
  }
  
</style>

