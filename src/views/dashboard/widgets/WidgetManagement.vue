<template>
  <div class="dashboard-widget-container">
    <div class="dashboard-widget-header">
      <h5 class="dashboard-widget-title">Management</h5>
      <button class="dashboard-widget-config-button" @click="configButton">
        <img src="/img/dashboard/gear.svg" alt="" srcset="">
      </button>
    </div>
    <div class="dashboard-widget-body" v-if="isLoading">
      <WidgetLoader></WidgetLoader>
    </div>    
    <div class="dashboard-widget-body" v-if="!isLoading">
      <div class="h-block pt-3 pb-4">
        <div class="v-block">
          <span style="font-size: 14px; color: #999eab; width: 60%;">Increase Your Profits By</span>
        </div>
        <div class="v-block">
          <radial-progress-bar :diameter="100"
                       :completed-steps="completedSteps"
                       :animateSpeed="500"
                       :strokeWidth="8"
                       :startColor="'#00f6d1'"
                       :stopColor="'#245b53'"
                       :total-steps="totalSteps">
              <radial-progress-bar :diameter="84"
                          :completed-steps="completedSteps+1"
                          :animateSpeed="500"
                          :strokeWidth="4"
                          :startColor="'#0d5449'"
                          :stopColor="'#2bb6c6'"
                          :total-steps="totalSteps">
                <p class="increase-profits-group">
                  <span class="increase-profits-sign">+</span>
                  <span class="increase-profits-value">{{completedSteps}}</span>
                  <span class="increase-profits-percentage">%</span>
                </p>
              </radial-progress-bar>
          </radial-progress-bar>
        </div>
      </div>
      <div class="h-block pr-3 pl-2">
        <div class="v-block">
          <div class="dashed-row-sep"></div>
          <div class="array-of-bars pt-3 pb-3">
            <div v-for="(bar, key) in bars" :key="key" class="array-of-bars-item-container pb-2">
              <div class="array-of-bars-item-header">
                <h5 class="title">{{bar.title}}</h5>
                <h6 class="current-max-value">{{bar.value}}/{{bar.max}}</h6>
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
    name: 'WidgetManagement',
    components: {
      RadialProgressBar,
      WidgetLoader
    },
    data: function () {
      return {
        isLoading: true,
        completedSteps: 0,
        totalSteps: 100,
        bars: [
          {title: "Avoid trading biotech", value: 5, max: 10, variant: 'green'},
          {title: "Avoid did't cut losses quickly", value: 6, max: 10, variant: 'green'},
          {title: "Avoid chasing", value: 3, max: 10, variant: 'red'},
          {title: "4th Bar", value: 4, max: 10, variant: 'green'},
          {title: "Avoid price range: $12 - $33", value: 2, max: 10, variant: 'red'},
          {title: "6th Bar", value: 8, max: 10, variant: 'green'},
        ]
      }
    },
    mounted: function() {
      setTimeout(()=>{
        this.isLoading = false;
        setTimeout(()=>{
          this.completedSteps = 90;
          setTimeout(()=>{
            this.completedSteps = 70;
            setTimeout(()=>{
              this.completedSteps = 80;
            }, 1000)
          }, 1000)
        }, 500)
      }, 3000)
    },
    methods: {
      configButton: function(event) {
        this.$store.dispatch('toggleWidgetsWindow')
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
