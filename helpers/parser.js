var format;

var invalidHeaders = ['scheme', 'x-real-ip', 'x-forwarded-for', 'connection',
    'server', 'x-frame-options', 'x-xss-protection', 'set-cookie', 'content-length',
    'etag', 'x-debug-token', 'x-powered-by'
]
format = function(pair) {
    var indent, newline, output, req, res,
        _this = this;
    output = "";
    indent = "    ";
    newline = "\n";
    req = pair['request'];
    res = pair['response'];
    output = "# " + req['method'] + " " + req['uri']['pathname'] + newline;
    output += "+ Request" + newline;
    output += indent + "+ Headers" + newline;
    output += newline;
    if (req.headers && req.headers.length) {
        Object.keys(req['headers']).forEach(function(key) {
            if (invalidHeaders.indexOf(key) == -1)
                return output += indent + indent + indent + key + ":" + req['headers'][key] + newline;
        });
        output += newline
    }
    if (req['uri']['query']) {
        output += indent + "+ Parameters" + newline;
        output += newline;
        req['uri']['query'].split('&').forEach(function(line) {
            return output += indent + indent + indent + line + newline;
        });
        output += newline;
    }
    if (req['body']) {
        output += indent + "+ Body" + newline;
        output += newline;
        req['body'].split('&').forEach(function(line) {
            return output += indent + indent + indent + line + newline;
        });
    }
    output += newline;
    output += "+ Response" + " " + res['statusCode'] + newline;
    output += indent + "+ Headers" + newline;
    output += newline;
    Object.keys(res['headers']).forEach(function(key) {
        if (invalidHeaders.indexOf(key) == -1)
            return output += indent + indent + indent + key + ":" + res['headers'][key] + newline;
    });
    output += newline;
    output += indent + "+ Body" + newline;
    output += newline;
    res['body'] = typeof res['body'] == 'object' ? JSON.stringify(res['body']) : res['body'];
    output += indent + indent + indent + res['body'] + newline;
    output += newline;
    return output;
};

module.exports.format = format;
