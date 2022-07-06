<template>
  <main class="form-signin w-100 m-auto">
    <form @submit.prevent="submit">
      <h1 class="h3 mb-3 fw-normal">Please Register</h1>

      <div class="form-floating">
        <input
          v-model="data.first_name"
          class="form-control"
          placeholder="First Name"
        />
        <label>First Name</label>
      </div>
      <div class="form-floating">
        <input
          v-model="data.last_name"
          class="form-control"
          placeholder="Last Name"
        />
        <label>Last Name</label>
      </div>
      <div class="form-floating">
        <input
          v-model="data.email"
          type="email"
          class="form-control"
          placeholder="name@example.com"
        />
        <label>Email address</label>
      </div>
      <div class="form-floating">
        <input
          v-model="data.password"
          type="password"
          class="form-control"
          placeholder="Password"
        />
        <label>Password</label>
      </div>
      <div class="form-floating">
        <input
          v-model="data.password_confirm"
          type="password"
          class="form-control"
          placeholder="Confirm Password"
        />
        <label>Confirm Password</label>
      </div>

      <button class="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
    </form>
  </main>
</template>

<script lang="ts">
import { reactive } from "@vue/reactivity";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  name: "RegisterPage",
  setup() {
    const data = reactive({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password_confirm: "",
    });

    const router = useRouter();

    const submit = async () => {
      await axios.post("register", data);

      await router.push("/login");
    };

    return { data, submit };
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
