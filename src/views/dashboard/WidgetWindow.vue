<template>
  <transition name="slide-fade">
    <div class="ts-dashboard-modal-backdrop">
      <div class="modal-dialog modal-dialog-centered ts-modal-dialog" role="document">
        <div class="modal-content ts-modal-content">
          <div class="modal-header ts-modal-header">
            <h5 class="modal-title ts-modal-title">Manage Widget</h5>
          </div>
          <div class="modal-body">
            <span class="modal-layout-body-title">Choose your reports for the top of your dashboard</span>
            <div class="widget-window-column-options-container widget-window-header-options-container">
              <b-form-group>
                <b-form-checkbox v-for="(item, key) in headerOptions" :key="key" v-model="headerSelected[key]" :disabled="checkIfDisabled(key)" :value="item.value">{{item.text}}</b-form-checkbox>
              </b-form-group>
            </div>
            <span class="modal-layout-body-title">Choose your reports for the side column ofyour dashboard</span>
            <div class="widget-window-column-options-container">
              <b-form-group>
                <div class="widget-window-column-options">
                  <span></span>
                  <div class="widget-window-header-options">
                    <span>Hide</span>
                    <span style="padding-right: 10px; text-align: right; flex: 1;">L</span>
                    <span style="padding-right: 6px; text-align: right; flex: 1;">R</span>
                  </div>
                </div>
                <div class="widget-window-column-options" v-for="(item, key) in columnOptions" :key="key">
                  <span>{{item}}</span>
                  <b-form-radio-group v-model="selected[key]" :options="options"  :name="'plainInline'+key" />
                </div>
              </b-form-group>
            </div>
          </div>
          <div class="modal-footer ts-modal-footer">
            <button type="button" class="btn btn-secondary" @click="clickCancel">Cancel</button>
            <button type="button" class="btn btn-primary" @click="clickAccept">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'WidgetWindow',
    data: function () {
      return {
          accepted: false,
          lastSavedSelection: 1,
          options: [ { text: '', value: '0' }, { text: '', value: '1' }, { text: '', value: '2' } ], 
          headerOptions: [ 
            {text: "Accumulative Return", value: 1}, 
            {text: "Wins Ratio", value: 2}, 
            {text: 'Average Return', value: 3}, 
            {text: 'Other', value: 4}, 
          ],
          columnOptions: [
            "Management", 
            "Setup Snapshot", 
            'Hourly Snapshot', 
            'Weekly Snapshot', 
            'Monthly Snapshot', 
            'Pricing Snapshot', 
            'Mistake Snapshot', 
            'Volume Snapshot', 
            'Market Snapshot', 
            'Insights', 
            'Account Performance',
            'Potential Performance',
            'Zuzku Advisor' 
          ],
          headerSelected: [1, false, 3, false, false, false, false, false, 9],
          selectedHeaderWidgetsCount: 3,
          selected: [0,1,2,0]
      }
    },
    beforeDestroy: function() {
      document.getElementsByClassName('main')[0].classList.remove("freeze-screen");
    },
    mounted: function() {
      document.getElementsByClassName('main')[0].classList.add("freeze-screen");

      let current = this.$store.getters.getCurrentDashboardWidgets;
      this.selected = current.map(o => o.column)
      let currentHeader = this.$store.getters.getCurrentDashboardAllHeaderWidgets;
      this.headerSelected = currentHeader.map((o, index) => (o.active ? index+1 : false))
    },
    watch: {
      headerSelected (newVal, oldVal) {
        let checkTotal = this.headerSelected.filter(o => o != false)
        this.selectedHeaderWidgetsCount = checkTotal.length
      }
    },
    methods: {
      checkIfDisabled(key) {
        if(this.selectedHeaderWidgetsCount >= 4) {
          if(this.headerSelected[key] == false) {
            return true
          }
        }
        return false;
      },
      clickCancel() {
        this.toggleView(this.lastSavedSelection)
        this.$store.dispatch('toggleWidgetsWindow')
      },
      clickAccept() {
        if(this.accepted) {
          return
        }
        this.accepted = true
        let oldSelection = this.$store.getters.getCurrentDashboardWidgets;
        let newSelection = oldSelection.map((o, index) => {
          o.column = this.selected[index];
          return o
        })
        this.$store.dispatch('setCurrentDashboardWidgets', newSelection)

        let oldHeaderSelection = this.$store.getters.getCurrentDashboardAllHeaderWidgets;
        let newHeaderSelection = oldHeaderSelection.map((o, index) => {
          o.active = this.headerSelected[index] !== false;
          return o
        })
        
        this.$store.dispatch('setCurrentDashboardHeaderWidgets', newHeaderSelection)

        this.accepted = false
        this.$store.dispatch('toggleWidgetsWindow')
      },
      toggleModal() {
        this.$store.dispatch('toggleWidgetsWindow')
      },
      toggleView(index) {
      }
    }
  }
</script>
