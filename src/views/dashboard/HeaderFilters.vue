<template>
  <div class="header-filter-container" :class="[subHeader ? 'headerSubHeader' : '']">
        <span class="super-title">Dashboard</span>
        <b-dropdown variant="outline-success" text="SYMBOL" class="header-filter">
          <div class="ts-header-dropdown">
            <b-form-group label="Search" label-for="ddown-form-search">
              <b-form-input size="sm" placeholder="" id="ddown-form-search" @input="performSearch"></b-form-input>
            </b-form-group>

            <b-dropdown-divider v-show="showSymbols.length > 0"/>

            <b-form-checkbox
              v-for="symbol in showSymbols"
              v-model="symbolsSelected"
              :key="symbol.value"
              :value="symbol.value"
              name="symbols"
            >
              {{ symbol.name }}
            </b-form-checkbox>
          </div>
        </b-dropdown>
        <b-dropdown variant="outline-success" text="SETUP" class="header-filter">
          <div class="ts-header-dropdown">
            <b-form-checkbox
              v-for="setup in setups"
              v-model="setupsSelected"
              :key="setup.value"
              :value="setup.name"
              name="setups"
            >
              {{ setup.name }}
            </b-form-checkbox>
          </div>
        </b-dropdown>
        <b-dropdown variant="outline-success" text="SIDE" class="header-filter">
          <div class="ts-header-dropdown">
            <b-form-checkbox
              v-for="side in sides"
              v-model="sidesSelected"
              :key="side.value"
              :value="side.name"
              name="sides"
            >
              {{ side.name }}
            </b-form-checkbox>
          </div>
        </b-dropdown>
        <b-dropdown variant="outline-success" text="MISTAKES" class="header-filter">
          <div class="ts-header-dropdown">
            <b-form-checkbox
              v-for="mistake in mistakes"
              v-model="mistakesSelected"
              :key="mistake.value"
              :value="mistake.name"
              name="mistakes"
            >
              {{ mistake.name }}
            </b-form-checkbox>
          </div>
        </b-dropdown>
        <b-dropdown variant="outline-success" text="STATUS" class="header-filter">
          <div class="ts-header-dropdown">
            <b-form-checkbox
              v-for="status in statuses"
              v-model="statusesSelected"
              :key="status.value"
              :value="status.name"
              name="statuses"
            >
              {{ status.name }}
            </b-form-checkbox>
          </div>
        </b-dropdown>
        <b-dropdown variant="outline-success" text="PORTFOLIO" class="header-filter">
          <b-dropdown-item>My Super Portfolio</b-dropdown-item>
        </b-dropdown>

        <div class="header-filter header-date-filter">
          <vue-rangedate-picker 
            i18n="EN" 
            righttoleft="true" 
            :months="datePicker.monthNames"
            :captions="datePicker.captions"
            :presetRanges="datePicker.presetRanges"
            @selected="datepickerEvents"
            ref="datePickerObject"
          />
        </div>

        <b-button class="add-trade-button header-filter" size="sm" @click="cleafFilters">CLEAR FILTER</b-button>

      <!-- <b-navbar-nav class="ml-auto">
        <b-button class="mr-2 add-trade-button" size="sm">ADD TRADE</b-button>
      </b-navbar-nav> -->
  </div>
  <!-- <AsideToggler class="d-lg-none" display="md" mobile /> -->
</template>

<script>

import VueRangedatePicker from './CustomDatePicker'

var timeoutID = null

