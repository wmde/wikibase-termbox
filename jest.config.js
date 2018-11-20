module.exports = {
	globals: {
		'ts-jest': {
			tsConfigFile: './tsconfig.all.json',
		},
	},
	moduleFileExtensions: [
		'js',
		'jsx',
		'json',
		'vue',
		'ts',
		'tsx',
	],
	transform: {
		'^.+\\.vue$': 'vue-jest',
		'.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
		'^.+\\.tsx?$': 'ts-jest',
	},
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
	},
	setupTestFrameworkScriptFile: '<rootDir>/tests/config/setup.ts',
	snapshotSerializers: [
		'jest-serializer-vue',
	],
	testMatch: [
		'**/tests/(unit|edge-to-edge)/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)',
	],
	testURL: 'http://localhost/',
};
