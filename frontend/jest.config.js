module.exports = {
  coverageDirectory: "coverage",
  moduleFileExtensions: ["js", "jsx", "json"],
  setupFilesAfterEnv: ["<rootDir>/setup_tests.js"],
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
  moduleNameMapper: {
    "\\.(svg|png)": "<rootDir>/mocks/image.js",
  },
};
