<template>
  <div class="profile-inner-sidebar">
      <div class="profile-inner-sidebar-title">
        <span>Journal Settings</span>
      </div>
      <div class="profile-inner-sidebar-list-items">
        <div class="profile-inner-sidebar-list-item" v-for="(item, index) in menuItems" :key="index">
          <b-button :class="{'selected': item.menuId == optionSelected}" @click="onCLick(item)" variant="link">{{item.text}}</b-button>
        </div>
      </div>
    </div>
</template>

<script>

  export default {
    name: 'SideBar',
    props: ['optionSelected'],
    data: function () {
      return {
        selected: "",
        menuItems: [
          {
            text: "Trade Settings",
            urlLink: "#/configurations/trades",
            menuId: "trades"
          },
          {
            text: "Notifications",
            urlLink: "#/configurations/notifications",
            menuId: "notif"
          },
          {
            text: "Privacy",
            urlLink: "#/configurations/privacy",
            menuId: "privacy"
          },
          {
            text: "Mentorship",
            urlLink: "#/configurations/mentor",
            menuId: "mentor"
          },
        ]
      }
    },
    mounted: function() {
    },
    methods: {
      onCLick: function(item) {
        window.location = item.urlLink;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .profile-inner-sidebar-title {
    font-size: 14px;
    font-weight: 500;
    color: #c8cacf;
    
  }
  .profile-inner-sidebar-list-items {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding-top: 10px;
    padding-left: 17px;
    font-size: 14px;
    font-weight: 400;
    color: #999eab;
  }
  .profile-inner-sidebar-list-item {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 35px;
    justify-content: flex-start;
    align-items: center;

    .selected, .selected:hover {
      color: #00b399;
    }

    &> button {
      color: #999eab;
    }

    &> button:hover {
      color: #999eab;
    }

  }
  .profile-inner-sidebar {
    display: flex;
    flex-direction: column;
    flex: 1;
    max-width: 240px;
    min-width: 240px;
    padding-top: 32px;
    padding-left: 19px;
    background-color: #181d29;

    @media (max-width: 768px) {
      display: none;
    }
  }
</style>
