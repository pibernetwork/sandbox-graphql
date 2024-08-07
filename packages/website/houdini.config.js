/// <references types="houdini-svelte">

/** @type {import('houdini').ConfigFile} */
const config = {
  watchSchema: {
    url: 'http://localhost:3000/graphql'
  },
  plugins: {
    'houdini-svelte': {}
  },
  types: {
    User: {
      keys: ['_id']
    },
    Profile: {
      keys: ['_id']
    }
  }
};

export default config;
