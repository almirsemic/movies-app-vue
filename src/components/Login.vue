<template>
  <div>
    <div class="invalid_session" v-if="failVerification">
      <h2>Invalid Session</h2>
      <p>
        We couldn't validate your login session. You can refresh this page and
        try again.
      </p>
    </div>
    <div class="container">
      <div class="text">
        <h2>Login to your account</h2>
        <p>
          In order to use the editing and rating capabilities of TMDB, as well
          as get personal recommendations you will need to login to your
          account. If you do not have an account, registering for an account is
          free and simple.
          <a href="https://www.themoviedb.org/signup" target="_blank"
            >Click here</a
          >
          to get started.
        </p>
        <br />
        <p>
          If you signed up but didn't get your verification email,
          <a
            href="https://www.themoviedb.org/resend-email-verification"
            target="_blank"
            >click here</a
          >
          to have it resent.
        </p>
      </div>
      <div class="verification_invalid" v-if="failVerification">
        <h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-exclamation-circle"
            viewBox="0 0 16 16"
          >
            <path
              d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
            />
            <path
              d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"
            />
          </svg>
          Account verification required
        </h2>
        <li>
          Invalid username and/or password: You did not provide a valid login.
        </li>
      </div>
      <form class="username_pasword" @submit.prevent="login">
        <label>Username</label>
        <input type="text" class="form-control" v-model="form.username" />
        <label>Password</label>
        <input type="password" class="form-control" v-model="form.password" />
        <button type="submit" class="btn btn-primary">Login</button>
        <button type="button" class="btn btn-light">Reset password</button>
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
        request_token: "",
      },
      sessionId: "",
      failVerification: false,
      account: null,
      apiKey: process.env.VUE_APP_API_KEY,
      success: false,
    };
  },

  methods: {
    async login() {
      try {
        const newTokenResponse = await axios.get(
          `authentication/token/new?api_key=${this.apiKey}`
        );
        this.form.request_token = newTokenResponse.data.request_token;
        const validationTokenResponse = await axios.post(
          `authentication/token/validate_with_login?api_key=${this.apiKey}`,
          this.form
        );
        if (validationTokenResponse) {
          this.success = validationTokenResponse.data.success;
          const accountResonse = await axios.post(
            `authentication/session/new?api_key=${this.apiKey}`,
            {
              request_token: this.form.request_token,
            }
          );
          this.sessionId = accountResonse.data.session_id;
          localStorage.setItem("session", JSON.stringify(accountResonse));
          const sessionIdResponse = await axios.get(
            `account?api_key=${this.apiKey}&session_id=${this.sessionId}`
          );
          this.account = sessionIdResponse.data;
          localStorage.setItem("user", JSON.stringify(sessionIdResponse.data));
          this.$store.dispatch(
            "user",
            JSON.parse(localStorage.getItem("user"))
          );
          if (this.success) {
            this.$router.replace({ name: "home" });
          }
        }
      } catch (error) {
        console.error(error), (this.failVerification = true);
        return;
      }
    },
  },
  computed: {
    ...mapGetters(["user"]),
  },
};
</script>

<style scoped>
.invalid_session {
  background-color: #01b4e4;
  height: 100px;
  text-align: center;
  color: white;
  padding: 10px;
}
.invalid_session h2 {
  font-weight: 600;
  font-size: 1.5em;
}
.invalid_session p {
  font-size: 1.3em;
}
.text {
  margin: 30px 0;
}
.text h2 {
  font-weight: 600;
  font-size: 1.5em;
}
.text a {
  text-decoration: none;
}
.text a:hover {
  text-decoration: underline;
}
.verification_invalid {
  border: 1px solid silver;
  box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
  height: 140px;
  border-radius: 5px;
  margin: 40px 0;
}
.verification_invalid h2 {
  font-weight: 600;
  font-size: 1.2em;
  height: 60px;
  background-color: rgba(228, 15, 57, 0.945);
  padding: 15px;
  color: white;
  border-radius: 5px 5px 0 0;
}
.verification_invalid li {
  max-width: 1200px;
  padding: 3px;
  margin: 20px 0 0 50px;
}
.btn-light {
  background-color: white;
  border: white;
}
.username_pasword {
  margin: 80px 0;
}
.username_pasword input,
label {
  margin: 5px 0;
}
.username_pasword button {
  margin: 40px 0;
  margin-right: 8px;
}
</style>