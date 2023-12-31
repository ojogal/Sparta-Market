<template>
  <div style="display: flex; flex-direction: column;">
    <Navbar v-if="!isCheckoutPage" />
    <div id="content">
      <div style="flex: 1">
        <notifications position="bottom right" max="2" classes="notification" />
        <RouterView />
      </div>

      <div id="footer">
        <Footer v-if="!isCheckoutPage" />
      </div>

    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';

export default {
  components: {
    Navbar,
    Footer
  },
  computed: {
    isCheckoutPage() {
      return this.$route.name === 'checkout';
    }
  },
  methods: {}
};
</script>

<style lang="scss">
.notification {
  margin: 0 30px 30px 0;
  padding: 20px;
  font-size: 15px;
  color: #F7F8FA;
  display: flex !important;
  justify-content: center !important;
  text-align: center !important;

  background: #004d40 !important;
  border: none;
  border-radius: 5px;

  &.success {
    background: #004d40 !important;
  }

  &.error {
    background: #272727 !important;
  }
}

.limited-width {
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;

  @media (max-width: 1439px) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}

#content {
  overflow-y: scroll;
  flex: 1;
  background-color: #F7F8FA;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

#footer {
  margin-top: auto;
}
</style>