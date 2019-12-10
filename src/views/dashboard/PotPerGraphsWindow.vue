<template>
  <transition name="slide-fade">
    <div class="ts-dashboard-modal-backdrop">
      <div class="modal-dialog modal-dialog-centered ts-modal-dialog" role="document">
        <div class="modal-content ts-modal-content">
          <div class="modal-header ts-modal-header">
            <h5 class="modal-title ts-modal-title">Customize Columns</h5>
          </div>
          <div class="modal-body">
            <span class="modal-layout-body-title">Choose the columns to display in the Setups section</span>
            <div class="widget-window-column-options-container widget-window-header-options-container">
              <b-form-group>
                <b-form-checkbox v-for="(item, key) in headerOptions" :key="key" v-model="headerSelected[key]" :value="item.value">{{item.text}}</b-form-checkbox>
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
    name: 'PotPerGraphsWindow',
    data: function () {
      return {
          accepted: false,
          lastSavedSelection: 1,
          headerOptions: [ 
            {text: "JUN", value: 1}, 
            {text: "TUES", value: 2}, 
            {text: 'LONG', value: 3}, 
            {text: 'SHORT', value: 4}, 
            {text: 'TIME', value: 5}, 
          ],
          headerSelected: [1, false, 3, false, false],
          selected: [0,1,2,0]
      }
    },
    beforeDestroy: function() {
      document.getElementsByClassName('main')[0].classList.remove("freeze-screen");
    },
    mounted: function() {
      document.getElementsByClassName('main')[0].classList.add("freeze-screen");

      let currentHeader = this.$store.getters.getAllPotPerGraphs;
      this.headerSelected = currentHeader.map((o, index) => (o.active ? index+1 : false))
    },
    methods: {
      clickCancel() {
        this.toggleView(this.lastSavedSelection)
        this.$store.dispatch('togglePotPerGraphsWindow')
      },
      clickAccept() {
        if(this.accepted) {
          return
        }
        this.accepted = true

        let oldHeaderSelection = this.$store.getters.getAllPotPerGraphs;
        let newHeaderSelection = oldHeaderSelection.map((o, index) => {
          o.active = this.headerSelected[index] !== false;
          return o
        })
        
        this.$store.dispatch('setCurrentPotPerGraphs', newHeaderSelection)

        this.accepted = false
        this.$store.dispatch('togglePotPerGraphsWindow')
      },
      toggleModal() {
        this.$store.dispatch('togglePotPerGraphsWindow')
      },
      toggleView(index) {
      }
    }
  }
</script>
