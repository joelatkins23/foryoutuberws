<template>
  <div class="profile-inner-container">
    <SideBar optionSelected="trades"/>
    <div class="profile-inner-body">
      <div class="profile-inner-body-container">
        <span class="title">Trade Settings</span>

        <div class="dashboard-widget-container">
          <div class="dashboard-widget-header">
            <h5 class="dashboard-widget-title">Trade Grouping</h5>
          </div>
          <div class="dashboard-widget-body">
            <div class="ts-vertical-options">
              <b-form-group>
                <div v-for="(item, key) in tradeGrouping" :key="key" class="ts-vertical-options-inner-container">
                  <span class="ts-vertical-options-inner-container-title">{{item.title}}</span>
                  <b-form-checkbox v-model="tradeGroupingSelected[key]" :value="item.value">{{item.description}}</b-form-checkbox>
                </div>
              </b-form-group>
            </div>
          </div>
        </div>

        <div class="dashboard-widget-container">
          <div class="dashboard-widget-header special-title">
            <h5 class="dashboard-widget-title">Instruments</h5>
            <span class="dashboard-widget-subtitle">Pick the instruments you trade.</span>
          </div>
          <div class="dashboard-widget-body">
            <div class="ts-vertical-options ts-vertical-options-labels ts-vertical-options-small">
              <b-form-group>
                <div v-for="(item, key) in instruments" :key="key" class="ts-vertical-options-inner-container">
                  <b-form-checkbox v-model="instrumentsSelected[key]" :value="item.value">{{item.title}}</b-form-checkbox>
                </div>
              </b-form-group>
            </div>
          </div>
        </div>

        <div class="dashboard-widget-container">
          <div class="dashboard-widget-header special-title">
            <h5 class="dashboard-widget-title">Instruments</h5>
            <span class="dashboard-widget-subtitle">Pick the instruments you trade.</span>
          </div>
          <div class="dashboard-widget-body">
            <div class="ts-vertical-options ts-vertical-options-labels ts-vertical-options-small">
              <b-form-group>
                <div v-for="(item, key) in instruments2" :key="key" class="ts-vertical-options-inner-container">
                  <b-form-checkbox v-model="instruments2Selected[key]" :value="item.value">{{item.title}}</b-form-checkbox>
                </div>
              </b-form-group>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>

import SideBar from './SideBar'

export default {
  name: 'PersonalInformation',
  components: {
    SideBar
  },
  data () {
    return {
      tradeGrouping: [
        {title: "Normal", value: 1, description: "Group trades by instrument, side changes and short period of time between executions. Options Traders: Select this option If you are using speeds strategies. Trades are grouped based on instruments."},
        {title: "Normal", value: 2, description: "Group trades by instrument, side changes and short period of time between executions. Options Traders: Select this option If you are using speeds strategies. Trades are grouped based on instruments."},
        {title: "Normal", value: 3, description: "Group trades by instrument, side changes and short period of time between executions. Options Traders: Select this option If you are using speeds strategies. Trades are grouped based on instruments."},
      ],
      tradeGroupingSelected: [],
      instruments: [
        {title: "Stocks", value: 1},
        {title: "Forex", value: 2},
        {title: "Normal", value: 3},
      ],
      instrumentsSelected: [],
      instruments2: [
        {title: "Return $", value: 1},
        {title: "Return $", value: 2},
        {title: "Normal", value: 3},
        {title: "Return %", value: 4},
        {title: "Normal", value: 5},
        {title: "Return Net", value: 6},
        {title: "Normal", value: 7},
        {title: "Cost", value: 8},
        {title: "Normal", value: 9},
        {title: "Normal", value: 10},
        {title: "Cost", value: 11},
        {title: "Normal", value: 12},
      ],
      instruments2Selected: [],
    }
  },
  mounted: function() {
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
  .special-title {
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    height: 65px;

    &> span {
      font-size: 10px;
      color: #999eab;
      display: inline-block;
      margin-top: 5px;
    }
  }
</style>


<style lang="scss">

  .ts-vertical-options {
    max-width: none;
    margin: 0;

    display: flex;
    flex: 1;
    // min-width: 330px;
    flex-wrap: wrap;
    min-height: 80px;
    justify-content: space-between;

    .ts-vertical-options-inner-container {
      margin-bottom: 20px;
      padding: 0 10px 20px;
      border-bottom: 1px dashed rgba(153, 158, 171, 0.2);

      &:last-child {
        border-bottom: none;
        margin-bottom: 0;
      }

      .ts-vertical-options-inner-container-title {
        font-size: 14px;
        font-weight: bold;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.36;
        letter-spacing: normal;
        text-align: left;
        color: #999eab;
      }
    }
  }

  .ts-vertical-options fieldset > div {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }

  .ts-vertical-options fieldset > div div.custom-control {
      flex: 0 48%;
      margin: 0;
      padding: 0;
      width: 100%;
  }

  .ts-vertical-options fieldset > div div.custom-control .custom-control-label {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 80%;
    font-weight: 300;
    font-size: 12px;
    color: #999eab;
    white-space: normal;
  }

  .ts-vertical-options.ts-vertical-options-labels fieldset > div div.custom-control .custom-control-label {
    font-size: 12px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.36;
    letter-spacing: normal;
    text-align: left;
    color: #999eab;
  }
  .ts-vertical-options.ts-vertical-options-small .ts-vertical-options-inner-container {
    margin-bottom: 10px;
    padding: 0 10px 10px;
    height: 34px;
    &:last-child {
      margin-bottom: 0;
    }
  }

  .ts-vertical-options fieldset > div div.custom-control .custom-control-label::before {
    right: -5.5rem;
    left: unset;
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 0.15rem;
    margin: auto;
    bottom: 0;
    top: 0;

    @media (max-width: 600px) {
      right: -3.5rem;
    }
  }

  .ts-vertical-options fieldset > div div.custom-control .custom-control-label::after {
    right: -5.5rem;
    left: unset;
    width: 0.8rem;
    height: 0.8rem;
    background-size: 70% 70%;
    margin: auto;
    bottom: 0;
    top: 0;

    @media (max-width: 600px) {
      right: -3.5rem;
    }
  }
    
  .ts-vertical-options > fieldset  {
    width: 100%;
    margin: 0;  
  }

  .ts-vertical-options .custom-control-input:checked ~ .custom-control-label::before {
      color: #444;
      border-color: #00a28b;
      background-color: #00CFB1;
  }
  
  .save-changes-button {
    border-radius: 3px;
    background-color: #009792;
    font-size: 12px;
    font-weight: bold;
    font-style: normal;
    color: #fcfdff;
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

  div > .dashboard-widget-container {
    flex: none;
    max-width: 500px;
    text-align: left;

    @media (max-width: 768px) {
      margin: 15px auto 0;
    }
  }

  div > .dashboard-widget-body {
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 20px;
    padding-bottom: 15px;

    transition: padding 0.3s;

    @media (max-width: 600px) {
      padding-left: 25px;
      padding-right: 25px;
    }
  }

  div > .dashboard-widget-title {
    color: #999eab !important;
  }

</style>
