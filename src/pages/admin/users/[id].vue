<template>
  <div>
    <base-admin-page :title="`User ${item?.name ?? ''} `">
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
              <span>Email: </span>
              <span class="font-bold">{{ item?.email?.toLocaleString() }}</span>
            </p>
            <p>
              <span>Wallet Balance: </span>
              <span class="font-bold">{{ item?.wallet_balance?.toLocaleString() }}</span>
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
import User from "@/models/User";

const item = ref();
const props = defineProps({
	id: {
		type: String,
		required: true,
	},
});

async function getItem () {
    try {
        item.value = await User.$find(props.id);
    } catch (error) {
        useNotification().error(error?.message);
    }
}


(async () => {
    await getItem();
})();


</script>