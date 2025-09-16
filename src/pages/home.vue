<template>
  <body>
    <div
      class="min-h-screen bg-white text-[#0d0d0d] relative overflow-hidden bg-cover bg-center"
      :style="{
        backgroundImage: `url(${bgImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundColor: 'white',
      }"
    >
      <nav class="p-5 flex justify-end items-end">
        <ul
          class="hidden md:flex space-x-8 text-lg tracking-wide font-normal pr-16 mt-10 mr-16 gap-8 text-[#f7b731]"
        >
          <li class="hover:text-[#f39c12] cursor-pointer">Home</li>
          <li>
            <router-link to="/catalog" class="hover:text-[#f39c12]"
              >Catalog</router-link
            >
          </li>
          <li class="hover:text-[#f39c12] cursor-pointer">Favorite</li>
        </ul>

        <button
          class="md:hidden pr-6 focus:outline-none"
          @click="isOpen = true"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </nav>

      <transition name="slide-fade">
        <div
          v-if="isOpen"
          class="absolute top-0 right-0 w-full h-full bg-white bg-opacity-90 flex flex-col items-center justify-center space-y-8 text-xl z-50 text-black"
        >
          <button
            class="absolute top-6 right-6 focus:outline-none"
            @click="isOpen = false"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <a class="hover:text-[#f7b731]" @click="isOpen = false">Home</a>
          <router-link
            to="/catalog"
            class="hover:text-[#f7b731]"
            @click="isOpen = false"
            >Catalog</router-link
          >
          <a class="hover:text-[#f7b731]" @click="isOpen = false">Favorite</a>
        </div>
      </transition>

      <div
        class="flex flex-col items-center justify-center text-center mt-32 md:mt-45 space-y-6 px-4"
      >
        <h1
          class="text-4xl md:text-5xl font-semibold bg-gradient-to-r from-[#FFD93D] to-[#f39c12] bg-clip-text text-transparent"
        >
          Welcome to Emoji Hub
        </h1>

        <h2 class="text-2xl md:text-3xl font-medium">
          Discover, search, and enjoy emojis like never before!
        </h2>
        <button
          class="p-3 rounded-full bg-white opacity-80 text-black px-8 mt-6 hover:opacity-100 transition"
        >
          Explore Emojis
        </button>

        <div
          class="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0 text-2xl md:text-xl mt-10"
        >
          <div class="flex items-center">
            <h1 class="text-2xl p-2 font-semibold md:text-lg">{{ emojis }}</h1>
            <span class="pl-2">emojis</span>
          </div>
          <hr class="hidden md:block w-8 h-12 rotate-90" />
          <div class="flex items-center md:text-lg">
            <h1 class="text-2xl p-2 font-semibold md:text-xl">
              {{ categories }}
            </h1>
            <span class="pl-2">categories</span>
          </div>
          <hr class="hidden md:block w-8 h-12 rotate-90" />
          <div class="flex items-center md:text-xl">
            <h1 class="text-2xl p-2 font-semibold md:text-xl">♾️</h1>
            <span class="pl-2">Reactions</span>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const emojis = ref(0);
const categories = ref(0);

function animateValue(refVar, end, duration) {
  let start = 0;
  let startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    refVar.value = Math.floor(progress * end);

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

onMounted(() => {
  animateValue(emojis, 1000, 2000);
  animateValue(categories, 9, 1000);
});
const bgDesktop = new URL("../assets/Frame.png", import.meta.url).href;
const bgMobile = new URL("../assets/Frame.png", import.meta.url).href;

const isOpen = ref(false);

const bgImage = computed(() =>
  window.innerWidth < 768 ? bgMobile : bgDesktop
);

window.addEventListener("resize", () => {
  bgImage.value = window.innerWidth < 768 ? bgMobile : bgDesktop;
});
</script>

<style>
.slide-fade-enter-active {
  transition: all 0.4s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
body {
  background-color: white;
  color: black;
}
</style>
