<template>
  <div>
    <base-admin-page title="Transactions">
      <el-table
        :data="items.data"
        stripe
        style="width: 100%"
      >
        <el-table-column
          prop="id"
          label="#"
          width="180"
        >
          <template #default="scope">
            <RouterLink
              v-if="scope.row?.id"
              :to="{name:'admin-transactions-id',params:{id:scope.row?.id}}"
            >
              <span class="font-bold text-blue-600">{{ scope.row?.id ?? '-' }}</span>
            </RouterLink>
          </template>
        </el-table-column>

        <el-table-column
          label="user"
        >
          <template #default="scope">
            <router-link
              v-if="scope?.row?.user?.id"
              :to="{ name: 'admin-users-id', params: { id: scope?.row?.user?.id} }"
            >
              <span
                title="User Wallet Balance"
                class="font-bold text-blue-600"
              >
                #
                {{ scope?.row?.user?.id ?? '-' }}
                {{ scope?.row?.user?.name ?? '-' }}
              </span>
            </router-link>
          </template>
        </el-table-column>
        
        
        <el-table-column
          prop="old_user_wallet_balance"
          label="old balance"
        >
          <template #default="scope">
            <span>
              {{ scope.row?.old_user_wallet_balance?.toLocaleString() }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="price"
          label="price"
        >
          <template #default="scope">
            <span :class="` ${scope.row?.is_increment ? 'text-green-600': 'text-red-600'}`">
              {{ scope.row?.is_increment ? '+' : '-' }}
              {{ scope.row?.price?.toLocaleString() }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="new_user_wallet_balance"
          label="new balance"
        >
          <template #default="scope">
            <span>
              {{ scope.row?.new_user_wallet_balance?.toLocaleString() }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="is_increment"
          label="increment?"
        >
          <template #default="scope">
            <span :class="`font-bold ${scope.row?.is_increment ? 'text-green-600': 'text-red-600'}`">
              {{ scope.row?.is_increment ? 'Yes ( + )' : 'No ( - )' }}
            </span>
          </template>
        </el-table-column>
        
        <el-table-column
          label="related"
        >
          <template #default="scope">
            <span
              title="transactionable"
            >
              <router-link
                v-if="scope?.row?.transactionable?.id && scope?.row?.type"
                :to="{
                  name: scope?.row?.type == 'product' ? 'admin-products-id' : 'admin-credit-packages-id' ,
                  params: { id: scope?.row?.transactionable?.id} 
                }"
              >
                <span
                  title="User Wallet Balance"
                >
                  {{ scope?.row?.transactionable?.name }} ( {{ scope?.row?.type }} )
                </span>
              </router-link>
            </span>
          </template>
        </el-table-column>
      </el-table>
      <Pagination
        v-if="items?.meta"
        class="mt-5"
        :meta="items.meta"
      />
    </base-admin-page>
  </div>
</template>


<script setup>
import { onMounted, ref } from 'vue';
import Transaction from "@/models/Transaction";
import { useRoute } from 'vue-router';
import useErrorHandler from '@/composables/useErrorHandler';
import useUrlRouteQuery from '@/composables/useUrlRouteQuery';


const items = ref([]);
const route = useRoute();

async function getItems () {
	const page = +(route.query.page || 1);
	try {
        const { data,meta } = await Transaction.include(['user','transactionable']).page(page).get();
        items.value.data = data;
        items.value.meta = meta;
    } catch (error) {
        useErrorHandler().handler(error);
    }
    
}


onMounted(async () => {
	if (Object.keys(route.query).length) {
		await getModelItemsWithRoute();
	}
    else {
        await getItems();
    }
});



const getModelItemsWithRoute = async () => {
	const page = route.query.page || 1;
	const {
		data: data,
		meta: meta,
	} = await useUrlRouteQuery().getModelWithUrlQuery(Transaction, 'transactions?include=user,transactionable&', route.query, page);
	items.value.data = data;
    items.value.meta = meta;

};


</script>
