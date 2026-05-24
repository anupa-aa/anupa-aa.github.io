document.addEventListener('click', function (e) {
  if (!e.target.closest('.theme-toggle')) return;
  var next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  try { localStorage.setItem('theme', next); } catch (e) {}
});
