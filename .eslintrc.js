module.exports = {
  "env": {
    "browser": true,
		"node": true,
    "es6": true,
    "jest": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "plugins": ["react", "@typescript-eslint"],
  "settings": {
    "react": {
      "pragma": "React",
      "version": "detect"
    }
  },
  "rules": {
		"@typescript-eslint/semi": ["error", "always"],
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/explicit-module-boundary-types": 0,
		"@typescript-eslint/no-var-requires": 0,
		'@typescript-eslint/no-explicit-any': 0
  }
}