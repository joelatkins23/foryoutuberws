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
    name: 'WidgetAddWidget',
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
    margin-bottom: 10px;
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
  }
  .dashboard-widget-addwidget-button:hover {
    background: rgba(128,128,128, 0.1);
  }
  .dashboard-widget-addwidget-button:active {
    background: rgba(128,128,128, 0.2);
  }
  .dashboard-column-2 .dashboard-widget-addwidget {
    margin-left: 1px;
  }
</style>