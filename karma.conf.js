module.exports = function(config) {
    config.set({
        frameworks: ['jasmine-jquery', 'jasmine'],
        preprocessors: {
            'src/fcarousel.js' : ['coverage']
        },
        files: [
            'src/fcarousel.js',
            'node_modules/jquery/dist/jquery.min.js',
            'test/*.js',
            'test/spec/*.js',
            'test/spec/fixtures/*.html'
        ],
        reporters: ['dots', 'coverage'],
        plugins: [
            'karma-jasmine',
            'karma-chrome-launcher',
            'karma-coverage',
            'karma-jasmine-jquery'],
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