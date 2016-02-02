describe('orderBoxesController', function() {
  beforeEach(module('orderBoxes'));

  var ctrl;
  var order;

  beforeEach(inject(function($controller) {
    ctrl = $controller('orderBoxesController');
    ctrl.order = [];
  }));

  it('initialize with an empty order array', function() {
    expect(angular.isFunction(ctrl.createBox)).toBe(true);
  });

  it('can add one type of boxe', function(){
    ctrl.createBox();
    expect(ctrl.order.length).toBe(1);
  });

  it('can add two type og boxes', function(){
    ctrl.createBox();
    ctrl.createBox();
    expect(ctrl.order.length).toBe(2);
  });
});
