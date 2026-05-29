// Chart utilities for shared chart functionality
window.ChartUtils = class ChartUtils {
  static waitForChartJS(timeout = 5000) {
    return new Promise((resolve, reject) => {
      if (typeof Chart !== 'undefined') {
        resolve();
        return;
      }
      const start = Date.now();
      const interval = setInterval(() => {
        if (typeof Chart !== 'undefined') {
          clearInterval(interval);
          resolve();
        } else if (Date.now() - start >= timeout) {
          clearInterval(interval);
          reject(new Error('Chart.js failed to load'));
        }
      }, 100);
    });
  }
}