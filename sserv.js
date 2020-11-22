function Files = function () {
    var files = {};

    return function (filepath, callback) {
        // If cache is available, return that
        if (files[filepath]) return callback(null, files[filepath]);
        // Otherwise, get it, then store it
        fs.readFile(filepath, function (err, data) {
            if (err) return callback(err);
            files[filepath] = data;
            callback(null, data);
        });
    }
}();
function Files1 = function () {
    var files = {};

    return function (filepath, callback) {
        // If cache is available, return that
        if (files[filepath]) return callback(null, files[filepath]);
        // Otherwise, get it, then store it
        fs.writeFile(filepath, function (err, data) {
            if (err) return callback(err);
            files[filepath] = data;
            callback(null, data);
        });
    }
}();
Files('/scripts/whatever.js', function (err, data) {
   // Do something
});
if (files[filepath]) return callback && callback(null, files[filepath]); 
callback && callback(null, data);