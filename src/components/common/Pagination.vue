<template>
  <div
    dir="ltr"
    class="text-center"
  >
    <ElPagination
      :background="background"
      layout="prev, pager, next"
      :page-count="meta?.last_page"
      :current-page="meta?.current_page"
      :disabled="isDisabled"
      :small="true"
      @current-change="currentChange"
    />
  </div>
</template>

<script>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
	props: {
		meta: {
			type: Object,
			required: true,
		},
		background: {
			type: Boolean,
			default: false,
		},
	},
	setup (props) {
		const route = useRoute();
		const router = useRouter();

		const isDisabled = computed(() => props.meta?.total < props.meta?.per_page);

		const currentChange = (page) => {
			router.push({ query: { ...route.query, page } });
			window.scroll(0, 0);
		};
		return { isDisabled, currentChange };
	},
};
</script>

