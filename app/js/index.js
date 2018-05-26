'use strict';

import Vue from 'vue';

import {wait} from 'modules/module_sample';
import SampleComponent from 'components/sample.vue';

// async promise nomally
wait(100).then(() => console.log('promise normaly done'));

async function main() {
	console.log(`first ${Date.now()}`);
	await wait(1000);
	console.log(`second ${Date.now()}`);
	await wait(1000);
	console.log(`await done ${Date.now()}`);
}

new Vue({
	el: 'main',
	components: {SampleComponent},
	async created() {
		await main();
	}
});
