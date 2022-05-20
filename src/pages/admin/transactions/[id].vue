<template>
  <div>
    <base-admin-page :title="`Transaction #${item?.id ?? ''}`">
      <el-row v-if="item">
        <el-card :body-style="{ padding: '0px' }">
          <div class="p-5">
            <h2 class="font-bold mb-3">
              Transaction
            </h2>
            <p>
              <span>User Wallet Balance: </span>
              <span
                title="User Wallet Balance"
                class="font-bold text-blue-600"
              >{{ item?.user?.name }} ( {{ item?.user?.wallet_balance?.toLocaleString() }} )</span>
            </p>
            <p>
              <span>id: </span>
              <span class="font-bold">{{ item?.id }}</span>
            </p>
            <p>
              <span>old balance: </span>
              <span class="font-bold">{{ item?.old_user_wallet_balance?.toLocaleString() }}</span>
            </p>
            <p>
              <span>Price: </span>
              <span :class="` ${item?.is_increment ? 'text-green-600': 'text-red-600'}`">
                {{ item?.is_increment ? '+' : '-' }}
                {{ item?.price?.toLocaleString() }}
              </span>
            </p>
            <p>
              <span>new balance: </span>
              <span class="font-bold">{{ item?.new_user_wallet_balance?.toLocaleString() }}</span>
            </p>
            <p>
              <span>increment?: </span>
              <span :class="`font-bold ${item?.is_increment ? 'text-green-600': 'text-red-600'}`">
                {{ item?.is_increment ? 'Yes ( + )' : 'No ( - )' }}
              </span>
            </p>
            
            <p>
              <span>Related: </span>
              <span
                title="transactionable"
                :class="`${item?.type != 'product' ? 'text-green-600': 'text-red-600'}`"
              >
                {{ item?.transactionable?.name }} ( {{ item?.type }} )
              </span>
            </p>
          </div>
        </el-card>
      </el-row>
    </base-admin-page>
  </div>
</template>


<script setup>
import { ref,defineProps } from 'vue';
import Transaction from "@/models/Transaction";
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
        item.value = await Transaction.$find(props.id);
    } catch (error) {
       useErrorHandler().handler(error);
    }
}


(async () => {
    await getItem();
})();


</script>