module.exports = {
    "extends": "eslint:recommended",
    "env": {
        "es6": true,
        "node": true
    },
    "rules": {
        // enable additional rules
        "indent": ["error", 4],
        "linebreak-style": ["error", "unix"],
        "quotes": ["error", "single"],
        "semi": ["error", "always"],

        // override default options for rules from base configurations
        "comma-dangle": ["error", "never"],
        "no-cond-assign": ["error", "always"],

        // disable rules from base configurations
        "no-console": "off",
    }
}
