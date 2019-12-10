<template>
  <div class="profile-inner-container">
    <SideBar :optionSelected="'account'"/>
    <div class="profile-inner-body">
      <div class="profile-inner-body-container">
        <span class="title">Account Plan</span>

            <b-row class="plan-cycle">
              <b-button class="plan-cycle-button" :class="{'plan-cycle-selected':planCycle.id == planCycleSelected.id}" v-for="(planCycle, key) in plansCycle" :key="key" @click="selectCycle(planCycle)">{{planCycle.title}} <span v-if="planCycle.discount>0">{{planCycle.discount>0?-planCycle.discount:''}}{{planCycle.discount>0?'%':''}}</span></b-button>
            </b-row>  
            <b-row class="plan-row">
              <div class="test" v-for="(plan, index) in accountPlans" :key="index">
                <b-col class="plan-card">
                  <span class="plan-card-title">{{plan.title}}</span>
                  <div class="plan-card-cost">
                    <span class="plan-card-currency-symbol">$</span>{{plan.cost}}<span class="plan-card-currency">US/ mo</span>
                  </div>
                  <span class="plan-card-discount" :class="{'line-through': planCycleSelected.discount > 0}" v-if="plan.applyDiscount">${{(plan.cost-((plan.cost*planCycleSelected.discount)/100)).toFixed(2)}}</span>
                  <span class="plan-card-discount" v-if="!plan.applyDiscount"></span>
                  <p class="plan-card-description">{{plan.description}}</p>
                  <b-button class="plan-card-button">Select Plan</b-button>
                </b-col>
              </div>
            </b-row>
            <div class="compare-plans-row">
              <b-button class="compare-plans-button" size="sm" click="">COMPARE PLANS</b-button>
            </div>
            <div class="compare-plans-row cancel-subscription-row">
              <b-button class="cancel-subscription-button" size="sm" click="">CANCEL SUBSCRIPTION</b-button>
            </div>
      </div>
    </div>
  </div>
</template>

<script>

import SideBar from './SideBar'

export default {
  name: 'AccountPlan',
  components: {
    SideBar
  },
  data () {
    return {
      planCycleSelected: {},
      plansCycle: [
        {title: "Monthly", discount: 0, id: 1},
        {title: "One Year", discount: 13, id: 2},
        {title: "Two Years", discount: 33, id: 3},
      ],
      accountPlans: [
        {title: "Basic", cost: "0.00", applyDiscount: false, description: "", isCurrentPlan: false},
        {title: "PRO", cost: "19.95", applyDiscount: true, description: "Save $120 when compared to the monthly plan", isCurrentPlan: false},
        {title: "PREMIUM", cost: "33.95", applyDiscount: true, description: "Save $120 when compared to the monthly plan", isCurrentPlan: true},
        {title: "ELITE", cost: "46.95", applyDiscount: true, description: "Save $120 when compared to the monthly plan", isCurrentPlan: false},
      ],
    }
  },
  methods: {
    selectCycle: function(cycle) {
      this.planCycleSelected = cycle;
    }
  },
  mounted: function() {
    this.planCycleSelected = this.plansCycle[0],

    // Attach the class to the container
    document.getElementsByClassName('main')[0].style.marginTop = '0';
    document.getElementsByClassName('container-fluid')[0].classList.add("profile-container");
  },
  beforeDestroy: function() {
    document.getElementsByClassName('main')[0].style.marginTop = '10px';
    document.getElementsByClassName('container-fluid')[0].classList.remove("profile-container");
  },
}
</script>

