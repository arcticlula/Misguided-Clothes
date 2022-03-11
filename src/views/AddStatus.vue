<template>
  <el-main>
    <el-table :data="statusList" style="width: 100%">
      <el-table-column prop="name" label="Name" />
      <el-table-column prop="location" label="Location">
        <template #default="scope">
          <el-tag disable-transitions>
            {{ scope.row.location ? scope.row.location : 'default' }}
          </el-tag>
        </template>
      </el-table-column>
    </el-table>
    <el-row justify="center" style="width: 100%;">
      <el-select v-model="status.id" placeholder="Select">
        <el-option
          v-for="item in statusList"
          :key="item.status"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <el-select v-model="status.locationId" placeholder="Select">
        <el-option v-for="item in locationList" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <el-button type="primary" plain :icon="CirclePlus" v-on:click="submit">Save</el-button>
    </el-row>
  </el-main>
  <!-- {{ status }} -->
  {{ statusList }}
</template>

<script setup lang="ts">
import { CirclePlus, Plus } from '@element-plus/icons-vue'
import { ref } from 'vue';
import type { IStatus } from '@/components/models/status.model';
import { getStatuses, setStatus } from '@/plugins/firebase/status';
import type { ILocation } from '@/components/models/location.model';
import { getLocations } from '@/plugins/firebase/locations';

const status = ref<IStatus>({
  id: '',
  status: 0,
  name: '',
  location: '',
  locationId: null
});

const statusList = ref<IStatus[]>([]);
const locationList = ref<ILocation[]>([]);

(async () => {
  statusList.value = await getStatuses();
  locationList.value = await getLocations();
})()

const submit = async () => {
  const stat = statusList.value.find(s => s.id == status.value.id);
  if(stat) {
    status.value.status = stat.status;
    status.value.name = stat.name;
  }
  status.value.location = locationList.value.find(s => s.id == status.value.locationId)?.name;

  statusList.value = await setStatus(status.value);
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
