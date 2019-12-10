<template>
  <b-row style="margin: 0;">
    <b-alert v-for="(symbol, key) in symbols" :key="'symbol'+key" class="mr-1 main-alerts shadow" show fade>
        {{symbol}}
        <b-button @click="removeSymbolClick($event, symbol)"><i class="fa fa-close"></i></b-button>
    </b-alert>
    <b-alert v-for="(setup, key) in setups" :key="'setup'+key" class="mr-1 main-alerts filter-setups shadow" show fade>
        {{setup}}
        <b-button @click="removeSetupClick($event, setup)"><i class="fa fa-close"></i></b-button>
    </b-alert>
    <b-alert v-for="(side, key) in sides" :key="'side'+key" class="mr-1 main-alerts filter-sides shadow" show fade>
        {{side}}
        <b-button @click="removeSideClick($event, side)"><i class="fa fa-close"></i></b-button>
    </b-alert>
    <b-alert v-for="(mistake, key) in mistakes" :key="'mistake'+key" class="mr-1 main-alerts filter-mistakes shadow" show fade>
        {{mistake}}
        <b-button @click="removeMistakeClick($event, mistake)"><i class="fa fa-close"></i></b-button>
    </b-alert>
    <b-alert v-for="(status, key) in statuses" :key="'status'+key" class="mr-1 main-alerts filter-statuses shadow" show fade>
        {{status}}
        <b-button @click="removeStatusClick($event, status)"><i class="fa fa-close"></i></b-button>
    </b-alert>
    <b-alert v-if="dates.start" class="mr-1 main-alerts filter-dates shadow" show fade>
        {{getDateString(dates.start)}} {{(dates.end) ? "-" : ""}} {{getDateString(dates.end)}}
        <b-button @click="removeDatesClick($event)"><i class="fa fa-close"></i></b-button>
    </b-alert>
  </b-row>
</template>

<script>
  import fecha from 'fecha'
  export default {
    name: 'HeaderFilterSelected',
    data: function () {
      return {}
    },
    methods: {
      getDateString: function (date, format = 'DD MMM YYYY') {
        if (!date) {
          return null
        }
        const dateparse = new Date(Date.parse(date))
        return fecha.format(new Date(Date.UTC(dateparse.getFullYear(), dateparse.getMonth(), dateparse.getDate())), format)
      },
      removeSymbolClick: function(e, symbolName) {
        let newSelection = this.symbols.filter(o => o != symbolName)
        this.$store.dispatch('setFilterSelectionSymbols', newSelection)
      },
      removeSetupClick: function(e, setupName) {
        let newSelection = this.setups.filter(o => o != setupName)
        this.$store.dispatch('setFilterSelectionSetups', newSelection)
      },
      removeSideClick: function(e, sideName) {
        let newSelection = this.sides.filter(o => o != sideName)
        this.$store.dispatch('setFilterSelectionSides', newSelection)
      },
      removeMistakeClick: function(e, mistakeName) {
        let newSelection = this.mistakes.filter(o => o != mistakeName)
        this.$store.dispatch('setFilterSelectionMistakes', newSelection)
      },
      removeStatusClick: function(e, statusName) {
        let newSelection = this.statuses.filter(o => o != statusName)
        this.$store.dispatch('setFilterSelectionStatuses', newSelection)
      },
      removeDatesClick: function(e) {
        this.$store.dispatch('setFilterSelectionDate', {})
      },
    },
    computed: {
      symbols: function() {
        return this.$store.getters.getFilterSelectionSymbols
      },
      setups: function() {
        return this.$store.getters.getFilterSelectionSetups
      },
      sides: function() {
        return this.$store.getters.getFilterSelectionSides
      },
      mistakes: function() {
        return this.$store.getters.getFilterSelectionMistakes
      },
      statuses: function() {
        return this.$store.getters.getFilterSelectionStatuses
      },
      dates: function() {
        return this.$store.getters.getFilterSelectionDate
      },
    }
  }
</script>


