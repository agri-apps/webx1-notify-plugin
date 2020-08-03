import initFlash from "./flash";

const PLUGIN = "webx1NotifyPlugin";

const install = (app, options) => {
  let flashApi = initFlash(app, options);

  return flashApi;
};

export default {
  name: PLUGIN,
  global: "$",
  install,
};
