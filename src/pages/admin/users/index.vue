<template>
  <div>
    <base-admin-page title="Users">
      <RouterLink
        :to="{name:'admin-users-create'}"
        class="p-2 border bg-blue-500 hover:bg-blue-700 text-white text-sm rounded w-20 text-center"
      >
        + New
      </RouterLink>

      <el-table
        :data="users.data"
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
              :to="{name:'admin-users-id',params:{id:scope.row?.id}}"
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
              :to="{name:'admin-users-id',params:{id:scope.row?.id}}"
            >
              <span class="font-bold text-blue-600">{{ scope.row?.name ?? '-' }}</span>
            </RouterLink>
          </template>
        </el-table-column>
        <el-table-column
          prop="email"
          label="email"
        />
        <el-table-column
          prop="wallet_balance"
          label="wallet balance"
        >
          <template #default="scope">
            <span class="font-bold ">{{ scope.row?.wallet_balance?.toLocaleString() ?? '-' }}</span>
          </template>
        </el-table-column>

        <ElTableColumn
          label="action"
          min-width="130"
        >
          <template #default="scope">
            <div class="flex items-center space-x-2 space-x-reverse">
              <RouterLink
                :to="{ name: 'admin-users-edit-id', params: { id: scope.row.id} }"
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
        v-if="users?.meta"
        class="mt-5"
        :meta="users.meta"
      />
    </base-admin-page>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import User from "@/models/User";
import { useRoute } from 'vue-router';
import useNotification from '@/composables/useNotification';


const users = ref([]);

const route = useRoute();


async function getItems () {
	const page = +(route.query.page || 1);
	try {
        const { data,meta } = await User.page(page).get();
        users.value.data = data;
        users.value.meta = meta;
    } catch (error) {
        useNotification().error(error?.message);
    }
    
}


(async () => {
    await getItems();
})();


const deleteItem = async (id)=> {
    try {
        const request = new User({id});
        const {data} = await request.delete(id);
        useNotification().success(data.message);
        users.value.data = users.value.data.filter(item => item.id !== id);
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