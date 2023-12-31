<template>
  <div class="not-found">
    <h1>Page Not Found</h1>
    <p>The page you are looking for does not exist.</p>
    <a href="/" class="button-link">Go to Home</a>
  </div>
</template>

<script>
export default {
  name: "NotFoundPage",
};
</script>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10rem;
  font-size: 1.2rem;
}

.not-found h1 {
  margin: 0;

  pointer-events: none;
  user-select: none;
  cursor: none;
}

.not-found p {
  margin-bottom: 5rem;

  pointer-events: none;
  user-select: none;
  cursor: none;
}
.button-link {
  border-radius: 0.25rem;
  border: none;
  font-size: 1.2rem;
  background: var(--green, #004d40);
  padding: 0.8rem 2.75rem;
  align-items: flex-start;
  color: #FFF;
  text-decoration: none;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
  transition: all 100ms ease-in-out;
}

</style>
