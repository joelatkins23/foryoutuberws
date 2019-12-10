<template>
  <div class="dashboard-widget-container">
    <div class="dashboard-widget-header">
      <h5 class="dashboard-widget-title">{{widgetTitle}}</h5>
      <button class="dashboard-widget-config-button" @click="configButton">
        <img src="/img/dashboard/gear.svg" alt="" srcset="">
      </button>
    </div>
    <div class="dashboard-widget-body" v-if="isLoading">
      <WidgetLoader></WidgetLoader>
    </div>    
    <div class="dashboard-widget-body" v-if="!isLoading">
      <div class="h-block pr-3 pl-2 pt-3 pb-3">
        <div class="v-block">
          <div class="array-of-bars pt-3">
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
  import RadialProgressBar from 'vue-radial-progress'
  import WidgetLoader from './WidgetLoader'

  export default {
    name: 'WidgetMultipleA',
    components: {
      RadialProgressBar,
      WidgetLoader
    },
    props: ["componentName"],
    data: function () {
      return {
        isLoading: true,
        completedSteps: 0,
        totalSteps: 100,
        bars: [],
        widgetTitle: ""
      }
    },
    mounted: function() {
      setTimeout(()=>{
        this.isLoading = false;
      }, 2500)

      if(this.componentName == 'widget_setups') {
        this.widgetTitle = "Setups"
        let a = Math.random() * 10;
        let b = Math.random() * 10;
        let c = Math.random() * 10;
        let d = Math.random() * 10;
        let e = Math.random() * 10;
        let f = Math.random() * 10;
        let g = Math.random() * 10;
        let h = Math.random() * 10;
        this.bars = [
          {title: "Earnings Winner", value: 5, displayValue: "$45,700 (" + String(parseFloat(a*10).toFixed(2))+"%)", max: 10, variant: 'green'},
          {title: "Contract Winner", value: 6, displayValue: "$45,700 (" + String(parseFloat(b*10).toFixed(2))+"%)", max: 10, variant: 'green'},
          {title: "Broke Resistant", value: 3, displayValue: "-$21,079 (" + String(parseFloat(c*10).toFixed(2))+"%)", max: 10, variant: 'red'},
          {title: "52 High", value: 4, displayValue: "$45,700 (" + String(parseFloat(d*10).toFixed(2))+"%)", max: 10, variant: 'green'},
          {title: "Earnings Winner", value: 2, displayValue: "$45,700 (" + String(parseFloat(e*10).toFixed(2))+"%)", max: 10, variant: 'red'},
          {title: "Contract Winner", value: 8, displayValue: "-$21,079 (" + String(parseFloat(f*10).toFixed(2))+"%)", max: 10, variant: 'green'},
          {title: "Broke Resistant", value: 3, displayValue: "$45,700 (" + String(parseFloat(g*10).toFixed(2))+"%)", max: 10, variant: 'red'},
          {title: "Gama Scalp", value: 8, displayValue: "-$21,079 (" + String(parseFloat(h*10).toFixed(2))+"%)", max: 10, variant: 'green'},
        ]
      } else if(this.componentName == 'widget_hourly') {
        this.widgetTitle = "Hourly"
        let a = Math.random() * 10;
        let b = Math.random() * 10;
        let c = Math.random() * 10;
        let d = Math.random() * 10;
        let e = Math.random() * 10;
        let f = Math.random() * 10;
        let g = Math.random() * 10;
        let h = Math.random() * 10;
        this.bars = [
          {title: "8-9", value: a, displayValue: String(parseFloat(a*10).toFixed(2))+"%", max: 10, variant: 'green'},
          {title: "9-10", value: b, displayValue: String(parseFloat(b*10).toFixed(2))+"%", max: 10, variant: 'green'},
          {title: "10-11", value: c, displayValue: String(parseFloat(c*10).toFixed(2))+"%", max: 10, variant: 'red'},
          {title: "11-12", value: d, displayValue: String(parseFloat(d*10).toFixed(2))+"%", max: 10, variant: 'green'},
          {title: "12-13", value: e, displayValue: String(parseFloat(e*10).toFixed(2))+"%", max: 10, variant: 'red'},
          {title: "14-15", value: f, displayValue: String(parseFloat(f*10).toFixed(2))+"%", max: 10, variant: 'green'},
          {title: "16-17", value: g, displayValue: String(parseFloat(g*10).toFixed(2))+"%", max: 10, variant: 'red'},
          {title: "18-19", value: h, displayValue: String(parseFloat(h*10).toFixed(2))+"%", max: 10, variant: 'green'},
        ]
      } else if(this.componentName == 'widget_weekly') {
        this.widgetTitle = "Weekly"
        this.bars = [
          {title: "10-11", value: 3, displayValue: "44%", max: 10, variant: 'red'},
          {title: "11-12", value: 4, displayValue: "25%", max: 10, variant: 'green'},
          {title: "12-13", value: 2, displayValue: "73%", max: 10, variant: 'red'},
          {title: "14-15", value: 8, displayValue: "45%", max: 10, variant: 'green'},
          {title: "16-17", value: 3, displayValue: "44%", max: 10, variant: 'red'},
          {title: "18-19", value: 8, displayValue: "36%", max: 10, variant: 'green'},
        ]
      } else if(this.componentName == 'widget_monthly') {
        this.widgetTitle = "Monthly"
        this.bars = [
          {title: "8-9", value: 5, displayValue: "75%", max: 10, variant: 'green'},
          {title: "9-10", value: 6, displayValue: "45%", max: 10, variant: 'green'},
          {title: "10-11", value: 3, displayValue: "44%", max: 10, variant: 'red'},
          {title: "16-17", value: 3, displayValue: "44%", max: 10, variant: 'red'},
          {title: "18-19", value: 8, displayValue: "36%", max: 10, variant: 'green'},
        ]
      } else if(this.componentName == 'widget_pricing') {
        this.widgetTitle = "Pricing"
        this.bars = [
          {title: "8-9", value: 5, displayValue: "75%", max: 10, variant: 'green'},
          {title: "9-10", value: 6, displayValue: "45%", max: 10, variant: 'green'},
          {title: "10-11", value: 3, displayValue: "44%", max: 10, variant: 'red'},
          {title: "16-17", value: 3, displayValue: "44%", max: 10, variant: 'red'},
          {title: "18-19", value: 8, displayValue: "36%", max: 10, variant: 'green'},
        ]
      } else if(this.componentName == 'widget_mistakes') {
        this.widgetTitle = "Mistakes"
        this.bars = [
          {title: "8-9", value: 5, displayValue: "75%", max: 10, variant: 'green'},
          {title: "9-10", value: 6, displayValue: "45%", max: 10, variant: 'green'},
          {title: "10-11", value: 3, displayValue: "44%", max: 10, variant: 'red'},
          {title: "16-17", value: 3, displayValue: "44%", max: 10, variant: 'red'},
          {title: "18-19", value: 8, displayValue: "36%", max: 10, variant: 'green'},
        ]
      } else if(this.componentName == 'widget_volume') {
        this.widgetTitle = "Volume"
        this.bars = [
          {title: "8-9", value: 5, displayValue: "75%", max: 10, variant: 'green'},
          {title: "9-10", value: 6, displayValue: "45%", max: 10, variant: 'green'},
          {title: "10-11", value: 3, displayValue: "44%", max: 10, variant: 'red'},
          {title: "16-17", value: 3, displayValue: "44%", max: 10, variant: 'red'},
          {title: "18-19", value: 8, displayValue: "36%", max: 10, variant: 'green'},
        ]
      } else if(this.componentName == 'widget_market') {
        this.widgetTitle = "Market"
        this.bars = [
          {title: "8-9", value: 5, displayValue: "75%", max: 10, variant: 'green'},
          {title: "9-10", value: 6, displayValue: "45%", max: 10, variant: 'green'},
          {title: "10-11", value: 3, displayValue: "44%", max: 10, variant: 'red'},
          {title: "16-17", value: 3, displayValue: "44%", max: 10, variant: 'red'},
          {title: "18-19", value: 8, displayValue: "36%", max: 10, variant: 'green'},
        ]
      }
    },
    methods: {
      configButton: function(event) {
        this.$store.dispatch('toggleWidgetsWindow')
      }
    }
  }
</script>


<style>
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
  }

  .dashed-row-sep {
    width: 100%;
    border-bottom: 1px dashed #353943;
  }

  .array-of-bars {
    display: flex;
    flex: 1;
    flex-direction: column;
    width: 100%;
    padding: 0 15px 0 10px;
  }

  .array-of-bars .progress {
    background-color: #353943;
  }

  .array-of-bars .progress .progress-bar {
    background-color: unset;
  }

  .array-of-bars .green-variant .progress-bar {
        background-image: linear-gradient(to right, #1cbb85, #0e5e43);
  }

  .array-of-bars .red-variant .progress-bar {
        background-image: linear-gradient(to right, #fd6c8f, #fd6c8f);
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
