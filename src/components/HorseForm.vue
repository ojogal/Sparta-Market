<script>
import axios from 'axios';
import { mapActions, mapState } from 'vuex';

export default {
  name: "HorseForm",
  computed: {
    ...mapState(["horse", "media"]),
    images() {
      if (!this.media.length) return [];
      let result = [];
      for (const object of this.media) {
        result.push(object.filename)
      }
      return result
    }

  },
  data: () => ({
    form: {
      nickname: "Akarachka",
      price: 3500,
      birthyear: 2015,
      color: "Chestnut",
      breed: "Missouri Foxtrotter",
      discipline: "Gaited",
      sold: false,
      firstFile: "",
    },
    selectedFiles: [],
    ancestryFile: null
  }),
  methods: {
    ...mapActions(["fetchHorse", "fetchMedia"]),
    cancelHorseForm() {
      this.$router.push("/admin")
    },
    handleFileChange(event) {
      this.selectedFiles = Array.from(event.target.files);
    },
    handleAncestryFileChange(event) {
      this.ancestryFile = this.$refs.mediaInputAncestry.files[0];
    },
    handleFirstFile(event) {
      this.form.firstFile = event.target.value
    },
    async submitHorseForm() {
      try {
        const formData = new FormData();

        if (this.$route.meta.type === "new" && !this.form.firstFile.length) {
          this.form.firstFile = this.selectedFiles[0].name
        }

        formData.append(`ancestry`, this.ancestryFile);

        for (const key in this.form) {
          formData.append(key, this.form[key])
        }


        const token = this.$cookies.get("token");

        this.selectedFiles.forEach((file, index) => {
          formData.append(`media_${index}`, file)
        });

        if (this.$route.meta.type === "edit") {
          await axios.post(`${import.meta.env.VITE_BASE_URL}/horses/${this.horse.id}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              "Authorization": `Bearer ${token}`
            },
          })
        } else {
          await axios.post('${import.meta.env.VITE_BASE_URL}/horses', formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              "Authorization": `Bearer ${token}`
            },
          });
        }
        this.$notify({ type: "success", text: "Added successfully!" })
        this.$router.push("/admin")
      } catch (error) {
        console.log(error);
        this.$notify({ type: "error", text: "An error occured" })
      }
    },
    async promptDeleteSelectedMedia(event, image) {
      event.preventDefault();
      if (confirm("Are you sure?")) {
        const token = this.$cookies.get("token");

        try {
          const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/media/${image}`, {
            method: "DELETE",
            headers: {
              "Authorization": `Bearer ${token}`
            }
          });
          if (response.status === 200) {
            const updatedMedia = this.media.filter(item => item.filename !== image.filename);
            this.$store.commit("setMedia", updatedMedia);
            this.$notify({ type: "success", text: "Deleted successfully!" });
            // this.fetchMedia(this.horse.id);
            this.$router.go();
          } else {
            this.$notify({ type: "error", text: "Error with deleting" })
          }
        } catch (error) { console.log("promptDeleteSelectedMedia", error); }
      }
    }
  },
  async created() {
    if (this.$route.meta.type === "edit") {
      await this.fetchHorse(this.$route.params.id);
      for (const key in this.form) {
        if (this.horse.hasOwnProperty(key)) {
          this.form[key] = this.horse[key]
        }
      }
      this.fetchMedia(this.$route.params.id);
    }
  },
};
</script>

