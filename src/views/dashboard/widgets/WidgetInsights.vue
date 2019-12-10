<template>
  <div class="dashboard-widget-container">
    <div class="dashboard-widget-header">
      <h5 class="dashboard-widget-title">Insights</h5>
      <button class="dashboard-widget-config-button" @click="configButton">
        <img src="/img/dashboard/gear.svg" alt="" srcset="">
      </button>
    </div>
    <div class="dashboard-widget-body">
      <div class="insight-body">
        <span>{{message}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'WidgetInsights',
    data: function () {
      return {
        message: "60% of your trading profits comes from Tuesday"
      }
    },
    methods: {
      configButton: function(event) {
        this.$store.dispatch('toggleWidgetsWindow')
      }
    }
  }
</script>

<style scoped>
  div.dashboard-widget-body .insight-body {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
  }
  div.dashboard-widget-body .insight-body > span {
    font-size: 16px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.31;
    letter-spacing: normal;
    text-align: left;
    color: #00f6d1;
  }
</style>

