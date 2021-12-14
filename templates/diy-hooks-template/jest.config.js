module.exports = {
  preset: 'ts-jest',
  clearMocks: true,
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
  },
};
