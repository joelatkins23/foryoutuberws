<template>
  <div class="profile-inner-container">
    <SideBar optionSelected="privacy"/>
    <div class="profile-inner-body">
      <div class="profile-inner-body-container">
        <span class="title">Privacy</span>

        <div class="dashboard-widget-container">
          <div class="dashboard-widget-header">
            <h5 class="dashboard-widget-title">Trades</h5>
          </div>
          <div class="dashboard-widget-body">
            <div class="ts-vertical-options ts-vertical-options-labels ts-vertical-options-small">
              <b-form-group>
                <div v-for="(item, key) in trades" :key="key" class="ts-vertical-options-inner-container">
                  <b-form-checkbox v-model="tradesSelected[key]" :value="item.value">{{item.title}}</b-form-checkbox>
                </div>
              </b-form-group>
              <div class="button-row">
                <b-button class="apply-button" size="sm" click="">APPLY TO ALL</b-button>
              </div>
            </div>
          </div>
        </div>

        <div class="dashboard-widget-container">
          <div class="dashboard-widget-header">
            <h5 class="dashboard-widget-title">Data to Share</h5>
          </div>
          <div class="dashboard-widget-body">
            <div class="ts-vertical-options ts-vertical-options-labels ts-vertical-options-small">
              <b-form-group>
                <div v-for="(item, key) in dataToShare" :key="key" class="ts-vertical-options-inner-container">
                  <b-form-checkbox v-model="dataToShareSelected[key]" :value="item.value">{{item.title}}</b-form-checkbox>
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
  name: 'Privacy',
  components: {
    SideBar
  },
  data () {
    return {
      trades: [
        {title: "Private", value: 1},
        {title: "Public", value: 2},
      ],
      tradesSelected: [],
      dataToShare: [
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
      dataToShareSelected: [],
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
    min-width: 330px;
    flex-wrap: wrap;
    min-height: 80;
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

  .button-row {
    padding-top: 15px;
    border-top: 1px dashed rgba(153, 158, 171, 0.2);
    width: 100%;
  }
  
  .apply-button {
    color: #999eab;
    font-size: 12px;
    font-weight: bold;
    font-style: normal;
    background-color: transparent;
    border: solid 1px #999eab;
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

  .profile-inner-body .profile-inner-body-container {
    padding: 20px 50px;
  }
</style>
