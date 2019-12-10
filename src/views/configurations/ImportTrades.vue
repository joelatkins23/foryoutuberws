<template>
  <div class="profile-inner-container">
    <SideBar optionSelected="trades"/>
    <div class="profile-inner-body">
      <div class="profile-inner-body-container">
        <span class="title">Import Trades</span>

        <div class="dashboard-widget-container">
          <div class="dashboard-widget-header">
            <h5 class="dashboard-widget-title">Import from your broker or trading platform</h5>
          </div>
          <div class="dashboard-widget-body">
            <div class="import-trades-panels">
              <div class="import-trades-left-panel">
                <div class="input-row">
                  <span class="input-row-title">Select Broker</span>
                  <b-input class="input-row-input-text" placeholder="Type your broker or trading platform"></b-input>
                </div>
                <div class="input-row">
                  <span class="input-row-title">Portfolio</span>
                  <b-input class="input-row-input-text" placeholder="Type your broker or trading platform"></b-input>
                </div>

                <div>
                  <b-button
                    @click="showOption1 = !showOption1"
                    class="show-option"
                    variant="link"
                  >
                    Option #1
                    <span :class="!showOption1 ? 'fa fa-lg fa-caret-down' : 'fa fa-lg fa-caret-up'"></span>
                  </b-button>
                  <b-collapse class="mt-2" v-model="showOption1" id="collapse4">
                    <span class="show-option-title">Import from a scv file</span>
                    <div class="button-row">
                      <b-button class="apply-button" size="sm" click="">SELECT FILE TO IMPORT</b-button>
                    </div>
                  </b-collapse>
                </div>
                <div style="width: 100%; height: 1px; border-bottom: 1px dashed rgba(152, 157, 172, 0.3);" class="mt-4 mb-3"></div>
                <div>
                  <b-button
                    @click="showOption2 = !showOption2"
                    class="show-option"
                    variant="link"
                  >
                    Option #2
                    <span :class="!showOption2 ? 'fa fa-lg fa-caret-down' : 'fa fa-lg fa-caret-up'"></span>
                  </b-button>
                  <b-collapse class="mt-2" v-model="showOption2" id="collapse4">
                    <span class="show-option-title">Copy and paste the data from your browser as describe in the instructions here</span>
                    <b-form-textarea
                      id="textarea"
                      rows="3"
                      max-rows="6"
                      no-resize=""
                      class="option-2-textarea"
                    />
                  </b-collapse>
                </div>

              </div>
              <div class="import-trades-right-panel">
                <span class="input-row-title">Video Tutorial</span>
                <div class="video-container"></div>
                <div class="instructions">
                  <span class="input-row-title">Instructions's E*TRADE</span>
                  <p class="show-option-title">
                    To import trade data from E-Trade, follow these steps:
                    Log into E-Trade web site.<br/><br/>
                    Click "Alerts" to open a separate Alerts window.
                    By clicking and dragging, select the rows of data you wish to import, and press Ctrl+C (or Cmd+C) to copy.
                    Here on the import page, click in the "Data" box, and press Ctrl+V (Cmd+V) to paste the data into the box, then click Import.
                  </p>
                </div>
                <div class="button-row mt-5 text-right">
                  <b-button class="ts-green-btn" size="sm" click="">IMPORT TRADES</b-button>
                </div>
              </div>
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
  name: 'ImportTrades',
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
      showOption1: true,
      showOption2: false
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
  .instructions {
    flex: 1;
  }
  .import-trades-panels {
    display: flex;
    flex-direction: row;

    @media (max-width: 600px) {
      flex-direction: column;
    }

    .button-row {
      padding-top: 15px;
      width: 100%;
    }
    
    .apply-button {
      color: #999eab;
      font-size: 12px;
      font-weight: bold;
      font-style: normal;
      background-color: transparent;
      border: solid 1px #999eab;
      width: 100%;
    }

    .import-trades-left-panel {
      display: flex;
      flex-direction: column;
      flex: 1;
      padding: 15px;
      max-width: 300px;

      @media (max-width: 768px) {
        max-width: none;
      }
    }

    .import-trades-right-panel {
      display: flex;
      flex-direction: column;
      flex: 1;
      padding: 15px;
    }
  }

  .option-2-textarea {
    background-color: #121721;
    border: none;
    border-radius: 0;
    margin-top: 15px;
    width: 100%;
    min-height: 200px;
  }

  .video-container {
    background-color: #121721;
    border: none;
    border-radius: 0;
    margin-bottom: 15px;
    width: 100%;
    min-height: 200px;
  }

  .input-row-title {
    font-size: 12px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.33;
    letter-spacing: normal;
    text-align: left;
    color: #999eab;
    display: inline-block;
    margin-bottom: 10px;
  }

  .input-row-input-text {
    background-color: #121721;
    border-radius: 0;
    font-size: 12px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.33;
    letter-spacing: normal;
    text-align: left;
    color: #999eab;
    margin-bottom: 20px;
  }

  .show-option {
    font-size: 12px;
    font-weight: bold;
    letter-spacing: normal;
    color: #999eab;
    padding: 6px 0;

    &> span {
      margin-left: 10px;
    }
  }

  .show-option-title {
    font-size: 11px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.43;
    letter-spacing: normal;
    text-align: left;
    color: #999eab;
    display: inline-block;
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

      padding: 20px 50px;

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
    max-width: 660px;
    text-align: left;

    @media (max-width: 768px) {
      margin: 15px auto 0;
    }
  }

  div > .dashboard-widget-body {
    padding: 0;

    // @media (max-width: 600px) {
    //   padding-left: 25px;
    //   padding-right: 25px;
    // }
  }

  div > .dashboard-widget-title {
    color: #999eab !important;
  }

</style>
