<template>
  <transition name="slide-fade">
    <div v-if="showLayoutWindow" class="ts-dashboard-modal-backdrop">
      <div class="modal-dialog modal-dialog-centered ts-modal-dialog" role="document">
        <div class="modal-content ts-modal-content">
          <div class="modal-header ts-modal-header">
            <h5 class="modal-title ts-modal-title">Dashboard Layout</h5>
          </div>
          <div class="modal-body">
            <span class="modal-layout-body-title">Choose your dashboard layout below</span>
            <div class="modal-layout-images-container">
              <div @click="toggleView(1)" class="modal-layout-images-items modal-layout-images-item-a" :class="{'sel': item_a_selected}"></div>
              <div @click="toggleView(2)" class="modal-layout-images-items modal-layout-images-item-b" :class="{'sel': item_b_selected}"></div>
              <div @click="toggleView(3)" class="modal-layout-images-items modal-layout-images-item-c" :class="{'sel': item_c_selected}"></div>
              <div @click="toggleView(4)" class="modal-layout-images-items modal-layout-images-item-d" :class="{'sel': item_d_selected}"></div>
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
    name: 'LayoutWindow',
    data: function () {
      return {
          lastSavedSelection: 1,
          item_a_selected: true,
          item_b_selected: false,
          item_c_selected: false,
          item_d_selected: false,
          showLayoutWindow: false
      }
    },
    mounted: function() {
      let current = this.$store.getters.getCurrentDashboardLayout;
      this.toggleView(current);
    },
    methods: {
      clickCancel() {
        this.toggleView(this.lastSavedSelection)
        this.showLayoutWindow = false
      },
      clickAccept() {
        this.lastSavedSelection = this.item_a_selected ? 1 : (this.item_b_selected ? 2 : (this.item_c_selected ? 3 : 4))
        this.$store.dispatch('setCurrentDashboardLayout', this.lastSavedSelection)
        this.showLayoutWindow = false
      },
      toggleModal() {
        this.showLayoutWindow = !this.showLayoutWindow
      },
      toggleView(index) {
        this.item_a_selected = index == 1
        this.item_b_selected = index == 2
        this.item_c_selected = index == 3
        this.item_d_selected = index == 4
      }
    }
  }
</script>
