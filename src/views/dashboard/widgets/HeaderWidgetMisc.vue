<template>
  <div class="dashboard-header-widget-container">
    <div class="dashboard-header-widget-body">
      <button class="dashboard-header-widget-config-button" @click="configButton">
        <img src="/img/dashboard/gear.svg" alt="" srcset="">
      </button>
      <div class="dashboard-header-widget-header">
        <h5 class="dashboard-header-widget-title">{{title}}</h5>
        <div class="dashboard-header-widget-stats">
          <div class="dashboard-header-widget-stats-value">
            <span>{{value}}</span>
          </div>
          <div class="dashboard-header-widget-stats-arrow" :class="[!isGoingUp ? 'down' : '']">
            {{arrowValue}}
            <i class="fa" :class="[isGoingUp ? 'fa-caret-up' : 'fa-caret-down']"></i>
          </div>
        </div>
      </div>
      <div v-if="!graphCircular" class="dashboard-header-widget-graph">
        <canvas :id="'myChart'+componentKey" style="height: 30px; width: auto;"></canvas>
      </div>
      <div v-if="graphCircular" class="dashboard-header-widget-graph-circular">
        <custom-progress :percentage="circularPercentage" :variant="variant" width="44" hideNumbers="true" doubleThickness="true"></custom-progress>
      </div>
    </div>
  </div>
</template>

<script>
  import Chart from 'chart.js';
  import CustomProgress from "./CustomProgress"

  export default {
    name: 'WidgetMisc',
    components: {'custom-progress': CustomProgress},
    props: ['componentName', 'componentKey'],
    data: function () {
      return {
        title: "",
        value: 0,
        arrowValue: "22%",
        isGoingUp: true,
        graphCircular: false,
        variant: 'red',
        circularPercentage: '22'
      }
    },
    watch: { 
      	componentName: function(newVal, oldVal) { // watch it
          this.widgetConfig()
        }
    },
    mounted: function() {
      this.widgetConfig()
    },
    methods: {
      configButton: function(event) {
        this.$store.dispatch('toggleWidgetsWindow')
      },
      widgetConfig: function() {
        if(this.componentName == 'widget_accu_return') {
        this.title = "ACCUMULATIVE RETURN $";
        this.value = "$27,885.00"
      } else if(this.componentName == 'widget_wins_ratio') {
        this.title = "WINS RATIO";
        this.value = 8;
        this.isGoingUp = false;
        this.graphCircular = true
      } else if(this.componentName == 'widget_avg_return') {
        this.title = "AVERAGE RETURN";
        this.value = "$2,531.36"
        this.arrowValue = "34%"
      } else {
        this.title = "OTHER";
        this.graphCircular = true
        this.isGoingUp = true;
        this.variant = 'green';
        this.circularPercentage = "80"
        this.arrowValue = "80%"
      }

      if(!this.graphCircular) {
        var ctx = document.getElementById('myChart'+this.componentKey).getContext("2d");
        var gradientStroke = ctx.createLinearGradient(0, 0, 0, 60);
        gradientStroke.addColorStop(0, 'rgba(0, 100, 255, 0.5)');
        gradientStroke.addColorStop(1, 'rgba(0, 100, 255, 0)');
  
        var myChart = new Chart(ctx, {
            type: 'line',
            backgroundColor: "#F5DEB3",
            data: {
                labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL"],
                datasets: [{
                    label: "Data",
                    borderColor:  "#0064ff",
                    pointRadius: 0,
                    fill: true,
                    backgroundColor: gradientStroke,
                    borderWidth: 2,
                    data: [100*Math.random(), 120*Math.random(), 150*Math.random(), 170*Math.random(), 180*Math.random(), 170*Math.random(), 160*Math.random()]
                }]
            },
            options: {
                legend: {
                  display: false,
                },
                responsive: true,
                maintainAspectRatio: false,
                elements: {
                  line: {
                    tension: 0
                  }
                },
                scales: {
                    yAxes: [{
                      display: false,
                      ticks: {
                          beginAtZero: true,
                          maxTicksLimit: 5,
                          padding: 20
                      },
                      gridLines: {
                          drawTicks: false,
                          display: false
                      }
                    }],
                    xAxes: [{
                      display: false,
                      gridLines: {
                          zeroLineColor: "transparent"
                      },
                      ticks: {
                          padding: 20,
                      }
                    }]
                }
            }
        });
      }
      }
    }
  }
</script>
