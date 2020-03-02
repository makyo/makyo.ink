function switchTab(e) {
  e.preventDefault();

  // Unselect currently selected item.
  document
    .querySelector('.carousel-entry.on').classList.remove('on');

  // Select the new item.
  document
    .querySelector(`.carousel-entry.${window.location.hash.substring(1)}`)
    .classList.add('on');

  // In case of back button, in some edge cases, scroll the element into view.
  document.body.scrollTo(0, 0);
  document.querySelector('.carousel').scrollTo(
    document.querySelector(window.location.hash).offsetLeft, 0);
}

function load() {
  if (window.innerWidth >= 960) {
    // Add a listener for the location changing if window width supports it.
    window.addEventListener('popstate', switchTab);
  } else {
    window.removeEventListener('popstate', switchTab);
  }
}

// If we enter the page with a hash, select the current item.
window.addEventListener('load', () => {
  document.querySelector(`.carousel-entry.${window.location.hash.substring(1)}`)
    .classList.add('on');
  document.body.scrollTo(0, 0);
  load();
});
window.addEventListener('resize', load);

// If we enter the page with no hash, select home.
if (!window.location.hash) {
  history.pushState({}, '', '#home');
}
