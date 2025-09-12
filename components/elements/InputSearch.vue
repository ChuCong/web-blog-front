<template>
  <div class="box-input">
    <div class="flex items-center box_input_search" v-if="type === 'text'">
      <input :type="type" class="custom-input" :placeholder="placeholder"
        :style="[`width:${width}%;height:${height}px`]" v-model="itemValueText" @change="inputText(itemValueText)"
        @focus="props.onFocus && props.onFocus($event)" @blur="props.onBlur && props.onBlur($event)"
        @keydown.enter="props.onEnter ? props.onEnter(itemValueText) : ''" :readonly="readonly" />
          <img class="px-2" src="@/assets/images/icons/icon_search.svg" alt="search" />
    </div>
    <div v-if="type === 'select'" :class="['relative', className]">
      <div v-if="multiple">
        <div class="flex">
          <input id="btn-select-multi" class="custom-input cursor-pointer truncate" readonly
            :placeholder="label ? label : placeholder" :style="[`width:${width}%;height:${height}px`]"
            @click="BtnSelect" :value="itemValueSelectMulti.join(', ')" />
          <div class="icon-down-select" :style="width ? `margin-left:${width - 10}%` : ''"></div>
        </div>
        <ul id="box-multi-select" class="list-select-nobg" v-if="listSelect" :style="[`width:${width}%;`]">
          <li v-for="(item, index) in items" :key="index">
            <label>
              <input type="checkbox" :value="item[itemValue]" v-model="checkboxSelectMulti" @change="selectedMulti()" />
              {{ item[itemText] }}
            </label>
          </li>
        </ul>
      </div>
      <div v-else>
        <div class="flex">
          <input class="custom-input cursor-pointer truncate" readonly :placeholder="label ? label : placeholder"
            :style="[`width:${width}%;height:${height}px`]" @click="BtnSelect" :value="itemValueSelect" />
          <div class="icon-down-select" :style="width ? `margin-left:${width - 15}%` : ''"></div>
        </div>
        <ul class="list-select" v-if="listSelect" :style="[`width:${width}%`]">
          <li v-for="(item, index) in items" :key="index" @click="selected(item[itemValue])">
            <label>{{ item[itemText] }}</label>
          </li>
        </ul>
      </div>
    </div>

    <div v-if="type === 'date'">
      <input class="custom-input1 cursor-pointer z-10" :style="[`width:${width}%;height:${height}px`]" type="date"
        id="date" @change="inputDate(itemValueDate)" v-model="itemValueDate" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineEmits, defineProps, ref } from "vue";

const props = defineProps({
  text: { type: String, default: '' },
  type: { type: String, default: 'text' },
  items: { type: Array, default: [] },
  itemText: { type: String, default: 'text' },
  itemValue: { type: String, default: 'value' },
  placeholder: { type: String, default: '' },
  label: { type: String, default: '' },
  width: { type: [Number, String], default: 200 },
  height: { type: [Number, String], default: 35 },
  value: { type: [Number, String], default: 1 },
  readonly: { type: Boolean, default: false },
  onFocus: { type: Function },
  onBlur: { type: Function },
  onEnter: { type: Function }
});

const emit = defineEmits(['input']);
const listSelect = ref(false);
const itemValueDate = ref('');
const itemValueText = ref('');

const itemValueSelect = computed(() => {
  const select = props.items.find(item => item[props.itemValue] === props.value);
  return select ? select[props.itemText] : '';
});

const BtnSelect = () => {
  listSelect.value = !listSelect.value;
};

const selected = (value) => {
  listSelect.value = false;
  emit('input', value);
};

const inputDate = (value) => {
  emit('input', value);
};

const inputText = (value) => {
  emit('input', value);
};
</script>

<style scoped lang="scss">
.box_input_search {
  @apply border-[1px] rounded-[8px] border-solid border-[#818285] pr-1;
}

.custom-input {
  font-weight: 300;
  @apply text-[14px] rounded-[30px] text-[#4D4E50] placeholder-[#A1A1A1] px-2;
}

.custom-input1 {
  font-weight: 300;
  @apply rounded-[6px] bg-[#F4F3F3] text-[#4D4E50] placeholder-[#060708] border-[1px] border-solid border-[#F4F3F3] px-2;
}

.custom-input:focus,
.custom-input1:focus {
  outline: none;
}

.list-select {
  box-shadow: 0px 0px 7px #e1e1e1;
  @apply bg-[#FFFFFF] text-[#5d5d5f] pt-1 pb-1 w-[300px] absolute z-10 mt-[13px] rounded-lg border-[1px] border-[#f0f0f0];

  li {
    @apply px-3 py-2 border-[#A1A1A1] truncate;

    &:hover {
      @apply bg-[#ebf1f7] text-[#4FA4C8];
    }
  }
}

.list-select-nobg {
  @apply text-gray-100 bg-white w-[250px] absolute z-10 mt-1 border rounded border-[#CED4DA];

  li {
    @apply px-5 py-2 border-b-[1px] border-[#CED4DA] truncate;

    &:hover {
      @apply text-[#4FA4C8];
    }
  }
}

.icon-down-select {
  @apply absolute z-0 mt-[15px];
}
</style>