<template>
  <!-- Desktop sidebar -->
  <aside class="z-20 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block flex-shrink-0">
    <div class="py-4 text-gray-500 dark:text-gray-400">
      <RouterLink
        class="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200"
        to="/admin"
      >
        SnappPayCreditService
      </RouterLink>
      <div class="mt-6" />
      <ul>
        <li
          v-for="link in links"
          :key="link.url"
          class="relative px-6 py-3"
        >
          <RouterLink
            class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
            :to="link.url"
          >
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            <span class="ml-4">{{ link.title }}</span>
          </RouterLink>
        </li>
        <li
          class="relative px-6 py-3"
        >
          <button
            class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
            @click="logout"
          >
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            <span class="ml-4">Exit</span>
          </button>
        </li>
      </ul>
    </div>
  </aside>
  <!-- Mobile sidebar -->
  <!-- Backdrop -->
  <div
    class="fixed inset-0 z-10 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center"
    style="display: none;"
  />
  <aside
    class="fixed inset-y-0 z-20 flex-shrink-0 w-64 mt-16 overflow-y-auto bg-white dark:bg-gray-800 md:hidden"
    style="display: none;"
  >
    <div class="py-4 text-gray-500 dark:text-gray-400">
      <a
        class="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200"
        href="#"
      >
        Windmill
      </a>
      <ul class="mt-6">
        <li class="relative px-6 py-3">
          <span
            class="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
            aria-hidden="true"
          />
          <a
            class="inline-flex items-center w-full text-sm font-semibold text-gray-800 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-100"
            href="index.html"
          >
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span class="ml-4">Dashboard22</span>
          </a>
        </li>
      </ul>
      <ul>
        <li
          v-for="link in links"
          :key="link.url"
          class="relative px-6 py-3"
        >
          <RouterLink
            class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
            :to="link.url"
          >
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            <span class="ml-4">{{ link.tilte }}</span>
          </RouterLink>
        </li>
      </ul>
    </div>
  </aside>
</template>


<script setup>
import { reactive, ref } from "vue";
import { useAuth } from '~/plugins/auth';

const auth = useAuth();



const logout = async () => {
  try {
    await auth.logout();
    window.location.href = "/login";
  } catch (error) {
    return
  }
};

const links = reactive([
  {
		title: 'Dashboard',
		icon: '',
		url: {
			name: 'admin-dashboard',
		},
	},
	{
		title: 'Product',
		icon: '',
		url: {
			name: 'admin-products',
		},
	},
  {
		title: 'User',
		icon: '',
		url: {
			name: 'admin-users',
		},
	},
  {
		title: 'Credit Packages',
		icon: '',
		url: {
			name: 'admin-credit-packages',
		},
	},
  {
		title: 'Transactions',
		icon: '',
		url: {
			name: 'admin-transactions',
		},
	},
  {
		title: 'Buy Product',
		icon: '',
		url: {
			name: 'admin-buy-product',
		},
	},
  {
		title: 'Activation Credit Package',
		icon: '',
		url: {
			name: 'admin-activation-credit-package',
		},
	},
]);



</script>