<template>
  <div class="calendar-root" id="ts-custom-date-picker">
    <!-- <div class="input-date" @click="toggleCalendar()"> {{(dateRange.start || dateRange.end) ? "":"DATE"}} {{getDateString(dateRange.start)}} {{(dateRange.end) ? "-" : ""}} {{getDateString(dateRange.end)}}</div> -->
    <div class="input-date" @click="toggleCalendar()">DATE</div>
    <div class="calendar" :class="{'calendar-mobile ': isCompact, 'calendar-right-to-left': isRighttoLeft}" v-if="isOpen">
      <div class="calendar-wrap">
        <div class="calendar_month_left" :class="{'calendar-left-mobile': isCompact}" v-if="showMonth">
          <div class="months-text">
            <i class="left" @click="goPrevMonth"></i>
            <i class="right" @click="goNextMonth" v-if="isCompact"></i>
            {{monthsLocale[activeMonthStart] +' '+ activeYearStart}}</div>
            <ul :class="s.daysWeeks">
              <li v-for="item in shortDaysLocale" :key="item">{{item}}</li>
            </ul>
            <ul v-for="r in 6" :class="[s.days]" :key="r">
              <li :class="[{[s.daysSelected]: isDateSelected(r, i, 'first', startMonthDay, endMonthDate),
              [s.daysInRange]: isDateInRange(r, i, 'first', startMonthDay, endMonthDate),
              [s.dateDisabled]: isDateDisabled(r, i, startMonthDay, endMonthDate)}]" v-for="i in numOfDays" :key="i" v-html="getDayCell(r, i, startMonthDay, endMonthDate)"
                @click="selectFirstItem(r, i)"></li>
            </ul>
        </div>
        <div class="calendar_month_right" v-if="!isCompact">
          <div class="months-text">
            {{monthsLocale[startNextActiveMonth] +' '+ activeYearEnd}}
            <i class="right" @click="goNextMonth"></i>
          </div>
          <ul :class="s.daysWeeks">
              <li v-for="item in shortDaysLocale" :key="item">{{item}}</li>
          </ul>
          <ul v-for="r in 6" :class="[s.days]" :key="r">
            <li :class="[{[s.daysSelected]: isDateSelected(r, i, 'second', startNextMonthDay, endNextMonthDate),
            [s.daysInRange]: isDateInRange(r, i, 'second', startNextMonthDay, endNextMonthDate),
            [s.dateDisabled]: isDateDisabled(r, i, startNextMonthDay, endNextMonthDate)}]"
                v-for="i in numOfDays" :key="i" v-html="getDayCell(r, i, startNextMonthDay, endNextMonthDate)"
                  @click="selectSecondItem(r, i)"></li>
          </ul>
        </div>
      </div>
      <div class="calendar-range" :class="{'calendar-range-mobile ': isCompact}" v-if="!showMonth || !isCompact">
        <i class="close" @click="toggleCalendar()">&times;</i>
        <ul class="calendar_preset">
          <li
            class="calendar_preset-ranges"
            v-for="(item, idx) in finalPresetRanges"
            :key="idx"
            @click="updatePreset2(item)"
            :class="{'active-preset': presetActive === item.label}">
            {{item.label}}
          </li>
          <li><button class="calendar-btn-apply" @click="setDateValue()">{{captions.ok_button}}</button></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import fecha from 'fecha'

const defaultConfig = {}
const defaultI18n = 'ID'
const availableMonths = {
  EN: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November',
    'December'],
  ID: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November',
    'Desember']
}

const availableShortDays = {
  EN: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  ID: ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']
}

const presetRangeLabel = {
  EN: {
    today: 'Today',
    thisMonth: 'This Month',
    lastMonth: 'Last Month',
    lastSevenSays: 'Last 7 Days',
    lastThirtyDays: 'Last 30 Days'
  },
  ID: {
    today: 'Hari ini',
    thisMonth: 'Bulan ini',
    lastMonth: 'Bulan lalu',
    lastSevenDays: '7 Hari Terakhir',
    lastThirtyDays: '30 Hari Terakhir'
  }
}

const defaultCaptions = {
  'title': 'Choose Dates',
  'ok_button': 'Apply'
}

