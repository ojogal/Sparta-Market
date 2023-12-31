<script>
import Contact from "@/components/Contact.vue";

export default {
  name: "ContactPage",
  components: { Contact },
}
</script>

<template>
  <div class="main">
    <Contact />
  </div>
</template>

<style scoped lang="scss">
.main {
  min-height: 100vh;
}
</style>