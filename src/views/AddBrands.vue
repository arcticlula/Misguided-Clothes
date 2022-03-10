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
        <img v-if="brand.photoUrl" :src="brand.photoUrl" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon">
          <plus />
        </el-icon>
      </el-upload>
    </el-row>
    <el-row justify="center" style="width: 100%;">
      <el-input placeholder="Please input" v-model="brand.name" clearable></el-input>
      <el-select v-if="isSubBrand" v-model="brand.parentId" placeholder="Select">
        <el-option v-for="item in brandList" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <el-button type="primary" plain :icon="CirclePlus" v-on:click="submit">Save</el-button>
    </el-row>
  </el-main>
  {{ brand }}
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { CirclePlus, Plus } from '@element-plus/icons-vue'
import type { IBrand } from '@/components/models/brand.model';
import { getBrandById, setBrand, brandDoc, uploadBrandImg, getBrands } from '@/plugins/firebase/brands';

const route = useRoute();
const urlRoute = route.name as string;
const isSubBrand = urlRoute == 'subBrands';
const urlOrigin = new URL(window.location).origin;
let brandId = route.params.id as string; // read parameter id (it is reactive) 
const image = ref()
const brand = ref<IBrand>({
  id: '',
  name: '',
  photoUrl: '',
  parentId: null,
  parentName: '',
});

const brandList = ref<IBrand[]>([]);

(async () => {
  if (brandId) {
    const req = await getBrandById(brandId);
    if (req) {
      brand.value = req;
    }
    else {
      brandId = '';
      history.pushState(null, '', `${urlOrigin}/${urlRoute}`)
    }
  }
  if (isSubBrand) {
    brandList.value = await getBrands();
  }
})()

const onChange = (file: any) => {
  image.value = file.raw;

  const reader = new FileReader();
  reader.addEventListener("load", function () {
    brand.value.photoUrl = reader.result as string;
  }, false);

  if (file.raw) {
    reader.readAsDataURL(file.raw);
  }
}

const submit = async () => {
  const brandRef = brandDoc(brandId);
  brandId = brandRef.id;
  history.replaceState(null, '', `${urlOrigin}/${urlRoute}/${brandId}`)

  brand.value.photoUrl = await uploadBrandImg(brand.value, image.value);
  if (isSubBrand) brand.value.parentName = brandList.value.find(s => s.id == brand.value.parentId)?.name;
  await setBrand(brandRef, brand.value);
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
