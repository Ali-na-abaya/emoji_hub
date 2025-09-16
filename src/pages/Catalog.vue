<template>
  <div class="min-h-screen bg-[white] text-black py-10 px-6">
    <nav class="pl-5 pb-5 mb-5 flex justify-end items-end">
      <ul
        class="hidden md:flex space-x-8 text-lg tracking-wide font-normal pr-16 mt-4 mr-16 gap-8 text-[#f7b731]"
      >
        <li class="hover:text-black cursor-pointer">
          <router-link to="/" class="hover:text-[#f39c12]">Home</router-link>
        </li>
        <li>
          <router-link to="/catalog" class="hover:text-[#f39c12]"
            >Catalog</router-link
          >
        </li>
        <li class="hover:text-[#f39c12] cursor-pointer">Favorite</li>
      </ul>

      <button class="md:hidden pr-6 focus:outline-none" @click="isOpen = true">
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

        <router-link to="/" class="hover:text-[#f7b731]" @click="isOpen = false"
          >Home</router-link
        >
        <router-link
          to="/catalog"
          class="hover:text-[#f7b731]"
          @click="isOpen = false"
          >Catalog</router-link
        >
        <a class="hover:text-[#f7b731]" @click="isOpen = false">Favorite</a>
      </div>
    </transition>
    <!-- filterdan -->
    <div
      class="flex flex-col md:flex-row gap-4 justify-center items-center mb-6 px-4"
    >
      <input
        v-model="searchQuery"
        type="text"
        placeholder=" Search emoji..."
        class="px-4 py-2 rounded-lg text-black border border-gray-500 bg-none focus:outline-none focus:ring-2 focus:ring-[#f7b731] w-full md:w-80 transition"
      />

      <select
        v-model="selectedCategory"
        class="px-4 py-2 rounded-lg text-black border border-gray-500 bg-none focus:outline-none focus:ring-2 focus:ring-[#f7b731] w-full md:w-52 transition"
      >
        <option value="">All</option>
        <option v-for="cat in categories" :key="cat" :value="cat">
          {{ cat }}
        </option>
      </select>

      <select
        v-model="sortOrder"
        class="px-4 py-2 rounded-lg text-black border border-gray-500 bg-none focus:outline-none focus:ring-2 focus:ring-[#f7b731] w-full md:w-52 transition"
      >
        <option value="asc">Alphabetical</option>
        <option value="desc">By Category</option>
      </select>
    </div>

    <!-- Grid -->
    <div
      v-if="filteredEmojis.length > 0"
      class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6"
    >
      <div
        v-for="emoji in filteredEmojis"
        :key="emoji.name"
        class="card bg-[#faf9f6] border-1 border-[0d0d0d] rounded-2xl p-5 shadow hover:scale-100 transition"
      >
        <p class="text-4xl text-center" v-html="emoji.htmlCode[0]"></p>
        <p class="text-center mt-2 font-medium">{{ emoji.name }}</p>
        <p class="text-xs text-gray-400 text-center">{{ emoji.category }}</p>
        <img
          src="../assets/image.png"
          class="w-6 h-6 pointer absolute bottom-4 left-4"
          alt=""
        />
      </div>
    </div>

    <p v-else class="text-center mt-8 text-gray-400">No emojis found...</p>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";

const emojis = ref([]);
const searchQuery = ref("");
const selectedCategory = ref("");
const sortOrder = ref("asc");
const isOpen = ref(false);
onMounted(async () => {
  try {
    const res = await fetch("http://localhost:8080/api/emojis");
    emojis.value = await res.json();
  } catch (error) {
    console.error("Error fetching emojis:", error);
  }
});

const categories = computed(() => {
  const cats = emojis.value.map((e) => e.category);
  return [...new Set(cats)].sort();
});

const filteredEmojis = computed(() => {
  let result = emojis.value;

  if (searchQuery.value) {
    result = result.filter((emoji) =>
      emoji.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  if (selectedCategory.value) {
    result = result.filter(
      (emoji) => emoji.category === selectedCategory.value
    );
  }

  result = [...result].sort((a, b) => {
    if (sortOrder.value === "asc") return a.name.localeCompare(b.name);
    else return b.name.localeCompare(a.name);
  });

  return result;
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
.card:hover {
  border-color: #f39c12;
  box-shadow: 0 0 20px rgba(255, 193, 7, 0.6), 0 0 40px rgba(255, 193, 7, 0.3);
  transform: translateY(-5px) scale(1.02);
  animation: neonPulse 2s infinite alternate ease-in-out;
}

@keyframes neonPulse {
  from {
    box-shadow: 0 0 10px rgba(255, 193, 7, 0.3), 0 0 20px rgba(255, 193, 7, 0.2);
  }
  to {
    box-shadow: 0 0 25px rgba(255, 193, 7, 0.6), 0 0 40px rgba(255, 193, 7, 0.3);
  }
}
</style>
