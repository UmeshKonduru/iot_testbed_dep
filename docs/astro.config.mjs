// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
    site: 'https://umeshkonduru.github.io',
    base: 'iot_testbed_dep',
    integrations: [starlight({
        title: 'IoT Testbed Docs',
        social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/UmeshKonduru/iot_testbed_dep.git' }],
        sidebar: [
		{
			label: 'Quickstart',
			slug: ''
		},
		{
			label: 'API Reference',
			items: [
				{ label: 'Authentication', slug: 'api/auth' },
			],
		},
        ],
		}), react()],
});
