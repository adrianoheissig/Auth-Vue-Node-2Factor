<template>
  <main class="form-signin w-100 m-auto">
    <div v-if="notify.cls" :class="`alert alert-${notify.cls}`" role="alert">
      {{ notify.message }}
    </div>

    <form @submit.prevent="submit">
      <h1 class="h3 mb-3 fw-normal">Please insert your email</h1>

      <div class="form-floating">
        <input
          v-model="email"
          type="email"
          class="form-control"
          id="floatingInput"
          placeholder="name@example.com"
        />
        <label for="floatingInput">Email address</label>
      </div>

      <button class="w-100 btn btn-lg btn-primary mt-3" type="submit">
        Submit
      </button>
    </form>
  </main>
</template>

<script>
import { reactive, ref } from "vue";
import axios from "axios";

export default {
  name: "ForgotPage",
  setup() {
    const email = ref();

    const notify = reactive({
      cls: "",
      message: "",
    });

    const submit = async () => {
      try {
        axios.post("forgot", { email: email.value });
        notify.cls = "success";
        notify.message = "Email was sent!";
      } catch (error) {
        notify.cls = "danger";
        notify.message = "Email does not exist!";
      }
    };

    return { email, submit, notify };
  },
};
</script>

<style scoped>
.form-signin {
  max-width: 330px;
  padding: 15px;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
