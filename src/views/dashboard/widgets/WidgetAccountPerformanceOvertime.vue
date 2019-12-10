<template>
  <div class="dashboard-widget-container" style="max-height: 100%; min-height:300px; height: 350px; margin: 0 auto; position: relative;">
    <div class="dashboard-widget-header">
      <h5 class="dashboard-widget-title">Account Performance Overtime</h5>
      <button class="dashboard-widget-config-button" @click="configButton">
        <img src="/img/dashboard/gear.svg" alt="" srcset="">
      </button>
    </div>
    <div class="dashboard-widget-body" v-if="isLoading">
      <WidgetLoader></WidgetLoader>
    </div>    
    <div class="dashboard-widget-body" v-if="!isLoading">
      <div class="h-block pr-3 pl-2">
        <div class="v-block" style="max-width: 100%;">
          <div class="pt-3 pb-3" style="flex: 1; max-width: 100%; min-width: 100%; max-height: 100%, height: 300px; margin: 0 auto; position: relative;">
            <highcharts :options="chartOptions"></highcharts>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import CustomProgress from "./CustomProgress"
  import WidgetLoader from './WidgetLoader'
  import {Chart} from 'highcharts-vue'

  export default {
    name: 'WidgetAccountPerformanceOvertime',
    components: {
      'custom-progress': CustomProgress,
      highcharts: Chart, 
      WidgetLoader
    },
    data: function () {
      return {
        isLoading: true,
        chartOptions: {
            chart: {
                type: 'line',
                height: 300,
                width: null,
                style: {
                    fontFamily: 'Roboto',
                    fontWeight: '300',
                },
                marginLeft: 0,
                spacingLeft: 0
            },
            title: {
              text: undefined
            },
            xAxis: {
              visible: false,
              min: 0.5,
              max: 7.5,
              endOnTick: false,
              startOnTick: false,
              maxPadding: 0,
              categories: ['A', 'B', 'C', 'D', 'E', 'F', 'G']
            },
            yAxis: {
              tickInterval: 800,
              opposite: true,
              gridLineColor: "#616265",
              title: {
                  text: undefined
              },
              labels: {
                style: {
                    fontSize: '8px',
                    fontWeight: '300',
                    fontFamily: 'Roboto',
                  }
              }
            },
            tooltip: {
              style: {
                color: "#fff"
              }
            },
            legend: { enabled: false },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: false 
                    },
                    enableMouseTracking: true
                },
                series: {
                    stickyTracking: false,
                    pointPadding: 0,
                    groupPadding: 0,   
                }
            },
            series: [{
                name: 'Tokyo',
                data: [ 2600.5, 2100.5, 1800, 9.500, 700, 1100.5, 1400.5, 2100.5, 2300.3],
                shadow: true,
                color: '#1cbb85'
            }, {
                name: 'London',
                data: [400.2, 500.7, 800.5, 1100.9, 1500.2, 1700.0, 1400.2, 1000.3, 600.6],
                dashStyle: 'dot',
                color: '#1cbb85'
            }]
        },
      }
    },
    mounted: function() {
      setTimeout(()=>{
        this.isLoading = false;
      }, 1000)
    },
    methods: {
      configButton: function(event) {
        this.$store.dispatch('toggleWidgetsWindow')
      }
    }
  }
</script>


<style scoped>
  div >>> svg.highcharts-root g.highcharts-axis-labels {
    fill: #fff;
    stroke: #fff;
    opacity: 0.8;
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

  .mini-graphs {

  }  

  .mini-graphs .title {
    color: #999eab; 
    font-size: 11px; 
  }  

  .mini-graphs .value {
    color: #a6b2cf;
    font-size: 22px;
  }  

  .mini-graphs .sub-value {
    font-size: 11px;
    color: #00d3b8;
    display: flex;
  }  

  .mini-graphs .sub-value > i {
    font-size: 23px;
    margin-right: 3px;
    line-height: 13px;
  }  

  .mini-graphs .sub-value.down {
    color: #fe4a93;
  }  
  .mini-graphs .sub-value.down > i {
    color: #fd6c8f;
  }  
</style>
