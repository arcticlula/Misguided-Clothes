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
        <img v-if="location.photoUrl" :src="location.photoUrl" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon">
          <plus />
        </el-icon>
      </el-upload>
    </el-row>
    <el-row justify="center" style="width: 100%;">
      <el-input placeholder="Please input" v-model="location.name" clearable></el-input>
      <el-button type="primary" plain :icon="CirclePlus" v-on:click="submit">Save</el-button>
    </el-row>
  </el-main>
  {{ location }}
</template>

<script setup lang="ts">
import { CirclePlus, Plus } from '@element-plus/icons-vue'
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import type { ILocation } from '@/components/models/location.model';
import { getLocationById, locationDoc, uploadLocationImg, setLocation } from '@/plugins/firebase/locations';

const route = useRoute();
const urlRoute = route.name as string;
const urlOrigin = new URL(window.location).origin;
let locationId = route.params.id as string; // read parameter id (it is reactive) 
const image = ref()
const location = ref<ILocation>({
  id: '',
  name: '',
  photoUrl: '',
  location: ''
});


(async () => {
  if (locationId) {
    const req = await getLocationById(locationId);
    if (req) {
      location.value = req;
    }
    else {
      locationId = '';
      history.pushState(null, '', `${urlOrigin}/${urlRoute}`)
    }
  }
})()

const onChange = (file: any) => {
  image.value = file.raw;

  const reader = new FileReader();
  reader.addEventListener("load", function () {
    // convert image file to base64 string
    location.value.photoUrl = reader.result as string;
  }, false);

  if (file.raw) {
    reader.readAsDataURL(file.raw);
  }
}

const submit = async () => {
  const locationRef = locationDoc(locationId);
  locationId = locationRef.id;
  history.replaceState(null, '', `${urlOrigin}/${urlRoute}/${locationId}`)
  location.value.photoUrl = await uploadLocationImg(location.value, image.value);
  await setLocation(locationRef, location.value);
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
