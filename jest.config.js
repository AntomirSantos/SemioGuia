module.exports = {
  preset: 'jest-expo',
  testMatch: ['**/*.test.ts', '**/*.test.tsx'],
  // lucide-react-native's "react-native"/"module" entry is ESM (.mjs), which the
  // RN jest transform (matching only .js/.jsx/.ts/.tsx) doesn't process. Force
  // resolution to its CommonJS build instead of widening the transform pipeline.
  moduleNameMapper: {
    '^lucide-react-native$': '<rootDir>/node_modules/lucide-react-native/dist/cjs/lucide-react-native.js',
  },
};
