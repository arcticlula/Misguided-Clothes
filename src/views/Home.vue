<script setup lang="ts">
import { fs } from '@/plugins/firebase/firebase';
import { getDoc } from 'firebase/firestore'
import { CirclePlus } from '@element-plus/icons-vue'

// console.log(clothes);
// const docSnap = await getDoc(doc(fs, ) );

// if (docSnap.exists()) {
//   console.log("Document data:", docSnap.data());
// } else {
//   // doc.data() will be undefined in this case
//   console.log("No such document!");
// }
// db.ref('Clothes/DstnQDPfUcj75dKZnH6o').get().then(x => console.log(x));
// const matches = firestore.collection('Matches').orderBy("beginTime", "desc").onSnapshot(querySnapshot => {
//   const matches = querySnapshot.docs.map(doc => {
//     return { id: doc.id, ...doc.data() };
//   })
//   context.commit('setMatches', matches)
// });
// console.log(matches);
</script>

<template>
  <el-main>
    <el-row justify="center" style="width: 100%;">
      <div style="border: 1px dashed red; width: 100%; height: 300px; margin-bottom: 12px;"></div>
      <el-button type="primary" plain :icon="CirclePlus">Adicionar Roupa</el-button>
      <el-button type="primary" plain :icon="CirclePlus">Ver Roupa Existente</el-button>
      <!-- <el-button type="primary" plain :icon="CirclePlus">Adicionar Roupa</el-button>
      <el-button type="primary" plain :icon="CirclePlus">Adicionar Roupa</el-button>-->
    </el-row>
  </el-main>
</template>
