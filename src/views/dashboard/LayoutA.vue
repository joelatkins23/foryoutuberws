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
          <b-col class="dashboard-table-container">
            <WidgetTable/>
          </b-col> 
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
  import WidgetsManager from './WidgetsManager'
  import WidgetTable from './widgets/WidgetTable'

  export default {
    name: 'LayoutA',
    components: {
      HeaderFilterSelected,
      HeaderFilters,
      WidgetsManager,
      HeaderWidgetsManager,
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