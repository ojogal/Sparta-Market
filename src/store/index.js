import { createStore } from "vuex";
import { axios } from "../lib/axios";


export default createStore({
  state() {
    return {
      horses: [],
      horse: {},
      media: {},
      userRole: null
    }
  },
  mutations: {
    setHorses(state, horses) {
      state.horses = horses
    },
    setHorse(state, horse) {
      state.horse = horse
    },
    setMedia(state, media) {
      state.media = media
    },
    setUserRole(state, updatedRole) {
      state.userRole = updatedRole
    }
  },
  actions: {
    async fetchHorse({ commit }, id) {
      const data = await axios.get(`/horses/${id}`);
      commit("setHorse", data.data)
    },
    async fetchHorses({ commit }) {
      const data = await axios.get("/horses");
      commit("setHorses", data.data)
    },
    async fetchMedia({ commit }, id) {
      try {
        const data = await axios.get(`/media/${id}`);
        commit("setMedia", data.data)
      } catch (error) {
        console.log("fetchMedia ERROR: "), error;
      }
    },
    clearHorse({ commit }) {
      commit("setHorse", {});
      commit("setMedia", {})
    },
    async deleteHorse({ dispatch }, { id, token }) {
      try {
        await axios.delete(`/horses/${id}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
      } catch { }
      dispatch("fetchHorses")
    },
    async getUserRole({ commit }, role) {
      commit("setUserRole", role)
    },
    async deleteSelectedMedia({ dispatch }, { id, image, token }) {
      try {
        const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/media/${image}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (response.ok) {
          dispatch("fetchMedia", id)
        }
      } catch { }
    }
  },
})