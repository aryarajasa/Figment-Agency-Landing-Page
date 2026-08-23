export default {
  async fetch(request, env) {
    // Serve static assets (index.html, styles.css, main.js, images)
    return env.ASSETS.fetch(request);
  }
};
