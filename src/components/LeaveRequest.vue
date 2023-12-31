<script>
import { mapState } from "vuex";


export default {
  name: "LeaveRequest",
  data: () => ({
    name: "",
    email: "",
    phone: "",
    message: "",
    submitting: false,
  }),
  computed: {
    ...mapState(["horse"]),
  },
  methods: {
    async submitRequestForm(event) {
      event.preventDefault();

      if (this.submitting) { return }

      const formData = {
        type: "REQUEST",
        name: this.name,
        email: this.email,
        phone: this.phone,
        message: this.message
      };

      try {
        this.submitting = true;
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/sendmail`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          this.name = "";
          this.email = "";
          this.phone = "";
          this.message = "";
          this.$notify({ type: "success", text: "Request sent successfully!" });
        } else {
          this.submitting = false;
          const responseData = await response.json();
          this.$notify({ type: "error", text: responseData.message });
        }
      } catch (error) {
        console.error("Error submitting the form: ", error);
        this.$notify({ type: "error", text: "An error occured" });
      }
    },
    goBack() {
      this.$emit("backClicked")
    }
  },
}
</script>

<template>
  <div class="centered-container">
    <div class="title">
      <h1>
        Let's start a discussion <br> about this offer
      </h1>
    </div>
    <div class="form">
      <input v-model="name" type="text" id="name" placeholder="Name*" required>
      <input v-model="email" type="text" id="email" placeholder="Email*" required>
      <input v-model="phone" type="text" id="phone" placeholder="Phone" required>
      <textarea v-model="message" type="text" id="message" placeholder="Additional Message" class="message-input"
        required></textarea>
      <div class="request-details">
        <div class="notice">
          <p>* We will receive your request and will contact with you <br> via email or phone number</p>
        </div>
        <div class="horse-details">
          <h1>{{ horse.nickname }}</h1>
          <p>${{ horse.price }}</p>
        </div>
      </div>
      <button @click="submitRequestForm">Request</button>
    </div>
  </div>
  <div></div>
</template>

<style scoped lang="scss">
@media (max-width: 1024px) {
  .title h1 {
    font-size: 1.5rem;
    margin-bottom: 0 !important;
  }

  .form {
    button {
      width: 100%;
    }
  }

  .horse-details {
    h1 {
      font-size: 1.5rem;
    }

    p {
      font-size: 1rem !important;
    }
  }

}

.centered-container {
  display: flex;
  flex-direction: column;
  align-items: center;

  .title h1 {
    @media (max-width: 355px) {
      font-size: 1.5rem !important;
    }
    text-align: center;
    margin-bottom: 1.5rem;
  }
}

.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 450px;
  margin-top: 2rem;

  input,
  textarea {
    padding: .5rem 1rem 0 .5rem;
    width: 100%;
    font-family: Poppins;
    margin: .5rem 0 .5rem;
    font-size: 1rem;
    border: none;
    border-bottom: 1px solid #004d40;
    background-color: #F7F8FA;
    outline: none;
  }

  textarea {
    border-radius: 4px;
    height: 100px;
    border: 1px solid #004d40;
    resize: none;
  }

  button {
    margin-top: 3rem;
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

  .message-input {
    margin-top: 3rem !important;
  }
}

.request-details {
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;

  h1 {
    margin-bottom: -2.5rem;
    color: var(--green, #004d40)
  }

  p {
    font-size: 1.2rem;
    color: var(--green, #004d40);
    text-align: right;
  }

  .horse-details {
    @media (max-width: 355px) {
      h1 {
        font-size: 1.3rem !important;
      }
      
    }
    text-align: right;
  }

  .notice {
    @media (max-width: 355px) {
      p {
        font-size: .6rem !important;
      }
      
    }
    margin-top: -2rem;
    max-width: 45%;

    p {
      font-size: .8rem;
      color: #9E9E9E;
      text-align: left;
    }
  }
}


h1 {
  margin-top: 0;
  height: 5rem;
  color: #272727;
  font-size: 2rem;
  font-weight: 300;
}

.go-back-button {

  button {
    border: 1px solid #004d40;
    border-radius: 0.25rem;
    padding: .5rem 1rem;
    border-color: #004d40;
    background: none;
    font-size: 1.2rem;
    color: var(--green, #004d40);

    &:hover {
      transform: scale(1.05);
    }

    &:active {
      transform: scale(0.95);
    }

    transition: all 100ms ease-in-out;
  }
}
</style>