const defaultStyle = {
  daysWeeks: 'calendar_weeks',
  days: 'calendar_days',
  daysSelected: 'calendar_days_selected',
  daysInRange: 'calendar_days_in-range',
  firstDate: 'calendar_month_left',
  secondDate: 'calendar_month_right',
  presetRanges: 'calendar_preset-ranges',
  dateDisabled: 'calendar_days--disabled'
}

const defaultPresets = function (i18n = defaultI18n) {
  return {
    today: function () {
      const n = new Date()
      const today = new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate(), 0, 0))
      return {
        label: presetRangeLabel[i18n].today,
        active: false,
        dateRange: {
          start: today,
          end: today
        }
      }
    },
    thisMonth: function () {
      const n = new Date()
      const startMonth = new Date(Date.UTC(n.getFullYear(), n.getMonth(), 1))
      const endMonth = new Date(Date.UTC(n.getFullYear(), n.getMonth() + 1, 0))
      return {
        label: presetRangeLabel[i18n].thisMonth,
        active: false,
        dateRange: {
          start: startMonth,
          end: endMonth
        }
      }
    },
    lastMonth: function () {
      const n = new Date()
      const startMonth = new Date(Date.UTC(n.getFullYear(), n.getMonth() - 1, 1))
      const endMonth = new Date(Date.UTC(n.getFullYear(), n.getMonth(), 0))
      return {
        label: presetRangeLabel[i18n].lastMonth,
        active: false,
        dateRange: {
          start: startMonth,
          end: endMonth
        }
      }
    },
    last7days: function () {
      const n = new Date()
      const start = new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate() - 6))
      const end = new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate()))
      return {
        label: presetRangeLabel[i18n].lastSevenDays,
        active: false,
        dateRange: {
          start: start,
          end: end
        }
      }
    },
    last30days: function () {
      const n = new Date()
      const start = new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate() - 30))
      const end = new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate()))
      return {
        label: presetRangeLabel[i18n].lastThirtyDays,
        active: false,
        dateRange: {
          start: start,
          end: end
        }
      }
    }
  }
}


