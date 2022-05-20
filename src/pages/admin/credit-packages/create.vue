<template>
  <base-admin-page :title="`New CreditPackage ${form?.name ?? ''}`">
    <el-form
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

import { reactive } from 'vue';
import CreditPackage from '@/models/CreditPackage';
import useNotification , { messages } from '@/composables/useNotification';
import {  useRouter } from 'vue-router';
import useErrorHandler from '@/composables/useErrorHandler';


const form = reactive({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
});

const router = useRouter();


const onSubmit = async()=> {
    try {
        const request = new CreditPackage(form);
         await request.save();
        useNotification().success(messages.creditPackage.add);
        router.back();
    } catch (error) {
        useErrorHandler().handler(error);
    }
};

</script>