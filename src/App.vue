<template>
  <div
    id="wrapper"
  >
    <!-- <ElProgress
      :percentage="100"
      :indeterminate="true"
      :show-text="false"
      :duration="2"
      :stroke-width="2"
    /> -->
    <!-- <ElMain
			id="content"
			class="flex-fill p-0"
		> -->
    <!--   <ElContainer v-if="error">
      {{ error.message }}
    </ElContainer> -->
    <RouterView v-slot="{ Component, route }">
      <Transition mode="out-in">
        <div :key="route.meta?.key || route.path">
          <Suspense>
            <template #default>
              <div>
                <Component
                  :is="Component"
                  :key="$route.fullPath"
                />
              </div>
            </template>
          </Suspense>
        </div>
      </Transition>
    </RouterView>
    <!-- </ElMain> -->
  </div>
</template>
<script>

</script>