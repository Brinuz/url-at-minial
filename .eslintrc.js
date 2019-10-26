module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "jest": true
    },
    "extends": "airbnb",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "react-hooks",
        "html"
    ],
    "rules": {
        "linebreak-style": 0,
        "react/jsx-indent": ["error", 4],
        "indent": ["error", 4, { "ignoredNodes": ["JSXElement"] }],
    },
    "parser": "babel-eslint"
};