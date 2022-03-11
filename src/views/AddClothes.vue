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
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon">
          <plus />
        </el-icon>
      </el-upload>
    </el-row>
    <el-row justify="center" style="width: 100%;">
      <el-select v-model="clothes.brandId" placeholder="Brand">
        <el-option-group v-for="group in brandList" :key="group.label" :label="group.label">
          <el-option
            v-for="item in group.options"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-option-group>
      </el-select>
      <el-select v-model="clothes.statusId" placeholder="Status">
        <el-option
          v-for="item in statusList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <el-select v-model="clothes.locationId" placeholder="Location">
        <el-option
          v-for="item in locationList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
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
import { statusList } from '@/components/models/status.model';
import { getBrandsGrouped, getBrandName } from '@/plugins/firebase/brands';
import type { ILocation } from '@/components/models/location.model';
import { getLocations } from '@/plugins/firebase/locations';
import { clothesHistoryDoc } from '@/plugins/firebase/history';
import { Timestamp, writeBatch } from 'firebase/firestore';
import { fs } from '@/plugins/firebase/firebase';
import type { IClothesHistory } from '@/components/models/history.model';

const route = useRoute();
const urlRoute = route.name as string;
const urlOrigin = new URL(window.location).origin;
let clothesId = route.params.id as string; // read parameter id (it is reactive) 
const image = ref()
const imageUrl = ref()
let photoHasChanged = false;
const clothes = ref<IClothes>({
  id: '',
  brandId: '',
  brand: '',
  statusId: '',
  status: '',
  locationId: '',
  location: '',
  tagId: [],
  photoUrl: '',
  description: ''
});

let clothesOG: IClothes;

const brandList = ref<{ label: string, options: IBrand[]}[]>([]);
const locationList = ref<ILocation[]>([]);

(async () => {
  if (clothesId) {
    const req = await getClothesById(clothesId);
    if (req) {
      clothes.value = req;
      clothesOG = {...req};
      imageUrl.value = clothes.value.photoUrl;
    }
    else {
      clothesId = '';
      history.pushState(null, '', `${urlOrigin}/${urlRoute}`)
    }
  }
  //Get grouped list of Brands and Locations
  brandList.value = await getBrandsGrouped();
  locationList.value = await getLocations();
})()

const onChange = (file: any) => {
  photoHasChanged = true;
  image.value = file.raw;

  const reader = new FileReader();
  reader.addEventListener("load", function () {
    // convert image file to base64 string
    imageUrl.value = reader.result as string;
  }, false);

  if (file.raw) {
    reader.readAsDataURL(file.raw);
  }
}

const submit = async () => {
  const clothesRef = clothesDoc(clothesId);
  const historyRef = clothesHistoryDoc();
  clothesId = clothesRef.id;
  history.replaceState(null, '', `${urlOrigin}/${urlRoute}/${clothesId}`)
  clothes.value.brand = getBrandName(clothes.value.brandId as string);
  clothes.value.status = getPropById(clothes.value.statusId,'name', statusList);
  clothes.value.location = getPropById(clothes.value.locationId,'name', locationList.value);
  if(photoHasChanged) {
    imageUrl.value = clothes.value.photoUrl = await uploadClothesImg(clothes.value, image.value);
    photoHasChanged = false;
  }

  const batch = writeBatch(fs);
  batch.set(clothesRef, {...clothes.value});
  if(clothes.value.status != clothesOG.status || clothes.value.location != clothesOG.location) {
    console.log('statusChange')
    const clothesHistory: IClothesHistory = {
      id: historyRef.id,
      clothesId: clothesId,
      statusId: clothes.value.statusId,
      status: clothes.value.status,
      locationId: clothes.value.locationId,
      location: clothes.value.location,
      date: new Date()
    }
    batch.set(historyRef, {...clothesHistory});
  }
  await batch.commit();
}

const getPropById = (id: string | null, key: string, list: any[]): string => {
  const res = list.find(s => s.id == id)[key];
  return res ? res : '';
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
