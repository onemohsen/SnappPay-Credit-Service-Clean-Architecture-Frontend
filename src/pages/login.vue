<template>
  <div class="container mx-auto flex items-center justify-center h-screen">
    <el-form
      :model="form"
      label-width="120px"
    >
      <el-form-item label="Email">
        <el-input
          v-model="form.email"
        />
      </el-form-item>
      <el-form-item label="Password">
        <el-input
          v-model="form.password"
          type="password"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          v-loading="loading"
          type="primary"
          @click="onSubmit"
        >
          Login
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref,onUnmounted } from 'vue'
import { useAuth } from '~/plugins/auth';
import useErrorHandler from '~/composables/useErrorHandler';
import { useRouter } from 'vue-router';


const auth = useAuth();
const router = useRouter();
const timer = ref(null);
const loading = ref(false);

const form = reactive({
  email: '',
  password: '',
})


if( auth.getToken.value) {
    router.push({ name: 'admin' });
}

onUnmounted(()=>{
    if(!timer.value) return;
    clearTimeout(timer.value);
});


const onSubmit = async() => {
    try {
        loading.value = true;
        await auth.login({
            email: form.email,
            password: form.password,
        });

        timer.value = setTimeout(() => {
            router.push({ name: 'admin' });
        }, 1000);

    } catch (e) {
        loading.value = false;
        await useErrorHandler().handler(e);
    }
}

</script>
