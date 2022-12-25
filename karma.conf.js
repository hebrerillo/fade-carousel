module.exports = function(config) {
    config.set({
        frameworks: ['jasmine'],
        files: [
            'script/ffcarousel.js',
            'test/*.js',
            'test/spec/*.js'
        ],
        reporters: ['dots'],
        plugins: ['karma-jasmine', 'karma-chrome-launcher'],
        color: true,
        browsers: ['ChromeHeadless'],
        singleRun: true
    });
};