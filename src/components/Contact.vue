<script>
export default {
  data: () => ({
    name: "",
    email: "",
    phone: "",
    message: "",
    submitting: false,
  }),
  components: {},
  methods: {
    async submitContactForm() {
      const formData = {
        type: "CONTACT",
        name: this.name,
        email: this.email,
        phone: this.phone,
        message: this.message,
      };

      if (this.submitting) { return }

      try {
        this.submitting = true;
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/sendmail`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          this.name = "";
          this.email = "";
          this.phone = "";
          this.message = "";
          this.$notify({ type: "success", text: "Message sent successfully!" });
        } else {
          const responseData = await response.json();
          const message = `${responseData.message}`;
          this.submitting = false
          this.$notify({ type: "error", text: message });
        }
      } catch (error) {
        console.error("Error submitting the form: ", error);
        alert("An error occurred while submitting the form")
      }
    }
  }
}
</script>

<template>
  <div class="contact-container limited-width">
    <div class="info-container">
      <div class="info-title">
        <h1>Contact us at any time</h1>
      </div>
      <ul>
        <li>
          <a href="tel:+37322418973">(+373 22) 41 89 73</a>
        </li>
        <li>
          <a href="tel:+37360400200">(+373) 60 400 200</a>
        </li>
        <li>
          <a href="mailto:spartaequestrian@yandex.ru">spartaequestrian@yandex.ru</a>
        </li>
        <li>
          <a href="https://goo.gl/maps/EDtfUEcMSGzFgcnf8">Moldova, Commune of Budesti,<br />st. Baltsata 45</a>
        </li>
        <div class="media-links">
          <li>
            <a href="https://instagram.com/spartaclubmd" target="_blank"><v-icon name="la-instagram" scale="2" /></a>
          </li>
          <li>
            <a href="https://www.facebook.com/clubspartamd?fref=ts" target="_blank"><v-icon name="la-facebook"
                scale="2" /></a>
          </li>
          <li>
            <a href="https://vk.com/clubspartamd" target="_blank"><v-icon name="la-whatsapp" scale="2" /></a>
          </li>
          <li>
            <a href="https://vk.com/clubspartamd" target="_blank"><v-icon name="la-telegram-plane" scale="2" /></a>
          </li>
          <li>
            <a href="https://vk.com/clubspartamd" target="_blank"><v-icon name="la-viber" scale="2" /></a>
          </li>
        </div>
      </ul>
    </div>
    <div class="form-container">
      <div class="form-title">
        <h1>Leave us a message</h1>
      </div>
      <div class="form">
        <div>
          <input v-model="name" type="text" id="name" placeholder="Name*" required>
        </div>
        <div>
          <input v-model="email" type="text" id="email" placeholder="Email*" required>
        </div>
        <div>
          <input v-model="phone" type="text" id="phone" placeholder="Phone" required>
        </div>
        <div>
          <textarea v-model="message" type="text" id="message" placeholder="Message*" class="message-input"
            required></textarea>
        </div>
        <button @click="submitContactForm">Submit</button>
      </div>
    </div>
    <div></div>
  </div>
</template>

<style scoped lang="scss">
@media (max-width: 460px) {
  .form {
    input,
    textarea {
      width: 70vw !important;
    }
  }
}

@media (max-width: 1024px) {
  .contact-container {
    flex-direction: column-reverse;
    gap: 0 !important;
    padding-top: 0 !important;

  }

  .info-container {
    display: none !important;

  }

  .form-container {
    width: 100% !important;
    margin: 0 auto;
    padding: 0;
    margin-bottom: 3rem;
    gap: 0;

    h1 {
      text-align: center;
    }
  }
}

.contact-container {
  display: flex;
  padding-top: 5rem;
  gap: 5rem;
  min-height: 60vh;
  justify-content: center;
}

.info-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  ul {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    text-align: right;

    li {
      list-style: none;

      &:not(:last-child) {
        margin-bottom: 1rem
      }

      >a {
        color: inherit;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}

.media-links {
  display: flex;
  flex-direction: row;
}

.form-container {
  height: 44rem;
  border-radius: 10px;
  width: 45%;
  display: flex;
  flex-direction: column;
  align-items: center;

  box-shadow: 0px 25px 35px 1px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  .message-input {
    margin-top: 3rem !important;
  }

  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    input,
    textarea {
      width: 40vh;
      font-family: Poppins;
      margin: .5rem 0 .5rem;
      padding: 10px;
      font-size: 1rem;
      border: none;
      border-bottom: 1px solid #004d4055;
      background-color: #F7F8FA;
      outline: none;
    }

    textarea {
      border-radius: 4px;
      height: 150px;
      border: 1px solid #004d4055;
      resize: none;
    }
  }
}

.form-title {
  h1 {
    color: #004d40 !important;
  }
}

.form-title,
.info-title {
  margin-top: 3rem;

  h1 {
    margin-bottom: 1rem !important;
    color: #1D252C;
    font-style: normal;
    font-weight: 250;
    pointer-events: none;
    user-select: none;
    cursor: none;
  }
}

button {
  margin: 10% 15% 0;
  border-radius: 0.25rem;
  border: none;
  font-size: 1.2rem;
  background: var(--green, #004d40);
  padding: 0.8rem 2.75rem;
  align-items: flex-start;
  color: #FFF;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  transition: all 100ms ease-in-out;
}</style>