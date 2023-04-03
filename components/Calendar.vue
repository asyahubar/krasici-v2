<template>
  <table
    ref="calendar"
    id="calendar"
    role="presentation"
    class="w-full"
  >
    <caption>{{ rt(monthTitles[month - 1]) }}</caption>
    <thead>
      <tr class="labels">
        <th
          v-for="(day, ind) in $tm('days')"
          :key="ind"
        >
          {{ $rt(day) }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(row, inx) in dates"
        :key="inx+100"
        class="dates"
      >
        <td
          v-for="date in row"
          :key="date+200"
          :data-date="date"
          :data-month="month"
          :date-year="year"
          :tabindex="date === 0 ? false : date === 1 ? 0 : date === selected ? 0 : -1"
          :role="date !== 0 ? 'button' : false"
          :aria-label="new Intl.DateTimeFormat(locale, {dateStyle: 'full'}).format(new Date(year, month, date))"
          @click="dateClicked(date, $event)"
          @keyup.home="goToFirst"
          @keyup.end="goToLast"
          @keyup.page-up="goToPreviousMonth"
          @keyup.page-down="goToNextMonth"
          @keyup.up="goUp()"
          @keyup.down="goDown()"
          @keyup.left="goLeft()"
          @keyup.right="goRight()"
          class="text-center focus:bg-red-100"
        >
          {{ date === 0 ? "" : date }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import calendarize from "calendarize"

const emit = defineEmits(["dateClicked"])
const { locale, tm, rt } = useI18n()

const calendar = ref()
const dates = computed(() => calendarize(new Date(year.value, month.value), 1))

const year = ref(new Date().getFullYear())
const month = ref(new Date().getMonth())
const lastDay = computed(() => new Date(year.value, month.value + 1, 0).getDate())
const selected = ref(new Date().getDate())

const monthTitles = reactive(tm('monthTitles'))

const dateClicked = (dayNumber, event) => {
  emit("dateClicked", new Date (year.value, month.value, dayNumber))
  if (dayNumber !== 0) selected.value = dayNumber
}
const goToFirst = () => {
  calendar.value.querySelectorAll("[data-date='1']")[0].focus()
}
const goToLast = () => {
  document.querySelectorAll(`[data-date="${lastDay.value}"]`)[0].focus()
}
const goToPreviousMonth = () => {
  month.value--
}
const goToNextMonth = () => {
  month.value++
}
const goUp = () => {
  if (selected.value < 8) {
    validateIfMonthAndYearBefore()
    selected.value = lastDay.value - (7 - selected.value)
  } else {
    selected.value -= 7
  }
  moveFocus()
}
const goDown = () => {
  if (selected.value + 7 > lastDay.value) {
    let gap = lastDay.value - selected.value
    validateIfMonthAndYearAfter()
    selected.value = 7 - gap
  } else {
    selected.value += 7
  }
  moveFocus()
}
const goLeft = () => {
  if (selected.value === 1) {
    validateIfMonthAndYearBefore()
    selected.value = lastDay.value
  } else {
    selected.value--
  }
  moveFocus()
}
const goRight = () => {
  if (selected.value === lastDay.value) {
    validateIfMonthAndYearAfter()
    selected.value = 1
  } else {
    selected.value++
  }
  moveFocus()
}

const validateIfMonthAndYearBefore = () => {
  if (month.value === 1) {
      month.value = 12
      year.value--
    } else {
      month.value--
    }
}
const validateIfMonthAndYearAfter = () => {
  if (month.value === 12) {
      month.value = 1
      year.value++
    } else {
      month.value++
    }
}
const moveFocus = () => {
  nextTick(() => document.querySelectorAll(`[data-date="${selected.value}"]`)[0].focus())
}
</script>

<style>
.labels,
.dates {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 4px;
}
</style>
