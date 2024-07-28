const jsdoc = require("eslint-plugin-jsdoc");

module.exports = [
    {
        files: ["**/*.js", "**/*.ts"], 
        ignores: [
            '**/node_modules/**',
            '**/__tests__/**',
            'build/',
            '*.test.js',
            '.expo/**',
            'dist/**'
        ],
        plugins: {
            jsdoc: jsdoc
        },
        rules: {
            "jsdoc/require-description": "error",
            "jsdoc/check-values": "error"
        }
    }
];
