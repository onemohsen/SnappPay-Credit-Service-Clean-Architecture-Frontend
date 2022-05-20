<template>
  <div
    id="wrapper"
  >
    <Header />
    <ElProgress
      v-if="loading"
      :percentage="100"
      :indeterminate="true"
      :show-text="false"
      :duration="2"
      :stroke-width="2"
    />
    <!-- <ElMain
			id="content"
			class="flex-fill p-0"
		> -->
    <ElContainer v-if="error">
      {{ error.message }}
    </ElContainer>
    <RouterView v-slot="{ Component, route }">
      <Transition mode="out-in">
        <div :key="route.meta?.key || route.path">
          <Suspense>
            <template #default>
              <Component
                :is="Component"
                :key="$route.fullPath"
              />
            </template>
          </Suspense>
        </div>
      </Transition>
    </RouterView>
    <!-- </ElMain> -->
    <Footer />
  </div>
</template>
<script>

</script>