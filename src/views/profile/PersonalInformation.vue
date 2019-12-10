<template>
  <div class="profile-inner-container">
    <SideBar :optionSelected="'personal'"/>
    <div class="profile-inner-body">
      <div class="profile-inner-body-container">
        <span class="title">Personal Information</span>
        <div class="dashboard-widget-container">
          <div class="dashboard-widget-header">
            <h5 class="dashboard-widget-title">Trade Grouping</h5>
          </div>
          <div class="dashboard-widget-body">
            <div class="form-input-row" v-for="(fInput, index) in formInputs" :key="index">
              <span>{{fInput.title}}</span>
              <input type="text" name="" id="" :value="fInput.value">
            </div>
            <div class="form-button-row">
              <b-button class="change-password-button" size="sm" click="">CHANGE PASSWORD</b-button>
            </div>
            <div class="form-button-row text-right">
              <b-button class="ts-green-btn" size="sm" click="">SAVE CHANGES</b-button>
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
      formInputs: [
        {title: "First Name", value: ""},
        {title: "Last Name", value: ""},
        {title: "Email", value: ""},
        {title: "Username", value: ""},
        {title: "Affiliate Link", value: ""},
      ],
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
  .form-button-row {
    margin-bottom: 15px;
  }
  .change-password-button {
    color: #999eab;
    font-size: 12px;
    font-weight: bold;
    font-style: normal;
    background-color: transparent;
    border: solid 1px #999eab;
  }
  .save-changes-button {
    border-radius: 3px;
    background-color: #009792;
    font-size: 12px;
    font-weight: bold;
    font-style: normal;
    color: #fcfdff;
  }
  .form-input-row {
    margin-bottom: 25px;
    &>span {
      font-size: 14px;
      font-weight: 600;
      font-style: normal;
      font-stretch: normal;
      line-height: 1.64;
      letter-spacing: normal;
      text-align: left;
      color: #999eab;
      margin-bottom: 5px;
      display: inline-block;
    }
    &>input {
      width: 100%;
      height: 45px;
      border-radius: 4px;
      border: solid 1px #245b53;
      background-color: #1f242e;
      color: #999eab;
      padding: 0 15px;
      font-size: 16px;
      font-weight: normal;
    }
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
    padding-left: 55px;
    padding-right: 55px;
    padding-top: 30px;
    padding-bottom: 15px;

    transition: padding 0.3s;

    @media (max-width: 600px) {
      padding-left: 25px;
      padding-right: 25px;
    }
  }
</style>
