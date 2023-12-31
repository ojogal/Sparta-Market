<script>
</script>

<template>
  <div class="main-container">
    <div class="info-container limited-width">
      <div class="logo-hero">
        <div class="logo">
          <a @click="homePage">SPARTA</a>
        </div>
        <p>First and the biggest Moldavian <br> private riding club of European rang</p>
        <a href="https://instagram.com/spartaclubmd" target="_blank"><v-icon name="la-instagram" scale="2" /></a>
        <a href="https://www.facebook.com/clubspartamd?fref=ts" target="_blank"><v-icon name="la-facebook"
            scale="2" /></a>
        <a href="tel:+37369054560" target="_blank"><v-icon name="la-whatsapp" scale="2" /></a>
        <a href="tel:+37369054560" target="_blank"><v-icon name="la-telegram-plane" scale="2" /></a>
        <a href="tel:+37369054560" target="_blank"><v-icon name="la-viber" scale="2" /></a>
      </div>
      <div class="contact-info">
        <ul>
          <li>
            <a href="tel:+37369054560">(+373) 69 054 560</a>
          </li>
          <li>
            <a href="tel:+37360400200">(+373) 60 400 200</a>
          </li>
          <li>
            <a href="mailto:spartaequestrian@yandex.ru">spartaequestrian@yandex.ru</a>
          </li>
          <li>
            <a href="https://goo.gl/maps/EDtfUEcMSGzFgcnf8">Moldova, Commune of Budesti, <br> st. Baltsata 45</a>
          </li>
        </ul>
      </div>
      <div class="links-info">
        <ul>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/contact">Contact us</a>
          </li>
          <li>
            <a href="/policy">Privacy Policies</a>
          </li>
          <li>
            <a href="/terms">Terms & Conditions</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  methods: {
    homePage(e) {
      e.preventDefault();
      if (this.$route.name !== "home") {
        this.$router.push("/")
      } else {
        window.scrollBy({ top: -document.body.clientHeight, left: 0, behavior: "smooth" })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.main-container {
  background-color: #272727;
  color: #F7F8FA;
  padding: 5rem 0;
}

@media screen and (max-width: 576px) {
  .info-container {
    grid-template-columns: 1fr !important;
    > :nth-child(3) {
      order: 2;
    }
    > :nth-child(2) {
      order: 3;
    }
    text-align: center;
  }
  .main-container {
    padding-bottom: 0;
  }
}
.info-container {
  display: grid;
  gap: 2rem;
  grid-template-columns: 2fr 1fr 1fr;
  border-top: 1px solid #F7F8FA;
  padding-top: 1rem;
  padding-bottom: 1rem;

  
  .logo {
    cursor: pointer;
    user-select: none;
    
    a {
      text-decoration: none;
      color: #F7F8FA;
      flex-direction: column;
      font-weight: 500;
      font-size: 2.5rem;
    }
  }
  
  .logo-hero p {
    pointer-events: none;
    user-select: none;
    cursor: none;
  }

  .logo-hero a {
    color: inherit;

  }

  .contact-info,
  .links-info {
    div.heading {
      color: #F7F8FA;
      pointer-events: none;
      user-select: none;
      cursor: none;
      font-size: 1.2rem;
      margin-top: 1rem;
      margin-bottom: 1.5rem;
    }

    ul {
      padding: 0;

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
}</style>