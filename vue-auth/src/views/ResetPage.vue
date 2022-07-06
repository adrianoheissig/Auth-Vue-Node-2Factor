<template>
  <main class="form-signin w-100 m-auto">
    <form @submit.prevent="submit">
      <h1 class="h3 mb-3 fw-normal">Please reset your password</h1>

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
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

export default {
  name: "ResetPage",
  setup() {
    const data = reactive({
      password: "",
      password_confirm: "",
    });

    const router = useRouter();

    const route = useRoute();

    const submit = async () => {
      await axios.post("reset", { ...data, token: route.params.token });

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