export default {
  name: "HeaderFilters",
  components: {'vue-rangedate-picker': VueRangedatePicker},
  props: ['subHeader'],
  data: function() {
    return {
      searchWord: "",
      showSymbols: [],
      symbols: [
        {name: "GE", value: "GE"},
        {name: "CHK", value: "CHK"},
        {name: "BAC", value: "BAC"},
        {name: "HPQ", value: "HPQ"},
        {name: "NTNX", value: "NTNX"},
        {name: "LLY", value: "LLY"},
        {name: "GPS", value: "GPS"},
        {name: "VALE", value: "VALE"},
        {name: "ECA", value: "ECA"},
        {name: "BMY", value: "BMY"},
        {name: "SWN", value: "SWN"},
        {name: "GE1", value: "GE1"},
        {name: "CHK1", value: "CHK1"},
        {name: "BAC1", value: "BAC1"},
        {name: "HPQ1", value: "HPQ1"},
        {name: "NTNX1", value: "NTNX1"},
        {name: "LLY1", value: "LLY1"},
        {name: "GPS1", value: "GPS1"},
        {name: "VALE1", value: "VALE1"},
        {name: "ECA1", value: "ECA1"},
        {name: "BMY1", value: "BMY1"},
        {name: "SWN1", value: "SWN1"},
      ],
      setups: [
        {name: "EARNINGS WINNER", value: "a"},
        {name: "I ROCK", value: "b"}
      ],
      mistakes: [
        {name: "DONT DO THIS AGAIN", value: "a"},
        {name: "I FORGOT TO....", value: "b"},
        {name: "BAD, BAD LUCK", value: "c"}
      ],
      sides: [
        {name: "LONG", value: "a"},
        {name: "SHORT", value: "b"},
      ],
      statuses: [
        {name: "OPEN", value: "a"},
        {name: "WIN", value: "b"},
        {name: "LOSS", value: "c"},
      ],
      setupsSelected: [],
      symbolsSelected: [],
      mistakesSelected: [],
      sidesSelected: [],
      statusesSelected: [],
      dateSelected: {},

      datePicker: {
        shortDays: this.$moment.monthsShort(),
        monthNames: this.$moment.monthsShort(),
        captions: {
          'title': '',
          'ok_button': 'Apply Date(s)'
        },
        presetRanges: {
          today: function () {
            var e=new Date()
            const n=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate(),0,0))
            return {
              label: "Today",
              active: false,
              dateRange: {
                start: n,
                end: null
              }
            }
          },
          yesterday: function () {
            var e=new Date();
            const n=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate()-1))
            return {
              label: "Yesterday",
              active: false,
              dateRange: {
                start: n,
                end: null
              }
            }
          },
          last7days: function () {
            var e=new Date();
            const n=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate()-6))
            const a=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate()))
            return {
              label: "Last 7 days",
              active: false,
              dateRange: {
                start: n,
                end: a
              }
            }
          },
          last30days: function () {
            var e=new Date()
            const n=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate()-30))
            const a=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate()))
            return {
              label: "Last 30 days",
              active: false,
              dateRange: {
                start: n,
                end: a
              }
            }
          },
          thisMonth: function () {
            var e=new Date()
            const n=new Date(Date.UTC(e.getFullYear(),e.getMonth(),1))
            const a=new Date(Date.UTC(e.getFullYear(),e.getMonth()+1,0))
            return {
              label: "This Month",
              active: false,
              dateRange: {
                start: n,
                end: a
              }
            }
          },
          lastMonth: function () {
            var e=new Date()
            const n=new Date(Date.UTC(e.getFullYear(),e.getMonth()-1,1))
            const a=new Date(Date.UTC(e.getFullYear(),e.getMonth(),0))
            return {
              label: "Last Month",
              active: false,
              dateRange: {
                start: n,
                end: a
              }
            }

          },
        }
      }
    }
  },
  methods: {
    datepickerEvents: function(e) {
      this.dateSelected = {...e}
    },
    performSearch: function(text) {
      clearTimeout(timeoutID)
      if(text.trim().length == 0) {
        this.showSymbols = []
        return 
      }
      timeoutID = setTimeout(function () {
        this.showSymbols = this.symbols.filter(o => {
          let exist = o.name.toLowerCase().includes(text.toLowerCase())
          return exist
        })
      }.bind(this), 500)    
    },
    cleafFilters: function() {
      this.$store.dispatch('setFilterSelectionSymbols', [])
      this.$store.dispatch('setFilterSelectionSetups', [])
      this.$store.dispatch('setFilterSelectionSides', [])
      this.$store.dispatch('setFilterSelectionMistakes', [])
      this.$store.dispatch('setFilterSelectionStatuses', [])
      this.$store.dispatch('setFilterSelectionDate', {})
      this.$refs.datePickerObject.resetDisplayValue();
      this.$refs.datePickerObject.cancelAndcloseCalendar();
    },
    configSymbolsDropdown: function() {
      this.symbolsSelected = this.$store.getters.getFilterSelectionSymbols
    },
    configSetupsDropdown: function() {
      this.setupsSelected = this.$store.getters.getFilterSelectionSetups
    },
    configSidesDropdown: function() {
      this.sidesSelected = this.$store.getters.getFilterSelectionSides
    },
    configMistakesDropdown: function() {
      this.mistakesSelected = this.$store.getters.getFilterSelectionMistakes
    },
    configStatusesDropdown: function() {
      this.statusesSelected = this.$store.getters.getFilterSelectionStatuses
    },
    configDate: function() {
      this.dateSelected = this.$store.getters.getFilterSelectionDate
      if(!this.$refs.datePickerObject) {
        return
      }
      if(!this.dateSelected.start) {
        this.$refs.datePickerObject.resetDisplayValue();
      } else {
        this.$refs.datePickerObject.updatePreset2({label: "", dateRange: {...this.dateSelected}})  
      }
    },
  },
  mounted: function() {
    this.configSymbolsDropdown()
    this.configSetupsDropdown()
    this.configSidesDropdown()
    this.configMistakesDropdown()
    this.configStatusesDropdown()
    this.configDate()

    this.$store.watch((state, getters) => getters.getFilterSelectionSymbols, n => {
      this.configSymbolsDropdown()
    })
    this.$store.watch((state, getters) => getters.getFilterSelectionSetups, n => {
      this.configSetupsDropdown()
    })
    this.$store.watch((state, getters) => getters.getFilterSelectionSides, n => {
      this.configSidesDropdown()
    })
    this.$store.watch((state, getters) => getters.getFilterSelectionMistakes, n => {
      this.configMistakesDropdown()
    })
    this.$store.watch((state, getters) => getters.getFilterSelectionStatuses, n => {
      this.configStatusesDropdown()
    })
    this.$store.watch((state, getters) => getters.getFilterSelectionDate, n => {
      this.configDate()
    })

    this.$root.$on('bv::dropdown::show', (bvEvent) => {
      this.$refs.datePickerObject.cancelAndcloseCalendar();
    })
  },
  watch: {
    symbolsSelected: function(newVal, oldVal) {
      this.$store.dispatch('setFilterSelectionSymbols', newVal)
    },
    setupsSelected: function(newVal, oldVal) {
      this.$store.dispatch('setFilterSelectionSetups', newVal)
    },
    sidesSelected: function(newVal, oldVal) {
      this.$store.dispatch('setFilterSelectionSides', newVal)
    },
    mistakesSelected: function(newVal, oldVal) {
      this.$store.dispatch('setFilterSelectionMistakes', newVal)
    },
    statusesSelected: function(newVal, oldVal) {
      this.$store.dispatch('setFilterSelectionStatuses', newVal)
    },
    dateSelected: function(newVal, oldVal) {
      const newStart = newVal.start ? this.$refs.datePickerObject.getDateString(newVal.start) : ""
      const newEnd = newVal.end ? this.$refs.datePickerObject.getDateString(newVal.end) : ""
      // newVal.start = newStart
      // newVal.end = newEnd 
      this.$store.dispatch('setFilterSelectionDate', newVal)
    },
  }
};
</script>

