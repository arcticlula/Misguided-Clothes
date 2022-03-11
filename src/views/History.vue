<template>
  <el-main>
    <el-row justify="center" style="width: 100%;">
      <el-timeline>
        <el-timeline-item
          v-for="hist in clothesHistory"
          :key="hist.id"
          :timestamp="hist.date"
          :icon = "washing2"
          size = "large"
        >
          {{ hist.status + ' - ' + hist.location }}
        </el-timeline-item>
      </el-timeline>
    </el-row>
  </el-main>
  {{ clothesHistory }}
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { getHistoryByClothesId } from '@/plugins/firebase/history';
import type { IClothesHistory } from '@/components/models/history.model';
import washing from '../components/icons/IconWashing.vue'
import washing2 from '../components/icons/IconWashing2.vue'

const route = useRoute();
const urlRoute = route.name as string;
const urlOrigin = new URL(window.location).origin;
let clothesId = route.params.id as string; // read parameter id (it is reactive) 
const clothesHistory = ref<IClothesHistory[]>([]);

(async () => {
  if (clothesId) {
    const req = await getHistoryByClothesId(clothesId);
    if (req) {
      clothesHistory.value = req;
    }
    else {
      clothesId = '';
      history.pushState(null, '', `${urlOrigin}/${urlRoute}`)
    }
  }
})()

</script>

<style>

</style>
