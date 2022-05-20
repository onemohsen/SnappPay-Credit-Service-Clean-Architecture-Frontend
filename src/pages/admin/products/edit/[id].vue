<template>
  <base-admin-page :title="`Edit Product #${form?.id ?? ''} - ${form?.name ?? ''}`">
    <el-form
      v-if="form"
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

import { defineProps, ref } from 'vue';
import Product from '@/models/Product';
import useNotification , { messages } from '@/composables/useNotification';
import {  useRouter } from 'vue-router';

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
        form.value = await Product.$find(props.id);
    } catch (error) {
        useNotification().error(error?.message);
    }
}

(async () => {
    await getItem();
})();


const onSubmit = async()=> {
    try {
        const request = new Product(form.value);
        await request.patch();
        useNotification().success(messages.product.edit);
        router.back();
    } catch (error) {
        useNotification().error(error?.message);
    }
};


</script>