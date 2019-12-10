<template>
  <div class="app">
    <AppHeader fixed>
      <SidebarToggler class="d-lg-none" display="md" mobile />
      <b-link class="navbar-brand" to="/">
        <img class="navbar-brand-full" src="img/ts-logo-large.png" width="auto" height="25" alt="TraderSync Logo">
        <img class="navbar-brand-minimized" src="img/ts-logo-small.png" width="auto" height="30" alt="TraderSync Logo">
      </b-link>
      <div class="header-filters-top-container" flex>
        <HeaderFilters></HeaderFilters>
      </div>
      <SidebarToggler class="d-md-down-none" display="lg" />
    </AppHeader>
    <div class="app-body">
      <AppSidebar fixed>
        <SidebarHeader/>
        <SidebarForm/>
        <SidebarNav :navItems="getNav"></SidebarNav>
        <SidebarFooter/>
        <SidebarMinimizer/>
      </AppSidebar>
      <main class="main">
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </main>
      <!-- <AppAside fixed>
        <DefaultAside/>
      </AppAside> -->
      <WidgetWindow v-if="getCurrentDashboardWidgetsWindow"></WidgetWindow>
      <PotPerGraphsWindow v-if="getCurrentDashboardPotPerGraphWindow"></PotPerGraphsWindow>
    </div>
  </div>
</template>

<script>
import nav from '@/_nav'
import { Header as AppHeader, SidebarToggler, Sidebar as AppSidebar, SidebarFooter, SidebarForm, SidebarHeader, SidebarMinimizer, SidebarNav, Aside as AppAside, AsideToggler } from '@coreui/vue'
import DefaultAside from './DefaultAside'
import WidgetWindow from '../views/dashboard/WidgetWindow'
import PotPerGraphsWindow from '../views/dashboard/PotPerGraphsWindow'
import HeaderFilters from '../views/dashboard/HeaderFilters'

export default {
  name: 'DefaultContainer',
  components: {
    AsideToggler,
    AppHeader,
    AppSidebar,
    AppAside,
    DefaultAside,
    SidebarForm,
    SidebarFooter,
    SidebarToggler,
    SidebarHeader,
    SidebarNav,
    SidebarMinimizer,
    WidgetWindow,
    PotPerGraphsWindow,
    HeaderFilters,
  },
  data () { 
    return {
      nav: nav.items
    }
  },
  mounted: function() {
    setTimeout(() => {
      let menuTweak = document.querySelector('.nav-item > ul > li.ts-menu-up-class').parentElement;
      menuTweak.style.bottom = '44px';
      menuTweak = document.querySelector('.nav-item > ul > li.ts-menu-up-class2').parentElement;
      menuTweak.style.bottom = '54px';
    }, 1000);
  },
  computed: {
    getNav() {
      let navItems = [...nav.items]
      if(this.$route.name == "Dashboard") {
        navItems.splice(5, 0, {
          name: 'Layout',
          url: '#/',
          icon: 'cui-layers',
          class: 'layoutButtonEvent'
        })
      }

      return navItems
    },
    name () {
      return this.$route.name
    },
    list () {
      return this.$route.matched.filter((route) => route.name || route.meta.label )
    },
    getCurrentDashboardWidgetsWindow() {
      return this.$store.getters.getWidgetsWindow;
    }, 
    getCurrentDashboardPotPerGraphWindow() {
      return this.$store.getters.getPotPerGraphWindow;
    }, 
  }
}
</script>
