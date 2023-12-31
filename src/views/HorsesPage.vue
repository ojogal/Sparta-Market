<script>
import Horses from "@/components/Horses.vue"
export default {
  name: "HorsesPage",
  components: { Horses }
}
</script>

<template>
  <div class="horses-section limited-width" id="horses-section">
    <h1>Horses</h1>
    <p>Search and discover for all our offers</p>
    <Horses />
  </div>
</template>

<style scoped lang="scss"></style>