<template>
  <div class="main">
    <div class="form">
      <div class="form-group">
        <input v-model="form.nickname" type="text" id="nickname" placeholder="Name" required>
      </div>
      <div class="form-group">
        <input v-model="form.price" type="number" id="price" placeholder="Price" required>
      </div>
      <div class="form-group">
        <input v-model="form.birthyear" type="number" id="birthyear" placeholder="Birthyear" required>
      </div>
      <div class="form-group">
        <input v-model="form.color" type="text" id="color" placeholder="Color" required>
      </div>
      <div class="form-group">
        <input v-model="form.breed" type="text" id="breed" placeholder="Breed" required>
      </div>
      <div class="form-group">
        <input v-model="form.discipline" type="text" id="discipline" placeholder="Discipline" required>
      </div>
      <div class="form-group sold-group">
        <label>Sold</label>
        <input v-model="form.sold" type="checkbox" id="sold" placeholder="Sold" required>
      </div>
      <div class="form-group file-group">
        <label>Upload images</label>
        <input type="file" id="media" ref="mediaInput" @change="handleFileChange" multiple required>
      </div>
      <div class="form-group file-group">
        <label>Upload Ancestry</label>
        <input type="file" id="mediaAncestry" ref="mediaInputAncestry" @change="handleAncestryFileChange" required>
      </div>
      <div class="form-group file-group">
        <label>Set first picture</label>
        <select v-model="form.firstFile" id="select-file" @change="handleFirstFile">
          <option :value="file.name" v-for="(file, index) in selectedFiles" :key="index">{{ file.name }}</option>
        </select>
      </div>
      <div class="form-buttons">
        <button class="cancel-button" @click="cancelHorseForm">Cancel</button>
        <button class="submit-button" @click="submitHorseForm">Submit</button>
      </div>
    </div>
    <div class="image-container" v-if="this.$route.meta.type === 'edit'">
      <div class="image-card" v-if="this.$route.meta.type === 'edit'" v-for="(image, index) in images" :key="index">
        <div class="delete-button-container">
          <div class="delete-button" @click="(event) => promptDeleteSelectedMedia(event, image)"
            @mouseover="buttonHovered = true" @mouseleave="buttonHovered = false">
            <v-icon name="la-plus-circle-solid" scale="1.5" color="white" />
          </div>
        </div>
        <img :src="`/assets/media/${image}`" :alt="image" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@media (max-width: 520px) {
  .form {
    width: 80vw !important;
    margin: .5rem !important;
  }
  .image-container {
    grid-template-columns: repeat(2, 1fr) !important;
    grid-template-rows: repeat(2, 1fr) !important;
    margin: 1rem !important;
  }
}

@media (max-width: 920px) {
  .main {
    flex-direction: column;
  }
}
.main {
  display: flex;
  gap: 1rem;
  margin-top: 7rem;
}

.image-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 1rem;
  max-width: 400px;
  max-height: 700px;
}

.image-card {
  width: 125px;
  height: 125px;
  position: relative;

  .delete-button-container {
    align-self: flex-end;

    .ov-icon {
      transform: rotate(45deg);
    }
  }

  .delete-button {
    display: flex;
    background-color: black;
    border-radius: 100%;
    cursor: pointer;
    position: absolute;
    right: 0;
    z-index: 0;
  }

  &:hover .delete-button {
    display: flex;
    transform: translateX(0);
    overflow: hidden;
  }
}

.form {
  border: 1px solid #333;
  border-radius: .4rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 400px;
  height: 750px;
  margin: 0 auto;

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    &.sold-group {
      display: flex;
      flex-direction: row !important;
      justify-content: flex-start;
      align-items: center;
      input {
        width: fit-content;
      }
    }
  }

  input,
  select {
    padding: 0.5rem;
    border: none;
    border-bottom: 1px solid #333;
    font-size: 1rem;
    background-color: #F7F8FA;
  }

  select {
    width: 100%;
  }

  .file-group input,
  select {
    border: 1px solid #333;
    border-radius: 0.25rem;
  }

  .form-buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .submit-button,
  .cancel-button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.25rem;
    font-size: 1rem;
    cursor: pointer;
  }

  .submit-button {
    background-color: var(--green, #004d40);
    color: #F7F8FA;
  }

  .cancel-button {
    background-color: #F7F8FA;
    color: #333;
    border: 1px solid;
  }
}
</style>
