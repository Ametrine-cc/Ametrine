export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Handle the /api/check endpoint
    if (url.pathname === '/api/check') {
      // Handle CORS preflight
      if (request.method === 'OPTIONS') {
        return new Response(null, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
        });
      }
      
      const unlock = new Date('2025-12-13T00:00:00Z');
      const now = new Date();
      const isLocked = now < unlock;
      
      return new Response(JSON.stringify({
        isLocked: isLocked,
        currentTime: now.toISOString(),
        unlockTime: unlock.toISOString(),
        remainingMs: isLocked ? unlock - now : 0
      }), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'no-cache, no-store, must-revalidate'
        },
      });
    }
    
    // For all other requests, proxy to GitHub Pages
    const githubPagesUrl = 'https://ametrine.cc' + url.pathname + url.search;
    return fetch(githubPagesUrl);
  },
};