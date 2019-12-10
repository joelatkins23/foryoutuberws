<template>
  <div class="dashboard-widget-container" style="max-height: 100%; min-height:300px; height: 350px; margin: 0 auto; position: relative;">
    <div class="dashboard-widget-header">
      <h5 class="dashboard-widget-title">Daily P/L</h5>
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
    name: 'WidgetDailyPL',
    components: {
      'custom-progress': CustomProgress,
      highcharts: Chart, 
      WidgetLoader
    },
    data: function () {
      let calculatedData = []
      for (let indexA = 0; indexA < 144; indexA++) {
        calculatedData.push(Math.random() * 9000)
      }
      return {
        isLoading: true,
        chartOptions: {
            chart: {
                type: 'column',
                height: 300,
                width: null,
                style: {
                    fontFamily: 'Roboto',
                    fontWeight: '300',
                },
                marginLeft: 0,
                spacingLeft: 0,
                styledMode: true
            },
            title: {
              text: undefined
            },
            xAxis: {
              visible: false,
              // min: 0.5,
              // max: 36.5,
              endOnTick: false,
              startOnTick: false,
              maxPadding: 0,
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
            defs: {
                oddColGradiend: {
                    tagName: 'linearGradient',
                    id: 'odd-col-gradient',
                    x1: 0, y1: 0,
                    x2: 0, y2: 1,
                        children: [
                        { tagName: 'stop', offset: 0 },
                        { tagName: 'stop', offset: 1 }
                    ]
                },
                evenColGradiend: {
                    tagName: 'linearGradient',
                    id: 'even-col-gradient',
                    x1: 0, y1: 0,
                    x2: 0, y2: 1,
                    children: [
                        { tagName: 'stop', offset: 0 },
                        { tagName: 'stop', offset: 1 }
                    ]
                },
                areaGradiend: {
                    tagName: 'linearGradient',
                    id: 'area-gradient',
                    x1: 0, y1: 0,
                    x2: 0, y2: 1,
                    children: [
                        { tagName: 'stop', offset: 0 },
                        { tagName: 'stop', offset: 1 }
                    ]
                }
            },
            series: [{
                name: 'Tokyo',
                data: calculatedData,
                shadow: true,
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