export default {
  name: 'vue-rangedate-picker',
  props: {
    displayValue: "DATE",
    configs: {
      type: Object,
      default: () => defaultConfig
    },
    i18n: {
      type: String,
      default: defaultI18n
    },
    months: {
      type: Array,
      default: () => null
    },
    shortDays: {
      type: Array,
      default: () => null
    },
    // options for captions are: title, ok_button
    captions: {
      type: Object,
      default: () => defaultCaptions
    },
    format: {
      type: String,
      default: 'DD MMM YYYY'
    },
    styles: {
      type: Object,
      default: () => {}
    },
    initRange: {
      type: Object,
      default: () => null
    },
    startActiveMonth: {
      type: Number,
      default: new Date().getMonth()
    },
    startActiveYear: {
      type: Number,
      default: new Date().getFullYear()
    },
    presetRanges: {
      type: Object,
      default: () => null
    },
    compact: {
      type: String,
      default: 'false'
    },
    righttoleft: {
      type: String,
      default: 'false'
    }
  },
  data () {
    return {
      dateRange: {
        start: "",
        end: ""
      },
      numOfDays: 7,
      isFirstChoice: true,
      isOpen: false,
      presetActive: '',
      showMonth: false,
      activeMonthStart: this.startActiveMonth,
      activeYearStart: this.startActiveYear,
      activeYearEnd: this.startActiveYear
    }
  },
  created () {
    if (this.isCompact) {
      this.isOpen = true
    }
    if (this.activeMonthStart === 11) this.activeYearEnd = this.activeYearStart + 1
  },
  watch: {
    startNextActiveMonth: function (value) {
      if (value === 0) this.activeYearEnd = this.activeYearStart + 1
    },
    isOpen: function (value) {
      if (value == true) {
        document.addEventListener("click", this.detectClickPoint);
      } else {
        document.removeEventListener("click", this.detectClickPoint);
      }
    }
  },
  computed: {
    monthsLocale: function () {
      return this.months || availableMonths[this.i18n]
    },
    shortDaysLocale: function () {
      return this.shortDays || availableShortDays[this.i18n]
    },
    s: function () {
      return Object.assign({}, defaultStyle, this.style)
    },
    startMonthDay: function () {
      return new Date(Date.UTC(this.activeYearStart, this.activeMonthStart, 1)).getDay()
    },
    startNextMonthDay: function () {
      return new Date(Date.UTC(this.activeYearStart, this.startNextActiveMonth, 1)).getDay()
    },
    endMonthDate: function () {
      return new Date(Date.UTC(this.activeYearEnd, this.startNextActiveMonth, 0)).getDate()
    },
    endNextMonthDate: function () {
      return new Date(Date.UTC(this.activeYearEnd, this.activeMonthStart + 2, 0)).getDate()
    },
    startNextActiveMonth: function () {
      return this.activeMonthStart >= 11 ? 0 : this.activeMonthStart + 1
    },
    finalPresetRanges: function () {
      const tmp = {}
      const presets = this.presetRanges || defaultPresets(this.i18n)
      for (const i in presets) {
        const item = presets[i]
        let plainItem = item
        if (typeof item === 'function') {
          plainItem = item()
        }
        tmp[i] = plainItem
      }
      return tmp
    },
    isCompact: function () {
      return this.compact === 'true'
    },
    isRighttoLeft: function () {
      return this.righttoleft === 'true'
    }
  },
  methods: {
    detectClickPoint: function(evt) {
        const flyoutElement = document.getElementById("ts-custom-date-picker");
        let targetElement = evt.target; // clicked element
        do {
            if (targetElement == flyoutElement && this.isOpen) {
              return;
            }
            targetElement = targetElement.parentNode;
        } while (targetElement);

        this.cancelAndcloseCalendar();
    },
    resetDisplayValue: function() {
      this.dateRange = {}
    }, 
    cancelAndcloseCalendar: function () {
      this.isOpen = false
      this.showMonth = false
      return
    },
    toggleCalendar: function () {
      if (this.isCompact) {
        this.showMonth = !this.showMonth
        return
      }
      this.isOpen = !this.isOpen
      this.showMonth = !this.showMonth
      return
    },
    getDateString: function (date, format = this.format) {
      if (!date) {
        return null
      }
      const dateparse = new Date(Date.parse(date))
      return fecha.format(new Date(Date.UTC(dateparse.getFullYear(), dateparse.getMonth(), dateparse.getDate())), format)
    },
    getDayIndexInMonth: function (r, i, startMonthDay) {
      const date = (this.numOfDays * (r - 1)) + i
      return date - startMonthDay
    },
    getDayCell (r, i, startMonthDay, endMonthDate) {
      const result = this.getDayIndexInMonth(r, i, startMonthDay)
      // bound by > 0 and < last day of month
      return result > 0 && result <= endMonthDate ? result : '&nbsp;'
    },
    getNewDateRange (result, activeMonth, activeYear) {
      const newData = {}
      let key = 'start'
      if (!this.isFirstChoice) {
        key = 'end'
      } else {
        newData['end'] = null
      }
      const resultDate = new Date(Date.UTC(activeYear, activeMonth, result))
      if (!this.isFirstChoice && resultDate < this.dateRange.start) {
        this.isFirstChoice = false
        return { start: resultDate }
      }

      // toggle first choice
      this.isFirstChoice = !this.isFirstChoice
      newData[key] = resultDate
      return newData
    },
    selectFirstItem (r, i) {
      const result = this.getDayIndexInMonth(r, i, this.startMonthDay)
      this.dateRange = Object.assign({}, this.dateRange, this.getNewDateRange(result, this.activeMonthStart,
      this.activeYearStart))
      if (this.dateRange.start && this.dateRange.end) {
        this.presetActive = ''
        if (this.isCompact) {
          this.showMonth = false
        }
      }
    },
    selectSecondItem (r, i) {
      const result = this.getDayIndexInMonth(r, i, this.startNextMonthDay)
      this.dateRange = Object.assign({}, this.dateRange, this.getNewDateRange(result, this.startNextActiveMonth,
      this.activeYearEnd))
      if (this.dateRange.start && this.dateRange.end) {
        this.presetActive = ''
      }
    },
    isDateSelected (r, i, key, startMonthDay, endMonthDate) {
      const result = this.getDayIndexInMonth(r, i, startMonthDay)
      if (result < 1 || result > endMonthDate) return false

      let currDate = null
      if (key === 'first') {
        currDate = new Date(Date.UTC(this.activeYearStart, this.activeMonthStart, result))
      } else {
        currDate = new Date(Date.UTC(this.activeYearEnd, this.startNextActiveMonth, result))
      }
      return (this.dateRange.start && this.dateRange.start.getTime() === currDate.getTime()) ||
        (this.dateRange.end && this.dateRange.end.getTime() === currDate.getTime())
    },
    isDateInRange (r, i, key, startMonthDay, endMonthDate) {
      const result = this.getDayIndexInMonth(r, i, startMonthDay)
      if (result < 2 || result > endMonthDate) return false

      let currDate = null
      if (key === 'first') {
        currDate = new Date(Date.UTC(this.activeYearStart, this.activeMonthStart, result))
      } else {
        currDate = new Date(Date.UTC(this.activeYearEnd, this.startNextActiveMonth, result))
      }
      return (this.dateRange.start && this.dateRange.start.getTime() < currDate.getTime()) &&
        (this.dateRange.end && this.dateRange.end.getTime() > currDate.getTime())
    },
    isDateDisabled (r, i, startMonthDay, endMonthDate) {
      const result = this.getDayIndexInMonth(r, i, startMonthDay)
      // bound by > 0 and < last day of month
      return !(result > 0 && result <= endMonthDate)
    },
    goPrevMonth () {
      const prevMonth = new Date(Date.UTC(this.activeYearStart, this.activeMonthStart, 0))
      this.activeMonthStart = prevMonth.getMonth()
      this.activeYearStart = prevMonth.getFullYear()
      this.activeYearEnd = prevMonth.getFullYear()
    },
    goNextMonth () {
      const nextMonth = new Date(Date.UTC(this.activeYearEnd, this.startNextActiveMonth, 1))
      this.activeMonthStart = nextMonth.getMonth()
      this.activeYearStart = nextMonth.getFullYear()
      this.activeYearEnd = nextMonth.getFullYear()
    },
    updatePreset (item) {
      this.presetActive = item.label
      this.dateRange = item.dateRange
      // update start active month
      this.activeMonthStart = this.dateRange.start.getMonth()
      this.activeYearStart = this.dateRange.start.getFullYear()
      this.activeYearEnd = this.dateRange.end.getFullYear()
    },
    updatePreset2 (item) {
      this.presetActive = item.label
      this.dateRange = item.dateRange
      // update start active month
      this.activeMonthStart = this.dateRange.start.getMonth()
      this.activeYearStart = this.dateRange.start.getFullYear()
      if(this.dateRange.end) {
        this.activeYearEnd = this.dateRange.end.getFullYear()
      }
    },
    setDateValue: function () {
      this.$emit('selected', this.dateRange)
      if (!this.isCompact) {
        this.toggleCalendar()
      }
    }
  }
}
</script>

