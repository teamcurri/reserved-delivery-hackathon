module.exports = {
  verbose: true,
  collectCoverage: true,
  coverageReporters: ['text-summary'],
  cacheDirectory: 'node_modules/.cache/jest',
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/', 'dist'],
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        isolatedModules: true,
        tsconfig: {
          moduleResolution: 'classic',
          resolveJsonModule: false,
        },
      },
    ],
  },
  moduleNameMapper: {
    '^uuid$': 'uuid',
    '^msgpackr$': 'msgpackr',
  },
}
