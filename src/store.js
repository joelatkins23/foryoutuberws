import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentDashboardLayout: 1,
    currentDashboardWidgets: [
      {name: "widget_management", column: 1},
      {name: "widget_setups", column: 1},
      {name: "widget_hourly", column: 2},
      {name: "widget_weekly", column: 2},
      {name: "widget_monthly", column: 1},
      {name: "widget_pricing", column: 1},
      {name: "widget_mistakes", column: 2},
      {name: "widget_volume", column: 2},
      {name: "widget_market", column: 2},
      {name: "widget_insights", column: 2},
      {name: "widget_account", column: 1},
      {name: "widget_potential", column: 1},
      {name: "widget_advisor", column: 1},
    ],
    currentDashboardHeaderWidgets: [
      {name: "widget_accu_return", active: true},
      {name: "widget_wins_ratio", active: true},
      {name: "widget_avg_return", active: true},
      {name: "widget_d", active: true},
    ],
    potPerGraphs: [
      { percentage: 45, title: "JUN", variant: 'green', active: true },
      { percentage: 85, title: "TUES", variant: 'green', active: true },
      { percentage: 45, title: "LONG", variant: 'red', active: true },
      { percentage: 85, title: "SHORT", variant: 'green', active: true },
      { percentage: 30, title: "TIME", variant: 'red', active: true },
    ],
    toggleWidgetsWindow: false,
    togglePotPerGraphsWindow: false,
    filterSelectionSymbols: [],
    filterSelectionSetups: [],
    filterSelectionSides: [],
    filterSelectionMistakes: [],
    filterSelectionStatuses: [],
    filterSelectionDate: {},
  },
  getters: {
      getCurrentDashboardLayout(state) {
        return state.currentDashboardLayout
      },
      getCurrentDashboardWidgetsColumnA(state) {
        return state.currentDashboardWidgets.filter(o => o.column == 1)
      },
      getCurrentDashboardWidgetsColumnB(state) {
        return state.currentDashboardWidgets.filter(o => o.column == 2)
      },
      getCurrentDashboardWidgets(state) {
        return state.currentDashboardWidgets
      },
      getCurrentDashboardHeaderWidgets(state) {
        return state.currentDashboardHeaderWidgets.filter(o => o.active == true)
      },
      getCurrentPotPerGraphs(state) {
        return state.potPerGraphs.filter(o => o.active == true)
      },
      getAllPotPerGraphs(state) {
        return state.potPerGraphs
      },
      getCurrentDashboardAllHeaderWidgets(state) {
        return state.currentDashboardHeaderWidgets
      },
      getWidgetsWindow(state) {
        return state.toggleWidgetsWindow
      },
      getPotPerGraphWindow(state) {
        return state.togglePotPerGraphsWindow
      },
      getFilterSelectionSymbols(state) {
        return state.filterSelectionSymbols
      },
      getFilterSelectionSetups(state) {
        return state.filterSelectionSetups
      },
      getFilterSelectionSides(state) {
        return state.filterSelectionSides
      },
      getFilterSelectionMistakes(state) {
        return state.filterSelectionMistakes
      },
      getFilterSelectionStatuses(state) {
        return state.filterSelectionStatuses
      },
      getFilterSelectionDate(state) {
        return state.filterSelectionDate
      },
  },
  mutations: {
    setCurrentDashboardLayout: (state, newValue) => {
      state.currentDashboardLayout = newValue
    },
    setCurrentDashboardWidgets: (state, newValue) => {
      state.currentDashboardWidgets = newValue
    },
    setCurrentDashboardHeaderWidgets: (state, newValue) => {
      state.currentDashboardHeaderWidgets = newValue
    },
    setCurrentPotPerGraphs: (state, newValue) => {
      state.potPerGraphs = newValue
    },
    toggleWidgetsWindow: (state) => {
      state.toggleWidgetsWindow = !state.toggleWidgetsWindow
    },
    togglePotPerGraphsWindow: (state) => {
      state.togglePotPerGraphsWindow = !state.togglePotPerGraphsWindow
    },
    setFilterSelectionSymbols: (state, newValue) => {
      state.filterSelectionSymbols = newValue
    },
    setFilterSelectionSetups: (state, newValue) => {
      state.filterSelectionSetups = newValue
    },
    setFilterSelectionSides: (state, newValue) => {
      state.filterSelectionSides = newValue
    },
    setFilterSelectionMistakes: (state, newValue) => {
      state.filterSelectionMistakes = newValue
    },
    setFilterSelectionStatuses: (state, newValue) => {
      state.filterSelectionStatuses = newValue
    },
    setFilterSelectionDate: (state, newValue) => {
      state.filterSelectionDate = newValue
    },
  },
  actions: {
    setCurrentDashboardLayout: ({commit, state}, newValue) => {
      commit('setCurrentDashboardLayout', newValue)
      return state.currentDashboardLayout
    },
    setCurrentDashboardWidgets: ({commit, state}, newValue) => {
      commit('setCurrentDashboardWidgets', newValue)
      return state.currentDashboardWidgets
    },
    setCurrentDashboardHeaderWidgets: ({commit, state}, newValue) => {
      commit('setCurrentDashboardHeaderWidgets', newValue)
      return state.currentDashboardHeaderWidgets
    },
    setCurrentPotPerGraphs: ({commit, state}, newValue) => {
      commit('setCurrentPotPerGraphs', newValue)
      return state.potPerGraphs
    },
    toggleWidgetsWindow: ({commit, state}, newValue) => {
      commit('toggleWidgetsWindow', newValue)
      return state.toggleWidgetsWindow
    },    
    togglePotPerGraphsWindow: ({commit, state}, newValue) => {
      commit('togglePotPerGraphsWindow', newValue)
      return state.togglePotPerGraphsWindow
    },
    setFilterSelectionSymbols: ({commit, state}, newValue) => {
      commit('setFilterSelectionSymbols', newValue)
      return state.filterSelectionSymbols
    },
    setFilterSelectionSetups: ({commit, state}, newValue) => {
      commit('setFilterSelectionSetups', newValue)
      return state.filterSelectionSetups
    },
    setFilterSelectionSides: ({commit, state}, newValue) => {
      commit('setFilterSelectionSides', newValue)
      return state.filterSelectionSides
    },
    setFilterSelectionMistakes: ({commit, state}, newValue) => {
      commit('setFilterSelectionMistakes', newValue)
      return state.filterSelectionMistakes
    },
    setFilterSelectionStatuses: ({commit, state}, newValue) => {
      commit('setFilterSelectionStatuses', newValue)
      return state.filterSelectionStatuses
    },
    setFilterSelectionDate: ({commit, state}, newValue) => {
      commit('setFilterSelectionDate', newValue)
      return state.filterSelectionDate
    },
  }
});
