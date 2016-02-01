describe('The home page', function() {

  beforeEach(function(){
    browser.get('http://localhost:8080');
  });

  it('has a title', function() {
    expect(browser.getTitle()).toEqual('FantasticBoxCo');
  });
});

it('has a four input boxes for W,H,L and quantity', function() {

  var width = element(by.model('orderBoxesCtrl.width')).sendKeys('10');
  var height = element(by.model('orderBoxesCtrl.height')).sendKeys('10');
  var length = element(by.model('orderBoxesCtrl.length')).sendKeys('10');
  var quantity = element(by.model('orderBoxesCtrl.quantity')).sendKeys('2');
  element(by.className('close-step-1')).click();
});


it('can select grade value', function(){
  element(by.css('[value="A"]')).click();
  element(by.className('close-step-2')).click();
});

it('can select the print quality', function(){
  element(by.css('[value="2-color"]')).click();
  element(by.className('close-step-3')).click();
});

it('can select handles as a extra option', function(){
  element(by.css('[value="handles"]')).click();
  element(by.className('finish')).click();
});

it('has the total cost', function(){
  expect(element(by.id('dimensions')).getText()).toEqual('2 × (W)×10(H)×10(L)');
  expect(element(by.id('cardboard-grade')).getText()).toEqual('A');
  expect(element(by.id('quality')).getText()).toEqual('2-color');
  expect(element(by.id('options')).getText()).toEqual('handles');
  expect(element(by.id('partial-cost')).getText()).toEqual('£30.2');
});

describe('Size limitation for grade C', function() {

  beforeEach(function(){
    browser.get('http://localhost:8080');
  });

  it('has a four input boxes for W,H,L and quantity', function() {
    var width = element(by.model('orderBoxesCtrl.width')).sendKeys('10');
    var height = element(by.model('orderBoxesCtrl.height')).sendKeys('10');
    var length = element(by.model('orderBoxesCtrl.length')).sendKeys('10');
    var quantity = element(by.model('orderBoxesCtrl.quantity')).sendKeys('2');
    element(by.className('close-step-1')).click();
  });
});

it('can not select C grade with boxes bigger than 2M', function(){
  element(by.css('[value="C"]')).click();
  element(by.className('close-step-2')).click();
  expect(element(by.id('gradeCWarning')).getText()).toEqual('You can not select C grade with boxes bigger that 2M2 Please select an other grade');
});

describe('Extra options limitation', function() {

  beforeEach(function(){
    browser.get('http://localhost:8080');
  });

  it('has a four input boxes for W,H,L and quantity', function() {
    var width = element(by.model('orderBoxesCtrl.width')).sendKeys('1');
    var height = element(by.model('orderBoxesCtrl.height')).sendKeys('1');
    var length = element(by.model('orderBoxesCtrl.length')).sendKeys('1');
    var quantity = element(by.model('orderBoxesCtrl.quantity')).sendKeys('2');
    element(by.className('close-step-1')).click();
  });
});

it('can not select reinforced bottom with grade different than A', function(){
  element(by.css('[value="C"]')).click();
  element(by.className('close-step-2')).click();
  element(by.css('[value="2-color"]')).click();
  element(by.className('close-step-3')).click();
  element(by.css('[value="reinforced-bottom"]')).click();
  element(by.className('finish')).click();
  expect(element(by.id('reinforcedBottomWarning')).getText()).toEqual('You can not select Reinforced bottom with grade different than A. Please select an other grade.');
});

