<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <b-form>
                  <h1>Tradersync</h1>
                  <p class="text-muted">Sign In to your account</p>
                  <p v-if="dataRequired" class="text-danger">Data required</p>
                  <p v-if="waiting" class="text-warning">{{waitingMessage}}</p>
                  <p v-if="loginFailed" class="text-danger">{{loginFailedMessage}}</p>
                  <p v-if="notResponse" class="text-danger">Server not respond, please try later.</p>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend><b-input-group-text><i class="icon-user"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input v-model="user" @keyup.enter="loginUser" type="text" class="form-control" placeholder="Username" autocomplete="username email" />
                  </b-input-group>
                  <b-input-group class="mb-4">
                    <b-input-group-prepend><b-input-group-text><i class="icon-lock"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input v-model="password" @keyup.enter="loginUser" type="password" class="form-control" placeholder="Password" autocomplete="current-password" />
                  </b-input-group>
                  <b-row>
                    <b-col cols="6">
                      <b-button @click="loginUser" variant="primary" class="px-4">Login</b-button>
                    </b-col>
                    <b-col cols="6" class="text-right">
                      <b-button variant="link" class="px-0">Forgot password?</b-button>
                    </b-col>
                  </b-row>
                </b-form>
              </b-card-body>
            </b-card>
            <b-card no-body class="text-white bg-primary py-5 d-md-down-none" style="width:44%">
              <b-card-body class="text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <b-button variant="primary" class="active mt-3">Register Now!</b-button>
                </div>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>

import Vue from 'vue'
import ServicesLogin from '@/views/pages/ServicesLogin'
import VueSweetalert2 from 'vue-sweetalert2'

Vue.use(VueSweetalert2)

export default {
  name: 'Login',
    created: function() {
    this.autoLogin()
  },
  data: function () {
    return {
      user: '',
      password: '',
      dataRequired: false,
      loginFailed: false,
      loginFailedMessage: '',
      waiting: false,
      waitingMessage: 'Please wait...',
      notResponse: false,
      roles: [],
      selectedRole: null,
      ForgotPassword:false,
      model:{
            first_name :'',
            last_name : '',
            usename : '',
            email : '',
            role_id : null
      },
  //    btndis: true,
      show : true
    }
  },
  methods: {
      autoLogin(){
      if (this.$route.query.t) {
        ServicesLogin.autoLogin(this.$route.query.t)
          .then(response => {
            this.waiting = false
            this.$router.replace('/dashboard')
          })
          .catch(error => {
            this.$swal( { title: error.data.title,
                          text:  error.data.message,
                          type:  error.data.status,
                          showCancelButton: false})
            this.waiting = false
          })
      }

    },
    register () {
      Vue.swal('Opss!', 'Register is disabled', 'error')
    },
    loginUser () {
      ServicesLogin.login(this.user, this.password)
        .then(response => {
          this.waiting = false
          this.$router.replace('/dashboard')
        })
        .catch(error => {
          this.$swal( { title: error.data.title,
                        text:  error.data.message,
                        type:  error.data.status,
                        showCancelButton: false})
          this.waiting = false
        })
    },
  }
}
</script>
