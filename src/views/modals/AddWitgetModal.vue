<template>
<div>
    <b-card
            @click="addWitgetShow = !addWitgetShow"
            style="height: 4.5rem;"
            class="addcard"
           >
      <p>ADD WITGET</p>
    </b-card>
     <b-modal class="add-witget-modal" v-model="addWitgetShow">
      <h6 slot="modal-header">Add Witget</h6>
       <b-container fluid>
        <b-row  class="mb-3">
                    <p>Choose your dashboard layout below</p>
         </b-row>
                 <b-row>
           <b-col style="padding-left:0px;">Performance Reports</b-col>
           <b-col cols="auto"><b-form-checkbox class="modal-checkbox"></b-form-checkbox></b-col>
         </b-row>
             <b-dropdown-divider></b-dropdown-divider>
        <b-row>
           <b-col style="padding-left:0px;">Setup snapshot</b-col>
           <b-col cols="auto"><b-form-checkbox></b-form-checkbox></b-col>
         </b-row>
              <b-dropdown-divider></b-dropdown-divider>
                 <b-row>
           <b-col style="padding-left:0px;">Pricing snapshot</b-col>
           <b-col cols="auto"><b-form-checkbox class="modal-checkbox"></b-form-checkbox></b-col>
         </b-row>
             <b-dropdown-divider></b-dropdown-divider>
        <b-row>
           <b-col style="padding-left:0px;">Hourly snapshot</b-col>
           <b-col cols="auto"><b-form-checkbox></b-form-checkbox></b-col>
         </b-row>
              <b-dropdown-divider></b-dropdown-divider>
                 <b-row>
           <b-col style="padding-left:0px;">Mistake snapshot</b-col>
           <b-col cols="auto"><b-form-checkbox class="modal-checkbox"></b-form-checkbox></b-col>
         </b-row>
             <b-dropdown-divider></b-dropdown-divider>
        <b-row>
           <b-col style="padding-left:0px;">Setup snapshot</b-col>
           <b-col cols="auto"><b-form-checkbox></b-form-checkbox></b-col>
         </b-row>
              <b-dropdown-divider></b-dropdown-divider>
                 <b-row>
           <b-col style="padding-left:0px;">Volume snapshot</b-col>
           <b-col cols="auto"><b-form-checkbox class="modal-checkbox"></b-form-checkbox></b-col>
         </b-row>
             <b-dropdown-divider></b-dropdown-divider>
        <b-row>
           <b-col style="padding-left:0px;">Traiding Coach</b-col>
           <b-col cols="auto"><b-form-checkbox></b-form-checkbox></b-col>
         </b-row>
         <b-dropdown-divider></b-dropdown-divider>
        <b-row>
           <b-col style="padding-left:0px;">Normal</b-col>
           <b-col cols="auto"><b-form-checkbox></b-form-checkbox></b-col>
         </b-row>
       </b-container>
       <div slot="modal-footer" class="w-100">
         <b-btn class="close-button" variant="outline" @click="addWitgetShow = !addWitgetShow">
          Close
          </b-btn>
         <b-btn  class="float-right save-button" @click="addWitgetShow = !addWitgetShow">
           Save Changes
         </b-btn>
       </div>
     </b-modal>
     </div>
</template>

<script>
export default {
    name: 'AddWitgetModal',

    data: function () {
        return {
            addWitgetShow: false
      }
    }
}
</script>

<style>

</style>
