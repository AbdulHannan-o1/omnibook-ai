module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@site-frontend(.*)$': '<rootDir>/frontend/src$1',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@docusaurus/Link$': '<rootDir>/frontend/src/components/__mocks__/@docusaurus/Link.tsx',
  },
  transform: {
    '^.+\.(ts|tsx)$': 'ts-jest',
    '^.+\.(js|jsx)$': 'babel-jest',
  },
  testMatch: [
    '<rootDir>/frontend/src/**/*.test.(ts|tsx|js|jsx)',
    '<rootDir>/src/**/*.test.(ts|tsx|js|jsx)',
  ],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/frontend/tsconfig.json',
    },
  },
};