<style lang="scss" scoped>



  .plan-cycle {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 20px;
  }

  .plan-cycle-button {
    margin-right: 10px;
    background-color: transparent;
    border: none;
    color: #fff;
    font-family: 'Roboto';
    font-size: 12px;
    font-weight: bold;
    color: #fcfcfc;
    padding: 10px 20px;

    border-radius: 31px;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
    background-color: #0b0f17;
    margin-bottom: 20px;

    &:last-child {
      margin-right: 0;
    }

    &> span {
      border-radius: 31px;
      background-color: #36255e;
      display: inline-block;
      padding: 0 5px;
      margin-left: 5px;
    }

  }
  .plan-cycle-selected {
    border-radius: 31px;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
    background-color: #6344d3;
  }

  .plan-row {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;

    @media (max-width: 550px) {
      justify-content: space-evenly;
    }

    .test {
      @media (max-width: 550px) {
        flex: 0 45%;
      }
    }
  }

  .plan-card {
    max-height: 370px;
    max-width: 240px;
    flex: 1;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
    background-color: #0f1014;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
    background-color: #0f1014;
    margin-bottom: 20px;
    margin-right: 15px;
    min-height: 370px;
    min-width: 240px;
    flex: 0 45%;
    padding: 22px;
    text-align: center;

    @media (max-width: 550px) {
      margin-right: 0;
      min-width: 150px;
      max-width: 150px;
      margin: auto;
      margin-bottom: 20px;
      padding: 10px;
      min-height: 230px;
    }
  }

  .plan-card-title {
    font-size: 29px;
    font-weight: normal;
    font-style: normal;
    color: #999eab;

    @media (max-width: 550px) {
      font-size: 19px;
    }
  }
  .plan-card-currency-symbol {
    font-size: 25px;
    font-weight: 100;
    display: inline-block;
    height: 38px;
    line-height: 20px;
    vertical-align: super;
    margin-right: 5px;

    @media (max-width: 550px) {
      font-size: 19px;
    }
  }
  .plan-card-currency {
    font-size: 11px;
    font-weight: 100;
    line-height: 13px;
    width: 25px;
    white-space: normal;
    display: inline-block;
    margin-left: 5px;
  }
  .plan-card-cost {
    font-size: 53px;
    font-weight: 100;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.32;
    letter-spacing: normal;
    color: #dcdada;

    @media (max-width: 550px) {
      font-size: 32px;
    }

  }
  .plan-card-discount {
    font-size: 19px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.47;
    letter-spacing: normal;
    text-align: center;
    color: #fd6c8f;
    height: 25px;
    display: inline-block;
  }
  .line-through {
    text-decoration: line-through; 
  }
  .plan-card-description {
    font-size: 14px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.56;
    margin: 5px 0;
    letter-spacing: normal;
    text-align: center;
    color: #999eab;
    height: 57.7px;
    
    @media (max-width: 550px) {
      font-size: 12px;
      line-height: 1.26;
    }
  }
  .plan-card-button {
    border-radius: 2px;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
    border: solid 1px #00ffb3;
    background-color: transparent;
    outline: none;
    font-size: 12px;
    font-weight: bold;
    font-style: normal;
    padding: 10px;
    border-radius: 2px;
  }

  .compare-plans-button {
    border-radius: 2px;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
    border: solid 1px #999eab;
    background-color: #0b0f17;
    outline: none;
    border-radius: 2px;
    margin-bottom: 20px;
  }
  .cancel-subscription-button {
    border-radius: 2px;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
    border: solid 1px #999eab;
    background-color: #0b0f17;
    outline: none;
    border-radius: 2px;
    margin-bottom: 40px;
  }
  .learn-more-button {
    border-radius: 2px;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
    border: solid 1px #999eab;
    background-color: #0b0f17;
    outline: none;
    border-radius: 2px;
    margin-bottom: 40px;
  }

  .compare-plans-row {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    margin: 10px 20px 0;
  }

  .cancel-subscription-row {
    justify-content: flex-start;
    margin: 20px 0;
  }

  .learn-more-row {
    justify-content: flex-end;
    margin: 20px 0;
  }

  
  .profile-inner-container {
    display: flex;
    flex-direction: row;
    flex: 1;
  }
  
  .profile-inner-body {
    display: flex;
    flex-direction: column;
    flex: 1;

    .profile-inner-body-container {

      padding: 20px 50px 0;

      @media (max-width: 600px) {
        padding: 15px 15px;
      }

      @media (max-width: 768px) {
        text-align: center;
      }

      .title {
        font-size: 22px;
        font-weight: 600;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.36;
        margin-bottom: 23px;
        display: inline-block;
      }
    }

  }

  
  
</style>
