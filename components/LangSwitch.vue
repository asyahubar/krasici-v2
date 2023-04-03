<template>
  <select v-model="locale">
    <option
      v-for="lang in locales"
      :key="`locale-${lang.code}`"
      :value="lang.code"
    >
      {{ lang.code }}
    </option>
  </select>
</template>

<script setup>
const { locale, locales } = useI18n()
</script>  