<template>
  <v-layout row wrap justify-center align-center class="main">
    <v-layout
      row
      wrap
      justify-center
      align-center
      class="main"
      v-if="hasAccount"
    >
      <v-card color="white">
        <v-card-title primary-title>
          <h2 class="white-text">Log in</h2>
        </v-card-title>
        <v-card-text>
          <v-text-field
            label="Email"
            type="email"
            v-model="loginData.email"
          ></v-text-field>
          <v-text-field
            label="Password"
            type="password"
            v-model="loginData.password"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-layout row wrap justify-center>
            <v-btn color="success" @click="login()">Log in</v-btn>
            <v-btn color="warning" @click="hasAccount = false">Register</v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-layout>
    <v-layout row wrap justify-center align-center class="main" v-else>
      <v-card color="white">
        <v-card-title primary-title>
          <h2 class="white-text">Register</h2>
        </v-card-title>
        <v-card-text>
          <v-text-field
            label="Name"
            type="name"
            v-model="registerData.name"
          ></v-text-field>
          <v-text-field
            label="Email"
            type="email"
            v-model="registerData.email"
          ></v-text-field>
          <v-text-field
            label="Password"
            type="password"
            v-model="registerData.password"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-layout row wrap justify-center>
            <v-btn color="success" @click="hasAccount = true">Log in</v-btn>
            <v-btn color="warning" @click="register()">Register</v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-layout>
  </v-layout>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      hasAccount: true,
      loginData: new Object(),
      registerData: new Object(),
    };
  },
  methods: {
    login() {
      let data = {
        email: this.loginData.email,
        password: this.loginData.password,
      };
      axios
        .post("http://localhost:8083/api/login", data)
        .then((res) => {
          console.log("asd");
          let user = res.data.user;
          if (user != null) {
            localStorage.setItem("user", JSON.stringify(user));
            this.$router.push("/user");
          }
        })
        .catch((error) => {
          console.log("error");
        });
    },
    register() {
      let data = {
        name: this.registerData.name,
        email: this.registerData.email,
        password: this.registerData.password,
      };
      axios.post("http://localhost:8083/api/users", data).then((res) => {
        console.log(res.data.user);
      });
    },
  },
};
</script>
<style scoped>
.main {
  min-height: 100vh;
}
</style>