<template>
  <div class="dashboard-header-sub-container">
    <component v-for="(value, key) in headerWidgetList" :key="key" :is="getWidgetComponent(value.name)" :componentName="value.name" :componentKey="key"/> 
    <div style="display: hidden;" v-if="computeWidgets"></div>
  </div>
</template>

<script>
  import HeaderWidgetAddWidget from './HeaderWidgetAddWidget'
  import WidgetMisc from './widgets/HeaderWidgetMisc'
  import WidgetMisc2 from './WidgetMisc2'

  export default {
    name: 'HeaderWidgetsManager',
    components: {
      HeaderWidgetAddWidget,
      WidgetMisc,
      WidgetMisc2
    },
    props: ['column', 'windowWidth', 'layout'],
    data: function () {
      return {
        breakpoint: 0,
        headerWidgetList: [],
        widgetComponentList: [
          {name: "widget_accu_return", component: WidgetMisc},
          {name: "widget_wins_ratio", component: WidgetMisc},
          {name: "widget_avg_return", component: WidgetMisc},
          {name: "widget_d", component: WidgetMisc},
        ],
      }
    },
    mounted: function() {
      this.configWidgetsHeader()

      this.$store.watch((state, getters) => getters.getCurrentDashboardHeaderWidgets, n => {
        this.configWidgetsHeader()
      })
    },
    computed: {
      computeWidgets: function() {
        this.configWidgetsHeader()
        return true
      }
    },
    methods: { 
      configWidgetsHeader: function() {
          this.headerWidgetList = this.$store.getters.getCurrentDashboardHeaderWidgets;
  
          for (let index = this.headerWidgetList.length; index < 4; index++) {
            this.headerWidgetList.push(HeaderWidgetAddWidget)
          }    
      },
      getWidgetComponent: function(widget) {
        let index = this.widgetComponentList.map(o => o.name).indexOf(widget)
        if(index > -1) {
          // return {template: `<b-col class="dashboard-header-widget-container">            
          //   <h5>Header widget ${index+1}</h5>
          // </b-col>`}
          return this.widgetComponentList[index].component
        } 

        return HeaderWidgetAddWidget;
        
      },
    }
  }
</script>
