<template>
  <div class="dashboard-widget-container">
    <div class="dashboard-widget-header">
      <h5 class="dashboard-widget-title">Potential Performance</h5>
      <b-dropdown variant="link" size="lg" no-caret right>
        <template slot="button-content"><img src="/img/dashboard/gear.svg" width="13px" height="13px" alt="" srcset=""></template>

        <b-dropdown-item href="#" @click="configButton">Manage Widgets</b-dropdown-item>
        <b-dropdown-item href="#" @click="configGraphs">Customize Columns</b-dropdown-item>
      </b-dropdown>
    </div>
    <div class="dashboard-widget-body" v-if="isLoading">
      <WidgetLoader></WidgetLoader>
    </div>    
    <div class="dashboard-widget-body" v-if="!isLoading">
      <div class="h-block pt-2 pb-3">
        <div class="v-block">
          <span style="font-size: 14px; color: #999eab; width: 60%;">Potential Performance</span>
        </div>
        <div class="v-block" style="height: 60px; overflow: hidden;">
          <custom-half-progress :percentage="50" :variant="'red'" width="120"></custom-half-progress>
        </div>
      </div>
      <div class="h-block pr-3 pl-2" v-if="miniGraphs.length > 0">
        <div class="v-block">
          <div class="dashed-row-sep"></div>
          <div class="h-block pr-3 pl-2 w-100 pb-3 pt-3">
              <div class="v-block" v-for="(graph, key) in miniGraphs" :key="key">
                <span style="color: #999eab; font-size: 11px; padding-bottom: 7px;">{{graph.title}}</span>
                <custom-progress :percentage="graph.percentage" :variant="graph.variant" width="41"></custom-progress>
              </div>
          </div>
        </div>
      </div>
      <div class="h-block pr-3 pl-2">
        <div class="v-block">
          <div class="dashed-row-sep"></div>
          <div class="array-of-bars pt-3 pb-3">
            <div v-for="(bar, key) in bars" :key="key" class="array-of-bars-item-container pb-2">
              <div class="array-of-bars-item-header">
                <h5 class="title">{{bar.title}}</h5>
                <h6 class="current-max-value">{{bar.displayValue}}</h6>
              </div>  
              <b-progress :max="bar.max" height="7px" :value="bar.value" class="mb-1" :class="[bar.variant == 'red' ? 'red-variant' : 'green-variant']"></b-progress>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import CustomProgress from "./CustomProgress"
  import CustomHalfProgress from "./CustomHalfProgress"
  import WidgetLoader from './WidgetLoader'

  export default {
    name: 'WidgetPotentialPerformance',
    components: {
      'custom-progress': CustomProgress,
      'custom-half-progress': CustomHalfProgress,
      WidgetLoader
    },
    data: function () {
      return {
        isLoading: true,
        miniGraphs: [],
        bars: [
          {title: "Earnings Winner", value: 5, displayValue: "$45,700 (75%)", max: 10, variant: 'green'},
          {title: "Contract Winner", value: 6, displayValue: "$45,700 (75%)", max: 10, variant: 'green'},
          {title: "Broke Resistant", value: 3, displayValue: "-$21,079 (06%)", max: 10, variant: 'red'},
          {title: "52 High", value: 4, displayValue: "$45,700 (75%)", max: 10, variant: 'green'},
        ]
      }
    },
    mounted: function() {
      this.configWidgetsColumn()
      this.$store.watch((state, getters) => getters.getCurrentPotPerGraphs, n => {
        this.configWidgetsColumn()
      })
      setTimeout(()=>{
        this.isLoading = false;
      }, 1000)
    },
    destroyed: function() {

    },
    methods: {
      configWidgetsColumn: function() {
        this.miniGraphs = this.$store.getters.getCurrentPotPerGraphs      
      },
      configButton: function(event) {
        this.$store.dispatch('toggleWidgetsWindow')
      },
      configGraphs: function(event) {
        this.$store.dispatch('togglePotPerGraphsWindow')
      }
    }
  }
</script>


<style scoped>
  /* Quick workaround */
  .radial-progress-container > svg > circle {
    stroke-linecap: square;
  }

  .increase-profits-group {
    margin: 0;
    color: #00f6d1;
  }

  .increase-profits-sign {
    margin: 0;
    font-size: 17px;
  }

  .increase-profits-value {
    margin: 0;
    font-size: 22px;
  }

  .increase-profits-percentage {
    margin: 0;
    font-size: 13px;
  }

  .h-block {
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .v-block {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .dashed-row-sep {
    width: 100%;
    border-bottom: 1px dashed #353943;
  }

  .dashboard-widget-container >>> .array-of-bars {
    display: flex;
    flex: 1;
    flex-direction: column;
    width: 100%;
    padding: 0 15px 0 10px;
  }

  .dashboard-widget-container >>> .array-of-bars .progress {
    background-color: #353943;
  }

  .dashboard-widget-container >>> .array-of-bars div.green-variant .progress-bar {
        background-image: linear-gradient(to right, #1cbb85, #0e5e43);
        background-color: unset;
  }

  .dashboard-widget-container >>> .array-of-bars .red-variant .progress-bar {
        background-image: linear-gradient(to right, #fd6c8f, #fd6c8f);
        background-color: unset;
  }

  .array-of-bars-item-container .array-of-bars-item-header { 
    display: flex;
    flex-direction: row;
    /* align-items: center; */
    justify-content: space-between;
    height: 1.2rem;
  }
  .array-of-bars-item-container .title {
    font-size: 11px;
    color: #999eab;
    margin: 0;
  }
  .array-of-bars-item-container .current-max-value {
    font-size: 11px;
    color: #999eab;
    margin: 0;
  }
</style>
