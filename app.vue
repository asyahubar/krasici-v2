<template>
  <div class="font-primary">
    <Header />
    <p>{{ $t("sidenav.call_to_contact") }}</p>
    <hr>
    <button>turn on sea</button>
    <div>
      <img src="" alt="view">
      <button>feel the atmosphere</button>
    </div>
    <calendar />
    <swiper
      :slides-per-view="1"
      :space-between="30"
      navigation
      loop
      :pagination="{
        clickable: true,
      }"
      :modules="modules"
      direction="vertical"
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

// const nuxtApp = useNuxtApp()
const modules = [ Pagination, Navigation ];

const db = useFirestore()

const vacationsRef = collection(db, 'vacations')
const vacations = useCollection(vacationsRef)

</script>