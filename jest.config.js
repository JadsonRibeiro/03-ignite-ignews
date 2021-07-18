module.exports = {
  // Pastas que o Jest deve ignorar
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],

  // Arquivos que devem ser executados antes dos testes
  setupFilesAfterEnv: [
    "<rootDir>/src/tests/setupTests.ts"
  ],

  // Configuracao para transpilar arquivos para que o jest entenda
  // O Jest não entende Typescript
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest"
  },

  // Configuracao para transpilar arquivos de estilo
  // Essa é a biblioteca recomendada pelo Next
  moduleNameMapper: {
    "\\.(scss|css|sass)$": "identity-obj-proxy"
  },

  // Seta o tipo do ambiente para os testes
  testEnvironment: "jsdom",

  // Configuracoes para verificar cobertura dos testes
  // Ao executar testes usar, yarn jest --coverage
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.tsx",
    "!src/**/_app.tsx",
    "!src/**/_document.tsx",
  ],
  coverageReporters: ["lcov", "json"]
};