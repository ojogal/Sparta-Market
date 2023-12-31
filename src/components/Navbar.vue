<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: "Navbar",
  data: () => ({
    isAdmin: false,
    hamClicked: false
  }),
  computed: {
    ...mapState(["userRole"])
  },
  methods: {
    ...mapActions(["setUserRole"]),
    scrollToHorses(e) {
      e.preventDefault();
      if (this.$route.name !== "home") {
        this.$router.push("/")
      };
      setTimeout(() => document.getElementById("horses-section").scrollIntoView({ behavior: "smooth" }))
    },
    homePage(e) {
      e.preventDefault();
      this.hamClicked = false;
      if (this.$route.name !== "home") {
        this.$router.push("/")
      } else {
        window.scrollBy({ top: -document.body.clientHeight, left: 0, behavior: "smooth" })
      }
    },
    horsesPage(e) {
      e.preventDefault();
      this.$router.push("/horses")
    },
    async fetchUserRole() {
      try {
        const token = this.$cookies.get("token");
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/account/getuser`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        if (response.ok) {
          const result = await response.json();
          this.isAdmin = result.role === "admin"
          this.getUserRole(result.role);
        }
      } catch { }
    }
  },
  created() {
    this.fetchUserRole()
  }
};
</script>

<template>
  <nav>
    <div class="limited-width container">
      <div class="logo">
        <a @click="homePage">SPARTA</a>
      </div>
      <div class="nav-links">
        <div class="container" :class="{ 'mob-active': hamClicked }">
          <router-link to="/about" @click="hamClicked = false">About</router-link>
          <router-link to="/horses" @click="hamClicked = false">Horses</router-link>
          <router-link to="/contact" @click="hamClicked = false">Contact</router-link>
          <router-link v-if="userRole === 'admin' || isAdmin" to="/admin" @click="hamClicked = false">Admin</router-link>
        </div>
      </div>
      <div class="hamburger">
        <button class="trans-parent-button" @click="() => { hamClicked = !hamClicked }">
          <v-icon v-if="hamClicked" name="la-plus-circle-solid" scale="1.5" color="black"
            style="transform: rotate(45deg);" />
          <v-icon v-else name="md-menu-round" scale="2" fill="black" />
        </button>
      </div>
    </div>
  </nav>
</template>

<style scoped lang="scss">
.cross-close-batton-ultra-3000-pro-max {
  @media (min-width: 768px) {
    display: none;
  }
}

.trans-parent-button {
  border: none;
  background: transparent;
}

nav {
  background: #F7F8FA;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 5000;

  >.container {
    display: grid;
    align-items: center;
    grid-template-columns: repeat(3, 1fr);
  }

  .hamburger {
    text-align: right;
    color: #004d40;

    @media (min-width: 1025px) {

      display: none
    }
  }
}

nav a {
  font-weight: 1000;
  font-size: 2.5rem;
  color: #004d40;
  cursor: pointer;
  user-select: none;
}

.logo {
  cursor: pointer;
  user-select: none;

}

.nav-links {

  >.container {
    display: flex;
    justify-content: center;
    gap: 5rem;
  }
}

@media (max-width: 1024px) {
  .nav-links {
    >.container {
      padding-top: 7rem;
      width: 100vw;
      height: 100vh;
      position: fixed;
      background: #F7F8FA;
      top: 0;
      left: 0;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      gap: 2rem;
      transition: all 100ms ease-in-out;
      opacity: 0;
      z-index: -1;
      display: none;
      scroll-behavior: none;

      &.mob-active {
        display: flex;
        opacity: 1;
        background-color: #F7F8FA;
      }
    }
  }

  body:has(.mob-active) {
    margin: 0;
    height: 100vh;
    overflow-y: hidden;
  }
}

.nav-links a {
  text-decoration: none;
  color: var(--black, #272727);
  flex-direction: column;
  padding: 0.5rem 0rem;
  font-weight: 500;
  font-size: 1.2rem;
}
</style>