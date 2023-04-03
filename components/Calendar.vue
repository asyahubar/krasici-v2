<template>
  <div id="calendar">
    <div class="labels">
      <span v-for="(day, ind) in $tm('days')" :key="ind">{{ $rt(day) }}</span>
    </div>
    <div class="dates">
      <template v-for="(row, inx) in dates">
        <span v-for="date in row" :key="date" @click="dateClicked(date)">{{ date === 0  ? '' : date }}</span>
      </template>
    </div>
  </div>
</template>

<script setup>
import calendarize from 'calendarize';

// const { locale, locales, tm } = useI18n()

const dates = calendarize(new Date(), 1)

const dateClicked = (dayNumber) => {
  emit('date-clicked', dayNumber)
}

</script>

<style>
.labels, .dates {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 4px;
}
</style>