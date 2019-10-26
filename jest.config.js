module.exports = {
    coverageDirectory: 'coverage',
    moduleFileExtensions: [
        'js',
        'jsx',
        'json',
    ],
    setupFilesAfterEnv: ['<rootDir>/src/enzyme.js'],
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
};
