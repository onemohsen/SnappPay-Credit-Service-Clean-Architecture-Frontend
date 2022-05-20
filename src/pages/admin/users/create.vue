<template>
  <base-admin-page :title="`New User ${form?.name ?? ''}`">
    <el-form
      :model="form"
      label-width="120px"
    >
      <el-form-item label="Name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="Email">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item label="Password">
        <el-input
          v-model="form.password"
          type="password"
        />
      </el-form-item>
      <el-form-item label="Confirm Password">
        <el-input
          v-model="form.password_confirmation"
          type="password"
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
import User from '@/models/User';
import useNotification , { messages } from '@/composables/useNotification';
import {  useRouter } from 'vue-router';


const form = reactive({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
});

const router = useRouter();


const onSubmit = async()=> {
    try {
        const request = new User(form);
         await request.save();
        useNotification().success(messages.user.add);
        router.back();
    } catch (error) {
        useNotification().error(error?.message);
    }
};

</script>