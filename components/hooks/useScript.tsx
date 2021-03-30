// original src: https://usehooks.com/useScript/

import { useState, useEffect } from 'react';

const cachedScripts = [];

function useScript(src, options) {
  const { isEnabled = true, async = false } = options || {};

  // Keeping track of script loaded and error state
  const [state, setState] = useState({
    loaded: !isEnabled,
    error: false,
  });

  useEffect(() => {
    if (isEnabled) {
      // Script event listener callbacks for load and error
      const onScriptLoad = () => {
        setState({
          loaded: true,
          error: false,
        });
      };

      // If cachedScripts array already includes src that means another instance
      // of this hook already loaded this script, so no need to load again.
      if (cachedScripts.includes(src)) {
        onScriptLoad();
        return () => {};
      }

      cachedScripts.push(src);

      // Create script
      const script = document.createElement('script');
      script.src = src;
      script.async = async;

      const onScriptError = () => {
        // Remove from cachedScripts we can try loading again
        const index = cachedScripts.indexOf(src);
        if (index >= 0) cachedScripts.splice(index, 1);
        script.remove();
        setState({
          loaded: true,
          error: true,
        });
      };

      script.addEventListener('load', onScriptLoad);
      script.addEventListener('error', onScriptError);

      // Add script to document body
      document.body.appendChild(script);

      // Remove event listeners on cleanup
      return () => {
        script.removeEventListener('load', onScriptLoad);
        script.removeEventListener('error', onScriptError);
      };
    }

    return () => {};
  }, [src]);

  return [state.loaded, state.error];
}

export default useScript;
