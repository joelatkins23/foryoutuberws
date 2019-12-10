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
          <RightWidgetsManager></RightWidgetsManager>
          <b-col class="dashboard-column-1 dashboard-column-1-tweaks">
            <WidgetsManager column="1" layout="1" :windowWidth="window.width"/>
          </b-col>
        </b-row>
      </b-col>
      <b-row class="dashboard-secondary-column">
        <b-col class="dashboard-column-1">
          <WidgetsManager column="1" layout="1" :windowWidth="window.width"/>
        </b-col>
        <b-col class="dashboard-column-sep"></b-col>
        <b-col class="dashboard-column-2">
          <WidgetsManager column="2" layout="1" :windowWidth="window.width"/>
        </b-col>
      </b-row>
    </b-row>
  </div>
</template>



<script>
  import HeaderFilters from './HeaderFilters'
  import HeaderFilterSelected from './HeaderFilterSelected'
  import HeaderWidgetsManager from './HeaderWidgetsManager'
  import RightWidgetsManager from './RightWidgetsManager'
  import WidgetsManager from './WidgetsManager'

  import WidgetMisc from './widgets/WidgetMisc'

  export default {
    name: 'LayoutD',
    components: {
      HeaderFilterSelected,
      HeaderFilters,
      HeaderWidgetsManager,
      WidgetsManager,
      WidgetMisc,
      RightWidgetsManager
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
  .dashboard-main-column .dashboard-table-row-container .dashboard-table-container {
    display: flex;
    flex-direction: column;
    background-color: transparent;
  }
  .dashboard-table-row-container-content {
    display: flex;
    flex: 1;
    background-color: #161d29;
    margin: 0;
  }
  .dashboard-table-row-container-content-sep {
    width: 100%;
    height: 10px;
  }
  .dashboard-table-row-container-content > div {
    margin: 0;
    padding: 0;
    display: flex;
  }
</style>
