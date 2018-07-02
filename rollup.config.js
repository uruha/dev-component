const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const typescript = require('rollup-plugin-typescript2');

export default {
    input: './src/index.ts',
    output: {
        file: './dist/index.js',
        format: 'cjs'
    },
    plugins: [
        resolve({
            browser: true,
            jsnext: true,
            preferBuiltins: false,
            extensions: ['.ts', '.js', '.json']
        }),
        commonjs({
            include: 'node_modules/**'
        }),
        typescript({
            tsconfigOverride: {
                include: ['src/**/*.ts']
            }
        })
    ]
};