<style scoped>

  .headerSubHeader {
    background-color: red !important;
  }

  .header-filter-container {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  div >>> .header-date-filter .input-date {
    border-color: #009792;
    border-radius: 3px;
    padding: 4px;
    height: 32px;
    font-size: 0.775rem;
    font-family: 'Roboto';
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    color: #fff;
    font-weight: 400;
    min-width: 100px;
    width: auto;
  }

  div >>> .header-date-filter .input-date:hover {
    color: #fff;
    border-color: #009792;
    background-color: #009792;
  }

  div >>> .header-date-filter .input-date::after {
    display: inline-block;
    margin-left: 0.255em;
    vertical-align: 0.255em;
    content: "";
    border-top: 0.3em solid;
    border-right: 0.3em solid transparent;
    border-bottom: 0;
    border-left: 0.3em solid transparent;
    font-size: 13.4px;
    margin-top: 1px;
    font-weight: 400;
  }

  div >>> .header-date-filter .calendar {
    font-family: Roboto, Helvetica, Arial, sans-serif;
    width: 700px;
    font-size: 12px;
    height: auto;
    box-shadow: none;
    background: #101521;
    z-index: 9;
    border: 1px solid #23282c;
    border-radius: 0.25rem;

    width: 610px;
  }

  div >>> .header-date-filter li.calendar_days_in-range {
    background: #00B399;
    color: #fff !important;
  }
  div >>> .header-date-filter li.calendar_days_selected {
    background: #036759;
    color: #fff !important;
  }

  div >>> .header-date-filter .calendar-head {
    color: #eee;
  }

  div >>> .header-date-filter .calendar .close {
    font-size: 26px;
    font-style: normal;
    top: 0;
    color: #aaa;
    position: absolute;
    right: 0;
    margin: 0;
  }

  div >>> .header-date-filter .calendar-wrap {
    width: 77%;
    padding: 10px;
  }

  div >>> .header-date-filter .calendar-btn-apply {
    margin-top: 12px;
    padding: 0;
    line-height: 31px;
    border-radius: 3px;
    font-size: 12px;
    font-weight: bold;
    text-transform: uppercase;
    background-color: #009792;
  }

  div >>> .header-date-filter .calendar-range {
    margin: 0;
    position: relative;
    padding-top: 20px;
    border-left: 1px solid #3b3f45;
  }

  div >>> .header-date-filter .calendar_month_left, 
  div >>> .header-date-filter .calendar_month_right {
    width: 46%;
    padding: 0;
  }

  div >>> .header-date-filter .calendar_preset li {
    line-height: 2em;
  }

  div >>> .header-date-filter .calendar_days li {
    color: #fff;
  } 

  div >>> .header-date-filter .active-preset {
    border: 1px solid #00b198;
    color: #00b198;
}

  div >>> .header-date-filter .calendar_preset li.calendar_preset-ranges:hover {
    background: #036759;
    color: #fff;
  } 

  div >>> .header-date-filter li.calendar_preset-ranges:hover,
  div >>> .header-date-filter .calendar_days li:hover {
    background: #036759;
    color: #fff;
  } 

  .add-trade-button {
    background-color: transparent;
    border: none;
    margin-left: 5px;
  }

  .ts-header-dropdown {
    display: flex;
    flex-direction: column;
    padding: 10px;
    max-height: calc(80vh);
    overflow: overlay;
  }

  .ts-header-dropdown >>> .custom-control-label {
      padding-left: 24px;
      font-size: 14px;
      font-weight: 300;
      white-space: nowrap;
  }
  .ts-header-dropdown >>> .custom-control-input:checked ~ .custom-control-label {
      font-weight: 500;
  }
  .ts-header-dropdown >>> .custom-control-input:checked ~ .custom-control-label::before {
      color: #444;
      border-color: #00a28b;
      background-color: #00CFB1;
  }
  .ts-header-dropdown >>> .custom-control-label::before {
      left: 0;
      width: 1rem;
      height: 1rem;
      border-radius: 0.15rem;
  }
  .ts-header-dropdown >>> .custom-control-label::after {
      left: 0;
      width: 1rem;
      height: 1rem;
      background-size: 70% 70%;
  }
  .ts-header-dropdown >>> .custom-control-inline {
      padding-right: 0;
      padding-left: 0;
      width: auto;
      margin-right: 0;
  }
  .super-title {
    margin-right: 5px; 
    font-size: 16px;
    font-weight: 400;
    background: linear-gradient(to right, #00ffb6, #00f0d3 49%, #00eed7, #00e1f1);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @media (max-width: 885px) {
    .header-filter-container {
      flex-wrap: wrap;
      justify-content: space-evenly;
      margin: auto;
    }
    .super-title {
      flex: 0 100%;
      text-align: center;
      margin: 0 auto 10px;
    }
    .header-filter {
      flex: 0 24%;
      margin: 0;
      margin-bottom: 8px;
    }
  }

  @media (max-width: 550px) {
    .header-filter {
      flex: 0 45%;
    }
  }

  @media (max-width: 400px) {
    .header-filter {
      flex: 0 100%;
    }
  }
</style>

