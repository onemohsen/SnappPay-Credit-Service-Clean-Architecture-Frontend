<template>
  <base-admin-page title="Buy Product">
    <el-form
      :model="form"
      label-width="120px"
    >
      <el-form-item label="Products">
        <el-select
          v-model="form.product_id"
          placeholder="please select your product"
        >
          <el-option
            v-for="item in products"
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
          Buy
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
import Product from '@/models/Product';
import User from '@/models/User';
import useErrorHandler from '../../../composables/useErrorHandler';
import useNotification from '../../../composables/useNotification';
import axios from 'axios';
import { useAuth } from '~/plugins/auth';


// do not use same name with ref
const form = reactive({
  product_id: '',
  user_id: '',
})

const products = ref([]);
const users = ref([]);
const auth = useAuth();

(async () => {
  const {data : productData} = await Product.all();
  products.value = productData;
  const {data: userData} = await User.all();
  users.value = userData;
})();


const onSubmit = async () => {
        
    try {
        const req = axios.create({
            baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api/v1',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth.getToken.value,
            }
        });
        await req.post(
            `/transactions/users/${form.user_id}/products/${form.product_id}`,
            {product_id: form.product_id,user_id: form.user_id,}
        );
        useNotification().success('Transaction has been created');
        form.product_id = '';
        form.user_id = '';
    } catch (error) {
        useErrorHandler().handler(error);
        throw error;
    }
}
</script>
