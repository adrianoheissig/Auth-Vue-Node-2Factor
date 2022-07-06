<template>
  <Nav />
  <router-view />>
</template>

<script>
import Nav from "@/components/NavBar";
export default {
  name: "App",
  components: { Nav },
};
</script>
