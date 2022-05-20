<template>
  <div>
    <base-admin-page :title="`Credit Package ${item?.name ?? ''} `">
      <el-row v-if="item">
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
              <span class="font-bold">{{ item?.name }}</span>
            </p>
            <p>
              <span>Price: </span>
              <span class="font-bold">{{ item?.price?.toLocaleString() }}</span>
            </p>
            <p>
              <span>Payment Deadline Days: </span>
              <span class="font-bold">{{ item?.payment_deadline_by_days }}</span>
            </p>
          </div>
        </el-card>
      </el-row>
    </base-admin-page>
  </div>
</template>


<script setup>
import { ref,defineProps } from 'vue';
import CreditPackage from "@/models/CreditPackage";
import useErrorHandler from '@/composables/useErrorHandler';


const item = ref();
const props = defineProps({
	id: {
		type: String,
		required: true,
	},
});

async function getItem () {
    try {
        item.value = await CreditPackage.$find(props.id);
    } catch (error) {
      useErrorHandler().handler(error);
    }
}


(async () => {
    await getItem();
})();


</script>