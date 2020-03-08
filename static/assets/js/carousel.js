function switchTab(e) {
  e.preventDefault();
  const tab = window.location.hash.substring(1);

  // Unselect currently selected item.
  try {
    document
      .querySelector('.carousel-entry.on').classList.remove('on');
  } catch(e) {
    // pass
  }

  // Select the new item.
  document
    .querySelector(`.carousel-entry.${tab}`)
    .classList.add('on');

  // In case of back button, in some edge cases, scroll the element into view.
  document.querySelector('.carousel').scrollTo(
    document.querySelector(`.carousel-item.${tab}`).offsetLeft, 0);
  document.body.scrollTo(0, 0);
}

function load() {
  // Add a listener for the location changing if window width supports it.
  if (window.innerWidth >= 960) {
    window.addEventListener('popstate', switchTab);
  } else {
    window.removeEventListener('popstate', switchTab);
  }
}

// If we enter the page with no hash, select home.
if (!window.location.hash) {
  history.pushState({}, '', '#home');
}

// If we enter the page with a hash, select the current item.
switchTab({preventDefault: () => {}});
load();
window.addEventListener('resize', load);
