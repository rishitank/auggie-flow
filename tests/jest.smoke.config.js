export default {
  testEnvironment: 'node',
  testMatch: [
    '<rootDir>/tests/cli/**/*.test.[tj]s',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { useESM: true, isolatedModules: true }],
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx', '.js'],
  moduleNameMapper: {
    // Allow importing ESM .js paths without breaking Jest
    '/^(\\.{1,2}\\/.*)\\.js$/': '$1',
  },
  setupFiles: [
    '<rootDir>/tests/smoke.setup.js'
  ],
  globals: {
    'ts-jest': {
      useESM: true,
      tsconfig: {
        esModuleInterop: true,
        allowJs: true,
        module: 'esnext'
      }
    }
  }
}

