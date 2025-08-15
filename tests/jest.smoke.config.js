export default {
  testEnvironment: 'node',
  testMatch: [
    '<rootDir>/cli/auggie-flow-smoke.test.ts',
    '<rootDir>/cli/engine-adapter.test.ts',
    '<rootDir>/cli/features/basic-features.test.ts'
  ],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      useESM: true,
      isolatedModules: true,
      tsconfig: {
        esModuleInterop: true,
        allowJs: true,
        module: 'esnext'
      }
    }],
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  moduleNameMapper: {
    // Allow importing ESM .js paths without breaking Jest
    '^(\\.{1,2}\\/.*)\\.js$': '$1',
  },
  setupFiles: [
    '<rootDir>/smoke.setup.js'
  ]
}

