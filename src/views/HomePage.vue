<script>
import { mapActions, mapState } from "vuex";
import Horses from "@/components/Horses.vue";

export default {
  components: { Horses },
  name: "HomePage",
  data: () => ({}),
  computed: { ...mapState(["horses"]) },
  methods: {
    ...mapActions(["fetchHorses", "fetchMedia"]),
    showHorse(id) {
      this.$router.push(`/horse/${id}`)
    },
    horsesPage() {
      this.$router.push(`/horses`)
    },
    scrollTohorses() {
      document.getElementById("horses-section").scrollIntoView({ behavior: "smooth" })
    },
  },
}
</script>

<template>
  <div class="heading-container">
    <div class="limited-width">
      <div class="heading-card">
        <h1>Horse market</h1>
        <p>Search or buy our horses from Sparta Club internationally</p>
        <button @click="scrollTohorses">Discover horses</button>
      </div>
    </div>
  </div>
  <div class="horses-section" id="horses-section">
    <h1>Horses</h1>
    <p>Search and discover our offers</p>
    <Horses :limit="8" />
    <button @click="horsesPage">All offers</button>
  </div>
</template>

<style scoped lang="scss">
.heading-container {
  height: 100vh;
  background-image: url("/assets/background/horses_background.jpg");
  background-position: 50% 50%;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
}
.heading-card {
  @media (min-width: 577px) {
    max-width: 38rem;
  }
  height: 23rem;
  border-radius: .5rem;
  display: flex;
  flex-direction: column;
  align-items: right;
}
.heading-card h1 {
  margin-top: 0;
  margin-bottom: 0;
  height: 5rem;
  color: #F7F8FA;
  font-family: Poppins;
  font-size: 4rem;
  font-style: normal;
  font-weight: 500;
  pointer-events: none;
  user-select: none;
  cursor: none;
}
.heading-card p {
  max-width: 520px;
  color: #F7F8FA;
  font-size: 1.2rem;
  margin-bottom: 2.80rem;
  pointer-events: none;
  user-select: none;
  cursor: none;
}
.heading-card button {
  border-radius: 0.25rem;
  border: none;
  font-size: 1.2rem;
  background: var(--green, #004d40);
  padding: 1rem 2.75rem;
  align-items: flex-start;
  color: #FFF;
  max-width: 20rem;
  user-select: none;
  &:hover {
    transform: scale(1.05);
  }
  &:active {
    transform: scale(0.95);
  }
  transition: all 100ms ease-in-out;
}
</style>