<template>
  <base-admin-page title="Activation Credit Package">
    <el-form
      :model="form"
      label-width="120px"
    >
      <el-form-item label="Credit Packages">
        <el-select
          v-model="form.credit_package_id"
          placeholder="please select your Credit Packages"
        >
          <el-option
            v-for="item in creditPackages"
            :key="item.id"
            :label="`#${item.id}-${item.name}`"
            :value="item.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="Users">
        <el-select
          v-model="form.user_id"
          placeholder="please select your user"
        >
          <el-option
            v-for="item in users"
            :key="item.id"
            :label="`#${item.id}-${item.name}`"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      
      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit"
        >
          Active
        </el-button>
        <el-button @click="$router.back()">
          Cancel
        </el-button>
      </el-form-item>
    </el-form>
  </base-admin-page>
</template>

<script setup>
import { reactive, ref } from 'vue'
import CreditPackage from '@/models/CreditPackage';
import User from '@/models/User';
import useErrorHandler from '../../../composables/useErrorHandler';
import useNotification from '../../../composables/useNotification';
import axios from 'axios';
import projectConfig from '@/composables/useProjectConfig'


// do not use same name with ref
const form = reactive({
  credit_package_id: '',
  user_id: '',
})

const creditPackages = ref([]);
const users = ref([]);

(async () => {
  const {data : creditPackagesData} = await CreditPackage.all();
  creditPackages.value = creditPackagesData;
  console.log(creditPackages.value);
  const {data: userData} = await User.all();
  users.value = userData;
})();


const onSubmit = async () => {

    try {
        const req = axios.create({
            baseURL: projectConfig.api,
            headers: {
                'Content-Type': 'application/json',
            }
        });

        await req.post(
            `/transactions/users/${form.user_id}/credit-packages/${form.credit_package_id}`,
            {credit_package_id: form.credit_package_id,user_id: form.user_id,}
        );
        useNotification().success('Transaction has been created');
        form.credit_package_id = '';
        form.user_id = '';
    } catch (error) {
        useErrorHandler().handler(error);
    }
}
</script>
