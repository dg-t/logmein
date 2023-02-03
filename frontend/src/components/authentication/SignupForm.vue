<template>
  <div>
    <h3 class="p-4 text-center">Signup</h3>
    <form class="p-5">
      <div class="form-group form-input-group">
        <input
          id="name"
          type="text"
          class="form-control"
          placeholder="Name *"
          v-model="user.name"
          @blur="validateName"
        />

        <transition name="fade" mode="out-in">
          <p v-if="!isValidName" class="validation">This field is required.</p>
          <p v-else style="visibility: hidden">This field is required.</p>
        </transition>
      </div>
      <div class="form-group form-input-group">
        <input
          id="email"
          type="email"
          class="form-control"
          placeholder="E-mail *"
          v-model="user.email"
          @blur="validateEmail"
        />

        <transition name="fade" mode="out-in">
          <p v-if="!isValidEmail" class="validation">This field is required.</p>
          <p v-else style="visibility: hidden">This field is required.</p>
        </transition>
      </div>
      <div class="form-group form-input-group">
        <input
          id="password"
          type="password"
          class="form-control"
          placeholder="Password *"
          v-model="user.password"
          @blur="validatePassword"
        />

        <transition name="fade" mode="out-in">
          <p v-if="!isValidPassword" class="validation">
            This field is required.
          </p>
          <p v-else style="visibility: hidden">This field is required.</p>
        </transition>
      </div>
      <div class="form-group form-input-group">
        <input
          id="password-confirm"
          type="password"
          class="form-control"
          placeholder="Confirm password *"
          v-model="user.passwordConfirm"
          @blur="validatePasswordConfirm"
        />

        <transition name="fade" mode="out-in">
          <p v-if="!isValidPasswordConfirm" class="validation">
            This field is required.
          </p>
          <p v-else style="visibility: hidden">This field is required.</p>
        </transition>
      </div>

      <div class="button-container py-3">
        <button @click.prevent="signup">Signup</button>
      </div>
      <div>
        <p>
          Already have an account?
          <a href="#" class="button-signup" @click="login"> Login </a>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'SignupForm',
  data() {
    return {
      user: {
        name: '',
        email: '',
        password: '',
        passwordConfirm: '',
      },
      isValidName: true,
      isValidEmail: true,
      isValidPassword: true,
      isValidPasswordConfirm: true,
    };
  },
  methods: {
    validateName() {
      return !this.user.name.length
        ? (this.isValidName = false)
        : (this.isValidName = true);
    },
    validateEmail() {
      return !this.user.email.length
        ? (this.isValidEmail = false)
        : (this.isValidEmail = true);
    },
    validatePassword() {
      return !this.user.password.length
        ? (this.isValidPassword = false)
        : (this.isValidPassword = true);
    },
    validatePasswordConfirm() {
      return !this.user.passwordConfirm.length
        ? (this.isValidPasswordConfirm = false)
        : (this.isValidPasswordConfirm = true);
    },
    signup() {
      if (
        !this.validateName() &&
        !this.validateEmail() &&
        !this.validatePassword() &&
        !this.validatePasswordConfirm()
      ) {
        return;
      }
      // SEND TO BACK
      // INIT DATA
      this.user.name = '';
      this.user.email = '';
      this.user.password = '';
      this.user.passwordConfirm = '';

      return;
    },
    login() {
      console.log('Go to login');
    },
  },
};
</script>

<style scoped>
/** FORM */

form {
  margin: 5% auto;
  width: 80%;
  max-width: 900px;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 2rem;
}

/** FORM INPUTS */

.form-input-group {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

input {
  width: 100%;
  padding: 10px;
  font-size: 90%;
}

input:focus {
  outline: none;
  box-shadow: 0 1px 1px rgba(229, 103, 23, 0.1) inset,
    0 0 5px rgba(0, 170, 255, 0.3);
}

/** BUTTON */

.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

button {
  padding: 5px 20px;
  cursor: pointer;
  background-color: white;
  color: #07c;
  border: 1px solid #0af;
  border-radius: 5px;
  transition: 0.6s;
  box-shadow: 1px 2px 2px #888888;
  text-decoration: none;
}

button:focus {
  outline: none;
  box-shadow: 0 0 1px 1px #0af;
}

button:hover {
  color: white;
  background-color: #0af;
  transition: all 0.5s ease;
}

.button-forgot {
  font-size: 80%;
  color: rgb(177, 177, 177);
  text-decoration: none;
}

.button-forgot:hover {
  color: rgb(123, 123, 123);
  text-decoration: underline;
}

.button-signup {
  font-weight: 600;
  color: #07c;
  text-decoration: none;
}

.button-signup:hover {
  color: #0af;
  text-decoration: underline;
}

/** VALIDATION TEXT */
.validation {
  font-size: 60%;
  color: rgba(255, 0, 0, 0.7);
  font-style: italic;
  text-decoration: underline;
  width: 100%;
  padding: 5px;
  margin-left: 2%;
}

/** ADD TRANSITION TO VALIDATION */

.fade-enter-from {
  opacity: 0;
  transform: translateY(-8px);
}

.fade-enter-active {
  font-size: 60%;
  color: #f00;
  font-style: italic;
  text-decoration: underline;
  width: 100%;
  padding: 5px;
  margin-left: 2%;
  transition: all 0.5s ease-out;
}

.fade-leave-active {
  font-size: 60%;
  color: #f00;
  font-style: italic;
  text-decoration: underline;
  width: 100%;
  padding: 5px;
  margin-left: 2%;
  transition: all 0.5s ease-out;
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
.fade-move {
  transition: all 0.5s ease-out;
}

/** MEDIA QUERY */

@media only screen and (max-width: 500px) {
  form {
    margin: 5% auto;
    width: 90%;
    padding: 0.8rem !important;
  }
  button {
    font-size: 90%;
  }
}
</style>
