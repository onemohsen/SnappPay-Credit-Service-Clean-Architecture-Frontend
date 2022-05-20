<template>
  <div>
    <base-admin-page title="Products">
      <el-row v-if="product">
        <el-card :body-style="{ padding: '0px' }">
          <div class="p-5">
            <el-avatar
              :size="60"
            >
              <img
                src=""
              >
            </el-avatar>
            <p>
              <span>Name: </span>
              <span class="font-bold">{{ product?.name }}</span>
            </p>
            <p>
              <span>Price: </span>
              <span class="font-bold">{{ product?.price?.toLocaleString() }}</span>
            </p>
          </div>
        </el-card>
      </el-row>
    </base-admin-page>
  </div>
</template>


<script setup>
import { ref,defineProps } from 'vue';
import useNotification from '@/composables/useNotification';
import Product from "@/models/Product";



const product = ref();


const props = defineProps({
	id: {
		type: String,
		required: true,
	},
});


async function getItem () {
    try {
        product.value = await Product.$find(props.id);
    } catch (error) {
        useNotification().error(error?.message);
    }
}


(async () => {
    await getItem();
})();


</script>