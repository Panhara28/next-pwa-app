(function () {
  function getInitialColorMode() {
    const persistedColorPreference = window.localStorage.getItem('color-mode');
    const hasPersistedPreference = typeof persistedColorPreference === 'string';
    // If the user has explicitly chosen light or dark,
    // let's use it. Otherwise, this value will be null.
    if (hasPersistedPreference) {
      return persistedColorPreference;
    }
    // If they haven't been explicit, let's check the media
    // query
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const hasMediaQueryPreference = typeof mql.matches === 'boolean';
    if (hasMediaQueryPreference) {
      return mql.matches ? 'dark' : 'light';
    }
    
    // If they are using a browser/OS that doesn't support
    // color themes, let's default to 'light'.
    return 'light';
  }

  function setCSSVar(property, color) {
    document.documentElement.style.setProperty(property, color);
  }

  try {
    const colorMode = getInitialColorMode();
    let theme = {};
    
    if(colorMode === "dark") {
      theme = {
        '--color-text-primary': '#FDFEFE',
        '--color-text-secondary': '#d0d3d4',
        '--bg-color-navbar': '#000000',
        '--bg-color-navbar-category': '#292929',
        '--bg-color-container': '#393939',
        '--bg-color-placeholder-animation': 'linear-gradient(90deg, hsla(0, 0%, 100%, 0) 46%, var(--bg-color-container) 50%, hsla(0, 0%, 100%, 0) 54%) 50% 50%'
      };
    }

    for(let key in theme) {
      setCSSVar(key, theme[key]);
    }
  } catch (err) {
    console.log(new Error(err));
  }
})();