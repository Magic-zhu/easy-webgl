module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['prettier'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 13,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint'],
    rules: {
        'no-unused-vars': 'off',
        'require-jsdoc': 'off',
        'valid-jsdoc': 'off',
        'linebreak-style': 'off',
    },
};
