import { Model } from 'vue-api-query';

export default ({ app }) => {
	Model.$http = app.api;
};
