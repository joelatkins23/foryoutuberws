<template>
  <perfect-scrollbar>
    <WidgetAddWidget v-if="widgetList.length == 0"/>
    <component v-for="(value, key) in widgetList" :key="key" :is="getWidgetComponent(value.name)" :componentName="value.name"/>
    <div style="display: hidden;" v-if="computeWidgets"></div>
  </perfect-scrollbar>
</template>

<script>

  import WidgetAddWidget from './WidgetAddWidget'
  import WidgetManagement from './widgets/WidgetManagement'
  import WidgetMultipleA from './widgets/WidgetMultipleA'
  import WidgetInsights from './widgets/WidgetInsights'
  import WidgetAccountPerformance from './widgets/WidgetAccountPerformance'
  import WidgetPotentialPerformance from './widgets/WidgetPotentialPerformance'
  import WidgetAdvisor from './widgets/WidgetAdvisor'

  export default {
    name: 'WidgetsManager',
    components: {
      WidgetAddWidget,
      WidgetManagement,
      WidgetMultipleA,
      WidgetInsights,
      WidgetAdvisor
    },
    props: ['column', 'windowWidth', 'layout'],
    data: function () {
      return {
        breakpoint: 0,
        widgetList: [],
        widgetComponentList: [
          {name: "widget_management", component: WidgetManagement},
          {name: "widget_setups", component: WidgetMultipleA},
          {name: "widget_hourly", component: WidgetMultipleA},
          {name: "widget_weekly", component: WidgetMultipleA},
          {name: "widget_monthly", component: WidgetMultipleA},
          {name: "widget_pricing", component: WidgetMultipleA},
          {name: "widget_mistakes", component: WidgetMultipleA},
          {name: "widget_volume", component: WidgetMultipleA},
          {name: "widget_market", component: WidgetMultipleA},
          {name: "widget_insights", component: WidgetInsights},
          {name: "widget_account", component: WidgetAccountPerformance},
          {name: "widget_potential", component: WidgetPotentialPerformance},
          {name: "widget_advisor", component: WidgetAdvisor},
        ],
      }
    },
    computed: {
      computeWidgets: function() {
        let oldBreakpoint = this.breakpoint
        this.breakpoint = this.windowWidth > 1700 ? 3 : (this.windowWidth > 1024 ? 2 : (this.windowWidth > 768 ? 1 : 0))
        if(oldBreakpoint != this.breakpoint) {
          oldBreakpoint = this.breakpoint
          this.configWidgetsColumn()
        }
        return true
      }
    },
    mounted: function() {
      this.breakpoint = this.windowWidth > 1700 ? 3 : (this.windowWidth > 1024 ? 2 : (this.windowWidth > 768 ? 1 : 0))
      this.configWidgetsColumn()

      this.$store.watch((state, getters) => getters.getCurrentDashboardWidgets, n => {
        this.configWidgetsColumn()
      })
    },
    methods: {
      configWidgetsColumn: function() {
        if(this.layout == 1) { 
          if(this.column == 1) {
            if(this.breakpoint == 0 || this.breakpoint == 2) {
              let widgetListA = this.$store.getters.getCurrentDashboardWidgetsColumnA;
              let widgetListB = this.$store.getters.getCurrentDashboardWidgetsColumnB;
              this.widgetList = widgetListA.concat(widgetListB)
            } else if(this.breakpoint == 1 || this.breakpoint == 3) {
              this.widgetList = this.$store.getters.getCurrentDashboardWidgetsColumnA;
            }
          } else if (this.column == 2) {
            this.widgetList = this.$store.getters.getCurrentDashboardWidgetsColumnB;
          }      
        } else if(this.layout == 2) { 
          if(this.column == 2) {
              let widgetListA = this.$store.getters.getCurrentDashboardWidgetsColumnA;
              let widgetListB = this.$store.getters.getCurrentDashboardWidgetsColumnB;
              this.widgetList = widgetListA.concat(widgetListB)
          }      
        }
        
      },
      getWidgetComponent: function(widget) {
        
        let index = this.widgetComponentList.map(o => o.name).indexOf(widget)
        if(index > -1) {
          return this.widgetComponentList[index].component
        } 

        return {template: `<div></div>`}
      },
    }
  }
</script>
