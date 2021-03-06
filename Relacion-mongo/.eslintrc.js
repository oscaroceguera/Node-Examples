module.exports = {
    "rules": {
        "indent": [
            2,
            "tab"
        ],
        "quotes": [
            2,
            "single"
        ]
    },
    "env": {
        "es6": true,
        "browser": true
    },
    "extends": "eslint:recommended",
    "ecmaFeatures": {
        "jsx": true,
        "experimentalObjectRestSpread": true
    },
    "plugins": [
        "react"
    ]
};
