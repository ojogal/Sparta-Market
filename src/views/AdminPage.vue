<script>
import { mapActions, mapState } from "vuex";
import Admin from "@/components/Admin.vue";
import Login from "@/components/Login.vue";
import HorseForm from "@/components/HorseForm.vue";


export default {
  name: "AdminPage",
  components: { Admin, HorseForm, Login },
  data: () => ({}),
  computed: { ...mapState(["horses", "userRole"]) },
  methods: {
    ...mapActions(["fetchHorses", "fetchMedia", "getUserRole"]),
    showHorse(id) {
      this.$router.push(`/horse/${id}`)
    },
    horsesPage() {
      this.$router.push(`/horses`)
    },
    scrollTohorses() {
      document.getElementById("horses-section").scrollIntoView({ behavior: "smooth" })
    },
    toggleHorseForm() {
      this.showHorseForm = !this.showHorseForm;
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
          const data = await response.json();
          this.getUserRole(data.role)
        }
      } catch (e) {
        console.log("getUserRole", e);
        this.$router.push("/admin/login")
      }
    },
  },
  watch: {
    userRole(newValue) {
      if (newValue === 'admin' && this.$route.meta.type === 'adminLogin') {
        this.$router.push('/admin');
        console.log(this.userRole);
        console.log(this.$route.meta.type === 'home');
      }
    }
  },
  created() {
    this.fetchUserRole()
  }
}
</script>

<template>
  <div class="horses-section" id="horses-section" v-if="this.userRole === 'admin'">
    <Admin v-if="$route.meta.type === `admin`" :adminView="true"/>
    <HorseForm v-if="$route.meta.type === `new`" @cancel-form="toggleHorseForm"/>
    <HorseForm v-if="$route.meta.type === `edit`" @cancel-form="toggleHorseForm"/>
  </div>
  <div v-else>
    <Login v-if="this.userRole !== 'admin'" />
    <Login/>
  </div>
</template>

<style scoped lang="scss">

button {
  margin-top: 2rem;
  margin-bottom: 4rem;
}

a {
  text-decoration: none;
  color: var(--black, #272727);
  cursor: pointer;
  user-select: none;
  font-size: 2.5rem;
}

</style>