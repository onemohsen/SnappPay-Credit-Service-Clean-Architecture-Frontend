<template>
  <div>
    <base-admin-page title="Products">
      <RouterLink
        :to="{name:'admin-products-create'}"
        class="p-2 border bg-blue-500 hover:bg-blue-700 text-white text-sm rounded w-20 text-center"
      >
        + New
      </RouterLink>

      <el-table
        :data="products.data"
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
              :to="{name:'admin-products-id',params:{id:scope.row?.id}}"
            >
              <span class="font-bold text-blue-600">{{ scope.row?.id ?? '-' }}</span>
            </RouterLink>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="Name"
          width="180"
        >
          <template #default="scope">
            <RouterLink
              v-if="scope.row?.id"
              :to="{name:'admin-products-id',params:{id:scope.row?.id}}"
            >
              <span class="font-bold text-blue-600">{{ scope.row?.name ?? '-' }}</span>
            </RouterLink>
          </template>
        </el-table-column>
        <el-table-column
          prop="price"
          label="Price"
        />

        <ElTableColumn
          label="action"
          min-width="130"
        >
          <template #default="scope">
            <div class="flex items-center space-x-2 space-x-reverse">
              <RouterLink
                :to="{ name: 'admin-products-edit-id', params: { id: scope.row.id} }"
              >
                <ElTooltip
                  class="item"
                  effect="dark"
                  content="edit"
                  placement="bottom"
                >
                  <div>
                    <IconPencilAlt class="w-4 h-4 text-gray-400 hover:text-gray-700" />
                  </div>
                </ElTooltip>
              </RouterLink>
              <ElPopconfirm
                confirm-button-text="yes"
                cancel-button-text="no"
                icon-color="red"
                title="Are you sure to delete this item?"
                @confirm="deleteItem(scope.row?.id)"
              >
                <template #reference>
                  <ElButton class="btn">
                    <ElTooltip
                      class="item"
                      effect="dark"
                      content="delete"
                      placement="bottom"
                    >
                      <div>
                        <IconTrash class="w-4 h-4 text-gray-400 hover:text-gray-700" />
                      </div>
                    </ElTooltip>
                  </ElButton>
                </template>
              </ElPopconfirm>
            </div>
          </template>
        </ElTableColumn>
      </el-table>
      <Pagination
        v-if="products?.meta"
        class="mt-5"
        :meta="products.meta"
      />
    </base-admin-page>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import Product from "@/models/Product";
import { useRoute } from 'vue-router';
import useNotification from '@/composables/useNotification';


const products = ref([]);

const route = useRoute();


async function getItems () {
	const page = +(route.query.page || 1);
	try {
        const { data,meta } = await Product.page(page).get();
        products.value.data = data;
        products.value.meta = meta;
    } catch (error) {
        useNotification().error(error?.message);
    }
    
}


(async () => {
    await getItems();
})();


const deleteItem = async (id)=> {
    try {
        const request = new Product({id});
        const {data} = await request.delete(id);
        useNotification().success(data.message);
        products.value.data = products.value.data.filter(item => item.id !== id);
    } catch (error) {
        useNotification().error(error?.message);
    }
}

</script>


<style scoped>
.el-button {
	background: none;
	border: 0;
}

.el-button:hover {
	background-color: none;
}

.el-button--small {
	padding: 0;
}
</style>