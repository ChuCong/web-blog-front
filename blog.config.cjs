module.exports = {
	apps : [
        {
			name: "msd",
			port: 3000,
			script: './node_modules/nuxt/bin/nuxt.mjs',
			args: 'start',
            instances: 'max',
            exec_mode: 'cluster',
            node_args: ['--expose-gc','--max-http-header-size=262144', '--max-old-space-size=4096'],
        }
	]
}