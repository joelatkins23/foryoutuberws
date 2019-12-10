<template>
  <div class="animated fadeIn dashboard-animated">
    <!-- <HeaderFilters/> -->
    <LayoutA v-if="getCurrentDashboardLayout === 1"/>
    <LayoutB v-if="getCurrentDashboardLayout === 2"/>
    <LayoutC v-if="getCurrentDashboardLayout === 3"/>
    <LayoutD v-if="getCurrentDashboardLayout === 4"/>

    <LayoutWindow ref="LayoutWindow"></LayoutWindow>
  </div>
</template>

<script>
import Vue from "vue";

import LayoutWindow from './dashboard/LayoutWindow'
import HeaderFilters from './dashboard/HeaderFilters'
import LayoutA from './dashboard/LayoutA'
import LayoutB from './dashboard/LayoutB'
import LayoutC from './dashboard/LayoutC'
import LayoutD from './dashboard/LayoutD'

export default {
  name: "dashboard",
  components: {
    LayoutWindow,
    LayoutA,
    LayoutB,
    LayoutC,
    LayoutD,
    HeaderFilters
  },
  mounted: function() {
    // Attach the class to the container
    document.getElementsByClassName('container-fluid')[0].classList.add("dashboard-container");

    // Bind the click event tothe dynamically added button
    setTimeout(() => {
      let buttonLayout = document.getElementsByClassName('layoutButtonEvent')
      if(buttonLayout.length > 0) {        
        buttonLayout[0].removeEventListener('click', this.layoutWindow, true)
        buttonLayout[0].addEventListener('click', this.layoutWindow, true)
      }
    }, 300)
  },
  beforeDestroy: function() {
    document.getElementsByClassName('container-fluid')[0].classList.remove("dashboard-container");
  },
  data: function() {
    return {
    }
  },
  computed: {
    getCurrentDashboardLayout() {
      return this.$store.getters.getCurrentDashboardLayout;
    },   
  },
  methods: {
    layoutWindow: function(e) {
      if(this.$refs.LayoutWindow !== undefined) {
        e.preventDefault()
        e.stopPropagation()
        this.$refs.LayoutWindow.toggleModal();
      }
    },
  }
};
</script>