<template>
  <div class="flex h-screen bg-gray-50 dark:bg-gray-900">
    <SidebarAdmin />
    <div class="flex flex-col flex-1 w-full">
      <HeaderAdmin />
      <RouterView />
    </div>
  </div>
</template>

<route>
{
  meta:{
    auth: true,
    middlewares: 'adminPanelPermissions',
  }
}
</route>