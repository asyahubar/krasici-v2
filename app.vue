<template>
  <div class="font-secondary">
    <Header class="font-primary" />
    <p>{{ $t("sidenav.call_to_contact") }}</p>
    <hr>
    <button>turn on sea</button>
    <div>
      <img src="" alt="view">
      <button>feel the atmosphere</button>
    </div>
    <calendar />
    <!-- 
      direction="vertical" -->
    <swiper
      :slides-per-view="1"
      :space-between="30"
      navigation
      loop
      :pagination="{
        clickable: true,
      }"
      :modules="modules"
    >
      <swiper-slide>Slide 1</swiper-slide>
      <swiper-slide>Slide 2</swiper-slide>
      <swiper-slide>Slide 3</swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper';

import { useCollection, useFirestore } from 'vuefire'
import { collection } from "firebase/firestore";

const { locale } = useI18n()

// const nuxtApp = useNuxtApp()
const modules = [ Pagination, Navigation ];

const db = useFirestore()

const vacationsRef = collection(db, 'vacations')
const vacations = useCollection(vacationsRef)

useHead({
  htmlAttrs: {
    lang: locale
  }
})

</script>

<style>
body:focus-within {
  scroll-behavior: smooth;
}
</style>