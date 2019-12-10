<template>
  <div class="dashboard-widget-container">
    <div class="dashboard-widget-header">
      <h5 class="dashboard-widget-title">Zuzku Advisor</h5>
      <button class="dashboard-widget-config-button" @click="configButton">
        <img src="/img/dashboard/gear.svg" alt="" srcset="">
      </button>
    </div>
    <div class="dashboard-widget-body">
      <div class="dashboard-widget-body" v-if="isLoading">
        <WidgetLoader></WidgetLoader>
      </div>    
      <div class="dashboard-widget-body" v-if="!isLoading">
        <div class="h-block pr-3 pl-2 pt-2 pb-2">
          <div class="v-block">
            <div class="array-of-bars pt-3">
              <span class="advisor-body-title">TraserSync Coach will show you trading patterns to avoid to possible decrease your losses. For the coach feature to activate and start making suggestions you must complete the steps below</span>
              <div class="dashed-row-sep pb-3"></div>
              <div class="advisor-column-options-container">
                <b-form-group>
                  <b-form-checkbox 
                    v-for="(item, key) in advisorOptions" 
                    :key="key" v-model="optionsSelected[key]"
                    class="pb-3" 
                    :class="[checkIfDisabled(key) ? 'advise-done' : '']" 
                    :value="item.value">{{item.text}}</b-form-checkbox>
                </b-form-group>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>




<script>
  import WidgetLoader from './WidgetLoader'

  export default {
    name: 'WidgetAdvisor',
    components: {
      WidgetLoader
    },
    data: function () {
      return {
        isLoading: true,
        advisorOptions: [ 
          {text: "Create five setups", value: 1}, 
          {text: "Optimize trade planner", value: 2}, 
          {text: "Import 50 trades from your broker", value: 3}, 
          {text: "Import 50 trades from your broker", value: 4}, 
          {text: "Add mistakes to twenty losing trades", value: 5}, 
          {text: 'Add setups to tewenty trades ', value: 6}, 
        ],
        optionsSelected: [1, 2, 3, false, false, false],
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
      },
      checkIfDisabled(key) {
        return this.optionsSelected[key] != false
      },
    }
  }
</script>


<style>
  .advisor-body-title {
      font-size: 10px;
      color: #999eab;
  }
  .dashed-row-sep {
    width: 100%;
    border-bottom: 1px dashed #353943;
  }
  .advisor-column-options-container {
      display: flex;
      flex: 1;
      min-width: unset;
      flex-wrap: wrap;
      min-height: 140px;
      margin: 15px 0 0 0;
      justify-content: space-between;
  }
  .advisor-column-options-container fieldset {
    width: 100%;
    margin: 0;
  }
  .advisor-column-options-container fieldset > div {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }
  .advisor-column-options-container fieldset > div div.custom-control {
    flex: 1;
    margin: 0;
    padding: 0;
    padding-left: 24px;
  }
  .advisor-column-options-container fieldset > div div.custom-control .custom-control-label {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 80%;
    font-size: 13px;
    font-weight: 300;
    white-space: nowrap;
    color: #00f6d1;
    cursor: pointer;
  }
  .advisor-column-options-container fieldset > div .custom-control-input:checked ~ .custom-control-label::before {
      border-color: #00a893;
      background-color: #00ceb2;
  }
  .advisor-column-options-container fieldset > div div.custom-control .custom-control-label::before {
      top: 0.25625rem;
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 0.15rem;
  }
  .advisor-column-options-container fieldset > div div.custom-control .custom-control-label::after {
      top: 0.25625rem;
      width: 0.8rem;
      height: 0.8rem;
      background-size: 70% 70%;
  }

  .advisor-column-options-container fieldset > div div.custom-control.advise-done .custom-control-label {
    text-decoration: line-through;
    color: #a6b2cf;
  }
</style>
