  <template>
    <div class="item-add"
      :style="[width ? `width:${width}px` : '', height ? `height:${height}px` : '', `border:1px solid ${bg_color_border}`,`border-radius: ${rounded}px`, `background:${bg_color}`]">
      <img v-if="icon":src="icon" alt="Icon">
      <div class="add__text" :style="color ? `color:${color}` : 'color:#7E7E7E'">
        {{ text }}
      </div>
    </div>
  </template>
<script lang="ts" setup>
import { defineProps } from "vue";

// eslint-disable-next-line
const props = defineProps({
  icon: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: '#FFF',
  },
  bg_color: {
    type: String,
    default: '',
  },
  bg_color_border: {
    type: String,
    default: '',
  },
  text: {
    type: String,
    default: '',
  },
  // heightIcon: {
  //   type: Number,
  //   default: 20,
  // },
  // widthIcon: {
  //   type: Number,
  //   default: 20
  // },
  width: {
    type: Number,
    default: 140
  },
  height: {
    type: Number,
    default: 40
  },
  rounded: {
    type: Number,
    default: 6
  },
})
</script>
<style lang="scss" scoped>
.item-add {
  @apply border px-[20px]  flex gap-[10px] items-center cursor-pointer;

  .add__text {
    @apply text-[15px] mx-auto font-semibold;
  }

  .btn-add {
    @apply rounded-r-[1.3rem] flex justify-center items-center w-[70px];

    img {
      margin-left: 10px;
    }
  }

}
</style>
