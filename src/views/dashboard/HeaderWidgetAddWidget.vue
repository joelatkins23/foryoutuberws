<template>
  <div class="dashboard-widget-container dashboard-widget-addwidget">
    <div class="dashboard-widget-body dashboard-widget-addwidget-body">
      <button class="dashboard-widget-addwidget-button" @click="configButton">
        Add Widget
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HeaderWidgetAddWidget',
    data: function () {
      return {

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
  .dashboard-widget-addwidget {
    background-color: transparent;
    border: 1px dashed #515661;
    display: flex;
    min-height: 70px;
    height: 1px;
    margin: auto 0px;
    flex: 0 24%;
  }
  .dashboard-widget-addwidget-body {
    display: flex;
    flex: 1;
  }
  .dashboard-widget-addwidget-button {
    flex: 1;
    background: transparent;
    border: none;
    color: #515661;
    font-size: 12px;
  }
  .dashboard-widget-addwidget-button:hover {
    background: rgba(128,128,128, 0.1);
  }
  .dashboard-widget-addwidget-button:active {
    background: rgba(128,128,128, 0.2);
  }
  

  @media (max-width: 1024px) {
    .dashboard-widget-addwidget {
      max-width: none;
      flex: 0 49.5%;
      margin-top: 5px;
    }
    @media (max-width: 768px) {
      .dashboard-widget-addwidget {
        flex: 0 100%;
      }
    }
  }
</style>