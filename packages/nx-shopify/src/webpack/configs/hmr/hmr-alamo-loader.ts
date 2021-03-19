function findEntry(mod) {
  if (mod.reasons.length > 0 && mod.reasons[0].module.resource) {
    return findEntry(mod.reasons[0].module);
  }
  return mod.resource;
}

/**
 * Adds a small script to flag unhandled HMR events.
 */
module.exports = function hmrAlamoLoader(content) {
  const entry = findEntry(this._module);

  if (this._module.resource === entry) {
    const alamo = `
      // If we reached this module (the entry point), it means no one accepted the HRM.
      // Let's reload the page then.
      if (module.hot) {
        module.hot.accept();
        // On first load, module.hot.data is undefined since it is not an update...
        // So if we do have a data object, it means we've been HMR'ed.
        if (module.hot.data) {
          window.__shopify__should_reload__ = true;
        }
      }
    `;

    return `${content}\n\n${alamo}`;
  }
  return content;
};
