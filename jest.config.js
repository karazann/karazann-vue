module.exports = {
    testMatch: ['**/?(*.)+(spec|test).+(ts|js)'],
    moduleFileExtensions: ['js', 'json', 'ts', 'vue'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1'
    },
    transform: {
        '^.+\\.ts$': 'ts-jest',
        '.*\\.(vue)$': 'vue-jest'
    },
    globals: {
        'vue-jest': {
            babelConfig: false
        }
    }
}
