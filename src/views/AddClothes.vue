<template>
  <el-main>
    <el-row justify="center" style="width: 100%;">
      <el-upload
        class="avatar-uploader"
        action
        accept="image/*"
        :on-change="onChange"
        :auto-upload="false"
        :show-file-list="false"
      >
        <img v-if="clothes.photoUrl" :src="clothes.photoUrl" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon">
          <plus />
        </el-icon>
      </el-upload>
    </el-row>
    <el-row justify="center" style="width: 100%;">
      <el-select v-model="clothes.brandId" placeholder="Select">
        <el-option-group v-for="group in brandList" :key="group.label" :label="group.label">
          <el-option
            v-for="item in group.options"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-option-group>
      </el-select>

      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4 }"
        placeholder="Please input"
        v-model="clothes.description"
      ></el-input>
      <el-button type="primary" plain :icon="CirclePlus" v-on:click="submit">Save</el-button>
    </el-row>
  </el-main>
  {{ clothes }}
</template>

<script setup lang="ts">
import { getClothesById, setClothes, clothesDoc, uploadClothesImg } from '@/plugins/firebase/clothes';
import { CirclePlus, Plus } from '@element-plus/icons-vue'
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import type { IClothes } from '@/components/models/clothes.model';
import type { IBrand } from '@/components/models/brand.model';
import { getBrandsGrouped, getBrandName } from '@/plugins/firebase/brands';

const route = useRoute();
const urlRoute = route.name as string;
const urlOrigin = new URL(window.location).origin;
let clothesId = route.params.id as string; // read parameter id (it is reactive) 
const image = ref()
const clothes = ref<IClothes>({
  id: '',
  brandId: '',
  brand: '',
  statusId: '',
  status: '',
  tagId: [],
  photoUrl: '',
  description: ''
});

const brandList = ref<{ label: string, options: IBrand[] }[]>([]);

(async () => {
  if (clothesId) {
    const req = await getClothesById(clothesId);
    if (req) {
      clothes.value = req;
    }
    else {
      clothesId = '';
      history.pushState(null, '', `${urlOrigin}/${urlRoute}`)
    }
  }
  //Get grouped list of Brands
  brandList.value = await getBrandsGrouped();
})()

const onChange = (file: any) => {
  image.value = file.raw;

  const reader = new FileReader();
  reader.addEventListener("load", function () {
    // convert image file to base64 string
    clothes.value.photoUrl = reader.result as string;
  }, false);

  if (file.raw) {
    reader.readAsDataURL(file.raw);
  }
}

const submit = async () => {
  const clothesRef = clothesDoc(clothesId);
  clothesId = clothesRef.id;
  history.replaceState(null, '', `${urlOrigin}/${urlRoute}/${clothesId}`)
  clothes.value.brand = getBrandName(clothes.value.brandId as string);
  clothes.value.photoUrl = await uploadClothesImg(clothes.value, image.value);
  // await setClothes(clothesRef, clothes.value);
}

</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
