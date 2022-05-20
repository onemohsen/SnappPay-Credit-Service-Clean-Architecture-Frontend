<template>
  <base-admin-page :title="`New Product ${form?.name ?? ''}`">
    <el-form
      :model="form"
      label-width="120px"
    >
      <el-form-item label="Name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="Price">
        <el-input v-model="form.price" />
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
import Product from '@/models/Product';
import useNotification , { messages } from '@/composables/useNotification';
import {  useRouter } from 'vue-router';


const form = reactive({
    name: '',
    price: '',
});

const router = useRouter();


const onSubmit = async()=> {
    try {
        const request = new Product(form);
         await request.save();
        useNotification().success(messages.product.add);
        router.back();
    } catch (error) {
        useNotification().error(error?.message);
    }
};

</script>