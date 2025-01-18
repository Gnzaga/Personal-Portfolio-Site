async function checkAndLoadModel() {
  const lastLoadTime = sessionStorage.getItem('lastLoadTime');
  const currentTime = new Date().getTime();
  const twentyMinutes = 20 * 60 * 1000;

  if (!lastLoadTime || currentTime - lastLoadTime > twentyMinutes) {
    try {
      const response = await fetch('/load-model', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        sessionStorage.setItem('lastLoadTime', currentTime);
        console.log('Model pre-loaded successfully');
      } else {
        console.error('Failed to pre-load model');
      }
    } catch (error) {
      console.error('Error while pre-loading model:', error);
    }
  } else {
    console.log('Model was pre-loaded less than 20 minutes ago');
  }
}