<style lang="css" scoped>
.input-date {
  display: block;
  border: 1px solid #ccc;
  padding: 5px;
  font-size: 14px;
  width: 230px;
  cursor: pointer;
}

.input-date::after {
  content: "▼";
  float: right;
  font-size: smaller;
}

.active-preset {
  border: 1px solid #0096d9;
  color: #0096d9;
  border-radius: 3px;
}

.months-text {
  text-align: center;
  font-weight: bold;
}

.months-text .left {
  float: left;
  cursor: pointer;
  width: 16px;
  height: 16px;
  background-image: url("data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMS4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDMxLjQ5NCAzMS40OTQiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDMxLjQ5NCAzMS40OTQ7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4Ij4KPHBhdGggZD0iTTEwLjI3Myw1LjAwOWMwLjQ0NC0wLjQ0NCwxLjE0My0wLjQ0NCwxLjU4NywwYzAuNDI5LDAuNDI5LDAuNDI5LDEuMTQzLDAsMS41NzFsLTguMDQ3LDguMDQ3aDI2LjU1NCAgYzAuNjE5LDAsMS4xMjcsMC40OTIsMS4xMjcsMS4xMTFjMCwwLjYxOS0wLjUwOCwxLjEyNy0xLjEyNywxLjEyN0gzLjgxM2w4LjA0Nyw4LjAzMmMwLjQyOSwwLjQ0NCwwLjQyOSwxLjE1OSwwLDEuNTg3ICBjLTAuNDQ0LDAuNDQ0LTEuMTQzLDAuNDQ0LTEuNTg3LDBsLTkuOTUyLTkuOTUyYy0wLjQyOS0wLjQyOS0wLjQyOS0xLjE0MywwLTEuNTcxTDEwLjI3Myw1LjAwOXoiIGZpbGw9IiMwMDZERjAiLz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==");
}

