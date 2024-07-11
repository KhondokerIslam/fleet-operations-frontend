module.exports = {
    transform: {
        "^.+\\.[t|j]sx?$": "babel-jest"
    },
    moduleFileExtensions: ["js", "jsx", "json", "node"],
    testEnvironment: "jsdom",
    transformIgnorePatterns: [
        "/node_modules/(?!(axios)/)" // Add axios to the list of modules to transpile
    ],
};
