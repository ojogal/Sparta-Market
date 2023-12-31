<script>
import { mapState, mapActions } from "vuex";
import ImageCarousel from "../components/ImageCarousel.vue";
import LeaveRequest from "../components/LeaveRequest.vue";
import galeryMixin from "../mixins/galery.mixin";

export default {
  name: "HorsePage",
  mixins: [galeryMixin],
  data: () => ({
    leaveMessage: false
  }),
  computed: {
    ...mapState(["horse", "media"]),
    images() {
      if (!this.media.length) return [];
      let result = [];
      for (const object of this.media) {
        result.push(`/assets/media/${object.filename}`)
      }
      return result
    }
  },
  methods: {
    ...mapActions(["fetchHorse", "fetchMedia", "clearHorse"]),
    horsesPage() {
      this.$router.push("/horses")
    }
  },
  created() {
    this.fetchHorse(this.$route.params.id);
    this.fetchMedia(this.$route.params.id);
  },
  watch: {},
  components: { ImageCarousel, LeaveRequest },
  beforeUnmount() {
    this.clearHorse()
  }
};
</script>

<template>
  <div class="limited-width">
    <div class="centered-container">
      <div class="left-column">
        <ImageCarousel :slides="images" :usePagination="false" stretch="vertical" />
      </div>
      <div class="right-column">
        <LeaveRequest v-if="leaveMessage" @backClicked="leaveMessage = false" />
        <div v-if="leaveMessage === false">
          <div class="horse-options">
            <div class="horse-data">
              <h1>{{ horse.nickname }}</h1>
              <p class="sold-label" v-if="horse.sold">SOLD</p>
            </div>
            <p>${{ horse.price }}</p>
          </div>
          <div class="horse-specs">
            <div class="horse-spec">
              <div class="field-name">birthyear</div>
              <div class="field-value">{{ horse.birthyear }}</div>
            </div>
            <div class="horse-spec">
              <div class="field-name">color</div>
              <div class="field-value">{{ horse.color }}</div>
            </div>
            <div class="horse-spec">
              <div class="field-name">breed</div>
              <div class="field-value">{{ horse.breed }}</div>
            </div>
            <div class="horse-spec">
              <div class="field-name">discipline</div>
              <div class="field-value">{{ horse.discipline }}</div>
            </div>
          </div>
          <img :src="`/assets/media/ancestry/${horse.ancestry}`" alt="graph" class="ancestry-image" style=""
            draggable="false"
            @click="() => showImage([`/assets/media/ancestry/${horse.ancestry}`], 0, 'ancestry-backdrop', 0.6)">
        </div>
        <div class="buttons-wrapper">
          <button class="go-back-button first-child" v-if="leaveMessage === false" @click="horsesPage">Back to
            Horses</button>
          <button class="request-button" @click="leaveMessage = true" v-if="!horse.sold && !leaveMessage">Make a
            request</button>
          <button class="go-back-button second-child" v-show="leaveMessage === true" @click="leaveMessage = false">Back to
            Description</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@media (max-width: 1024px) {
  .centered-container {
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    padding: 0;
    max-height: unset !important;
    gap: 1rem !important;
    margin-top: 1rem !important;
  }

  .left-column {

    width: 100%;
    margin: 0;
    padding: 0;
  }

  .right-column {
    flex: 1;
    width: 100%;
  }

  .right-column img {
    width: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
    display: none;
    visibility: hidden;
  }

  .second-child {
    margin-bottom: 2rem !important;
  }
}

@media (max-width: 568px) {
  .buttons-wrapper {
    flex-direction: column-reverse !important;
    gap: 1rem;
    justify-content: center;
    align-items: center !important;
    padding: 1rem 0;

    button {
      width: 100%;
    }
  }
}

.limited-width {
  min-height: 90vh;
}

.centered-container {
  margin-top: 5rem;
  display: flex;
  gap: 2.5rem;
  max-height: 39rem;
}

.left-column {
  flex: 1;
  text-align: center;
}

.right-column {
  flex: 1;
}

.right-column p {
  color: var(--green, #004d40);
  font-size: 1.2rem;
  font-weight: 500;
}

h1 {
  margin-top: 0;
  margin-bottom: -2.5rem;
  height: 5rem;
  color: #272727;
  font-size: 2.5rem;
  font-weight: 300;
}

.horse-data {
  display: flex;
  justify-content: row;
  gap: .5rem;

  p {
    margin: 0;
    font-weight: 600;
    font-size: 1.5rem;
    color: #c1121f;
  }
}

.ancestry-image {
  height: 345px; 
  margin-top: 2.5rem;
}

.horse-specs {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  .horse-spec {
    display: flex;
    flex-direction: column;

    .field-name {
      color: #272727;
      font-size: .9rem;
      font-weight: 500;
      margin-bottom: -0.1rem;
    }

    .field-value {
      color: #272727;
      font-size: 1.2rem;
      color: var(--green, #004d40);
    }
  }
}

.right-column button {
  border: 1px solid !important;
  border-radius: 0.25rem;
  border: none;
  font-size: 1.2rem;
  padding: 1rem 2.75rem;
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

.buttons-wrapper {
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  padding-top: 2rem;
  gap: calc((100% - 40rem) / 2 + 1rem);
}

.go-back-button {
  border-color: #004d40;
  background: none;
  color: var(--green, #004d40);
  // margin-top: 2rem;
  padding: .5rem 2rem !important;
}

.first-child {
  margin-top: 4rem !important;
}

.request-button {
  border-color: #004d40;
  background: var(--green, #004d40);
  color: #FFF;
}</style>
