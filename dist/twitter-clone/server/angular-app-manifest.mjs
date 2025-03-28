
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: false,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 442, hash: '7c9d4892dbdbcacdc179d3c2d93e3d46af4bc7da1b91276343e8bdfdccf94515', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 982, hash: '17476c38731f8ccd63fdc7cc58c8ff3c104ec8568b0c35bd3b1d8cd83b87a2d3', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 6042, hash: '96226459e1f15fd240418a472824de2c3e57067a0136995aeab7fd24bdd18555', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)}
  },
};
