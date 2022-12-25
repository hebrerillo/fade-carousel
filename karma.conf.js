module.exports = function(config) {
    config.set({
        frameworks: ['jasmine'],
        preprocessors: {
            'src/fcarousel.js' : ['coverage']
        },
        files: [
            'src/fcarousel.js',
            'test/*.js',
            'test/spec/*.js'
        ],
        reporters: ['dots', 'coverage'],
        plugins: [
            'karma-jasmine',
            'karma-chrome-launcher',
            'karma-coverage'],
        color: true,
        browsers: ['ChromeHeadless'],
        singleRun: true,
        coverageReporter: {
            dir: 'test/coverage/',
            reporters: [
                { type:'html', subdir: 'html' }]
        }
    });
};