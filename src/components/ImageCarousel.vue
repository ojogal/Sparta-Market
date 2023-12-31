<template>
  <div class="carousel">
    <carousel :items-to-show="itemsToShow">
      <slide v-for="(slide, i) in slides" :key="i">
        <div class="image-holder" :style="{ 'background-image': `url(${slide})` }" @click="() => showImage(slides, i)"></div>
      </slide>

      <template #addons>
        <navigation v-if="useNavigation" />
        <pagination v-if="usePagination" />
      </template>

    </carousel>
  </div>
</template>

<script>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import galeryMixin from '../mixins/galery.mixin';

export default {
  name: 'ImageCarousel',
  mixins: [galeryMixin],
  data: () => ({
    showGalery: false,
  }),
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  props: {
    slides: { type: Array, required: true },
    usePagination: { type: Boolean, required: false, default: true },
    useNavigation: { type: Boolean, required: false, default: true },
    itemsToShow: { type: Number, required: false, default: 1 },
    stretch: { type: String, required: false, default: "vertical" }
  },
  methods: {
  }
}
</script>

<style lang="scss">
.carousel {
  width: 100%;
  height: 100%;

  .image-holder {
    width: 100%;
    height: 100%;

    @media (min-width: 1025px) {
      min-height: 660px;

    }

    @media (max-width: 1024px) {
      min-height: 25vh;
      max-width: 100%;
      width: 100%;
    }

    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }

  .carousel__viewport {
    height: 100%;
    border-radius: 20px;

    .carousel__track {
      height: 100%;
    }
  }
}
</style>