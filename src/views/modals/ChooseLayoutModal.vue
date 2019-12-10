<template>
  <div>
    <b-card
      class="main-cards shadow"
      style="height: 4.5rem;"
      @click="chooseLayoutShow = !chooseLayoutShow"
    >
      <b-row>
        <b-col sm="7">
          <P>AVG RETURN</P>
          <h4 class="card-text">
            $2,531.36
            <b-badge variant="outline">
              <h6 class="badge1">24% &#8605;</h6>
            </b-badge>
          </h4>
        </b-col>
        <b-col sm="4">
          <b-card-img src="img/charts/chart2.png" alt="Image" img-fluid></b-card-img>
        </b-col>
      </b-row>
    </b-card>
    <b-modal size="sm" centered class="add-witget-modal" v-model="chooseLayoutShow">
      <h6 slot="modal-header">Dashboard Layout</h6>
      <b-container fluid>
        <b-row>
          <p>Choose your dashboard layout below</p>
          <div>
            <b-img @click="alternativeLayout" src="img/example/chose.png" fluid alt="chose"/>
          </div>
        </b-row>
      </b-container>
      <div slot="modal-footer" class="w-100">
        <b-btn
          class="close-button"
          variant="outline"
          @click="chooseLayoutShow = !chooseLayoutShow"
        >Close</b-btn>
        <b-btn
          class="float-right save-button"
          @click="chooseLayoutShow = !chooseLayoutShow"
        >Save Changes</b-btn>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "ChooseLayoutModal",
  data: function() {
    return {
      chooseLayoutShow: false
    };
  }
};
</script>

<style>
</style>
