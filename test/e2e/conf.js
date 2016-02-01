exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['orderBoxesFeature.js'],
  capabilities: {
    browserName: 'chrome'
  }
};
