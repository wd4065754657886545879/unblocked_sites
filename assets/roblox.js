const https = require('https');

module.exports = (req, res) => {
    // Proxy Roblox website
    const options = {
        hostname: 'www.roblox.com',
        path: req.url, // The URL path from the client’s request
        method: req.method,
        headers: req.headers, // Forward the request headers
    };

    const proxy = https.request(options, (proxyRes) => {
        // Set the response headers to match the proxied response
        res.writeHead(proxyRes.statusCode, proxyRes.headers);

        // Pipe the proxied response data to the client
        proxyRes.pipe(res);
    });

    // Handle any errors with the proxy request
    proxy.on('error', (err) => {
        res.status(500).send(`Proxy error: ${err.message}`);
    });

    // Pipe the client’s request data to the proxy
    req.pipe(proxy);
};
