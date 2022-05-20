<template>
  <base-admin-page :title="`Edit CreditPackage #${form?.id ?? ''} - ${form?.name ?? ''}`">
    <el-form
      v-if="form"
      :model="form"
      label-width="120px"
    >
      <el-form-item label="Name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="Price">
        <el-input
          v-model="form.price"
          type="number"
        />
      </el-form-item>
      <el-form-item label="Payment Deadline Days">
        <el-input
          v-model="form.payment_deadline_by_days"
          type="number"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit"
        >
          Create
        </el-button>
        <el-button @click="$router.back()">
          Cancel
        </el-button>
      </el-form-item>
    </el-form>
  </base-admin-page>
</template>

<script setup>

import { defineProps, ref } from 'vue';
import CreditPackage from '@/models/CreditPackage';
import useNotification , { messages } from '@/composables/useNotification';
import {  useRouter } from 'vue-router';
import useErrorHandler from '@/composables/useErrorHandler';


const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  
});

const form = ref();
const router = useRouter();

async function getItem () {
	try {
        form.value = await CreditPackage.$find(props.id);
    } catch (error) {
        useNotification().error(error?.message);
    }
}

(async () => {
    await getItem();
})();


const onSubmit = async()=> {
    try {
        const request = new CreditPackage(form.value);
        await request.patch();
        useNotification().success(messages.creditPackage.edit);
        router.back();
    } catch (error) {
        useErrorHandler().handler(error);
    }
};


</script>