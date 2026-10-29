const defaults = Object.fromEntries(FEATURES.map(f => [f.id, f.default]));

const apply = flags => {
  for (const [id, on] of Object.entries(flags)) {
    document.documentElement.toggleAttribute(`data-zt-${id}`, on);
  }
};

browser.storage.local.get(defaults).then(apply);

browser.storage.onChanged.addListener(changes => {
  apply(Object.fromEntries(Object.entries(changes).map(([id, c]) => [id, c.newValue])));
});