.months-text .right {
  float: right;
  cursor: pointer;
  width: 16px;
  height: 16px;
  background-image: url("data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMS4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDMxLjQ5IDMxLjQ5IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAzMS40OSAzMS40OTsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIxNnB4IiBoZWlnaHQ9IjE2cHgiPgo8cGF0aCBkPSJNMjEuMjA1LDUuMDA3Yy0wLjQyOS0wLjQ0NC0xLjE0My0wLjQ0NC0xLjU4NywwYy0wLjQyOSwwLjQyOS0wLjQyOSwxLjE0MywwLDEuNTcxbDguMDQ3LDguMDQ3SDEuMTExICBDMC40OTIsMTQuNjI2LDAsMTUuMTE4LDAsMTUuNzM3YzAsMC42MTksMC40OTIsMS4xMjcsMS4xMTEsMS4xMjdoMjYuNTU0bC04LjA0Nyw4LjAzMmMtMC40MjksMC40NDQtMC40MjksMS4xNTksMCwxLjU4NyAgYzAuNDQ0LDAuNDQ0LDEuMTU5LDAuNDQ0LDEuNTg3LDBsOS45NTItOS45NTJjMC40NDQtMC40MjksMC40NDQtMS4xNDMsMC0xLjU3MUwyMS4yMDUsNS4wMDd6IiBmaWxsPSIjMDA2REYwIi8+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=");
}

.calendar-root,
.calendar-title {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.calendar-right-to-left {
  margin-left: -460px;
}

.calendar {
  display: block;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  width: 700px;
  font-size: 12px;
  height: 300px;
  box-shadow: -3px 4px 12px -1px #ccc;
  background: #fff;
  position: absolute;
  z-index: 9;
}

.calendar-head h2 {
  padding: 20px 0 0 20px;
  margin: 0;
}

.close:hover {
  cursor: pointer;
}

.close{
  float: right;
  padding: 0 10px;
  margin-top: -35px;
  font-size: 32px;
  font-weight: normal;
}

.calendar ul {
  list-style-type: none;
}

.calendar-wrap {
  display: inline-block;
  float: left;
  width: 75%;
  padding: 10px;
}

.calendar-range {
  float: left;
  padding: 0 12px;
  border-left: 1px solid #ccc;
  margin: -2px;
}

.calendar-left-mobile {
  width: 100% !important;
}

.calendar_month_left,
.calendar_month_right {
  float: left;
  width: 43%;
  padding: 10px;
  margin: 5px;
}

.calendar_weeks {
  margin: 0;
  padding: 10px 0;
  width: auto;
}

.calendar_weeks li {
  display: inline-block;
  width: 13.6%;
  color: #999;
  text-align: center;
}

.calendar_days {
  margin: 0;
  padding: 0;
}

.calendar_days li {
  display: inline-block;
  width: 13.6%;
  color: #333;
  text-align: center;
  cursor: pointer;
  line-height: 2em;
}

.calendar_preset li {
  line-height: 2.6em;
  width: auto;
  display: block;
}

.calendar_days li:hover {
  background: #eee;
  color: #000;
}
li.calendar_days--disabled{
   pointer-events: none;
}

li.calendar_days_selected {
  background: #005a82;
  color: #fff;
}

li.calendar_days_in-range {
  background: #0096d9;
  color: #fff;
}

.calendar_preset {
  padding: 0;
}

.calendar_preset li.calendar_preset-ranges {
  padding: 0 30px 0 10px;
  margin-bottom: 5px;
  cursor: pointer;
  margin-top: 1px;
}

.calendar_preset li.calendar_preset-ranges:hover {
  background: #eee;
}

.calendar-mobile {
  width: 260px;
  z-index: 1;
  box-shadow: none;
}

.calendar-range-mobile {
  width: 90%;
  padding: 2px;
  border-left: none;
  margin: -20px 0;
}

.calendar-btn-apply {
  width: 100%;
  background: #f7931e;
  color: #fff;
  border: none;
  padding: 5px;
  font-size: 14px;
}
</style>