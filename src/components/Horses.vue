<script>
import { mapActions, mapState } from "vuex";


export default {
  data: () => ({
  }),
  computed: { ...mapState(["horses"]) },
  methods: {
    ...mapActions(["fetchHorses"]),
    showHorse(id) {
      this.$router.push(`horse/${id}`)
    },
  },
  async created() {
    this.fetchHorses()
  },
  props: {
    limit: { required: false, type: Number },
  }
}
</script>

<template>
  <div class="horse-grid">
    <div v-for="(horse, i) in horses.slice(0, limit || horses.length)" :key="i" class="horse-card"
      @click="showHorse(horse.horse_id)">
      <div class="image-container">
        <img :src="`assets/media/${horse.filename}`" :alt="horse.nickname" loading="lazy" />
        <p class="image-label" v-if="horse.sold">SOLD</p>
      </div>
      <div class="horse-info">
        <p>{{ horse.nickname }}</p>
        <div class="horse-price">${{ horse.price }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.horse-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  padding-bottom: 4rem;
}

.horse-card {
  background-color: #F7F8FA;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border-radius: 8px;
  transition: all 0.1s;
  aspect-ratio: 1;
  width: 16rem;

  .image-container .image-label {
      position: absolute;
      top: 0;
      right: 0;
      background-color: #c1121f;
      color: #fff;
      padding: 0.5rem;
      font-weight: bold;
      font-size: 1.5rem;
      margin: 0;
  }

  &:hover {
    transform: scale(0.98);
  }

  &:active {
    transform: scale(0.95);
  }

  .horse-info {
    padding: 0 1rem;

    p {
      margin-top: .5rem;
      margin-bottom: 0;
      font-family: Poppins;
      font-size: 1.2rem;
      font-family: Helvetica;
      pointer-events: none;
      user-select: none;
      cursor: none;
    }
  }

  .horse-price {
    color: var(--green, #004d40);
    text-align: right;
    font-size: 1rem;
    font-style: normal;
    font-weight: 500;
    text-align: right;
    pointer-events: none;
    user-select: none;
    cursor: none;
  }
}

.delete-button {
  position: absolute;
  right: 0;
  top: 0;
  background-color: #fdfdfd;
  border-radius: 0 0 0 10px;
  padding: 3px;
  z-index: 99999;

  .ov-icon {
    transform: rotate(45deg);
  }
}
</style>