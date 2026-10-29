const list = document.getElementById('list');
const defaults = Object.fromEntries(FEATURES.map(f => [f.id, f.default]));

browser.storage.local.get(defaults).then(flags => {
  for (const f of FEATURES) {
    const label = document.createElement('label');
    const box = Object.assign(document.createElement('input'), { type: 'checkbox', checked: flags[f.id] });
    box.addEventListener('change', () => browser.storage.local.set({ [f.id]: box.checked }));
    label.append(box, f.label);
    list.append(label);
  }
});
