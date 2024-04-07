import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'https://api.cartridge.gg/x/taleweaver/torii/graphql',
  documents: 'src/**/*.graphql',
  generates: {
    'src/dojo/graphql/generated/graphql.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-graphql-request'],
      config: {
        rawRequest: true
      },
    },
  },
};
export default config;
