'use strict';

import {wait} from 'modules/module_sample';

// async promise nomally
wait(100).then(() => console.log('promise normaly done'));

async function main() {
	console.log(`first ${Date.now()}`);
	await wait(1000);
	console.log(`second ${Date.now()}`);
	await wait(1000);
	console.log(`await done ${Date.now()}`);
}

// await
main();
