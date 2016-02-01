angular.module('orderBoxes').controller('orderBoxesController', [function() {


  this.step1 = false;
  this.step2 = false;
  this.step3 = false;
  this.step4 = false;
  this.tot = false;
  this.selectedGradeC = false;
  this.selectedReinforcedBottom = false;

  this.order = [];

  this.createBox = function(){

    this.boxObj = {

      width: this.width,
      height: this.height,
      length: this.length,
      quantity: this.quantity,
      grade: this.grade,
      quality: this.printQuality,
      options: this.optionExtra,

    };

    this.boxObj.m2 = this.width * this.height;
    this.boxObj.gradeCost = (this.findGradeRateCost() * this.boxObj.m2);
    this.boxObj.printCost = (this.findPrintRateCost() * this.boxObj.m2);
    this.boxObj.extraCost = (this.findExtraCost() * this.quantity);
    this.boxObj.totCost = (this.boxObj.gradeCost + this.boxObj.printCost + this.boxObj.extraCost);
    this.order.push(this.boxObj);

  };

  this.emptyBox = function(){

    this.width = '',
    this.height = '',
    this.length = '',
    this.quantity = '',
    this.grade = '',
    this.printQuality = '',
    this.optionExtra = ''

  };

  this.findGradeRateCost = function(){

    this.gradeCostSchema = {
      'A': 0.20,
      'B': 0.10,
      'C': 0.05
    };

    this.gradeRate = this.gradeCostSchema[this.grade];
    return this.gradeRate;
  };

  this.findPrintRateCost = function(){

    this.printCostSchema = {
      '3-color': 0.20,
      '2-color': 0.10,
      'black-only': 0.05,
      'no-printing': 0.00,
      'FantasticBoxCo-branding': -0.05
    };

    this.printRate = this.printCostSchema[this.printQuality];
    return this.printRate;
  };

  this.checkBoxesLargerThanTwoM = function(){

    if ((this.width * this.length) > 2 && this.grade == 'C') {
      this.selectedGradeC = true;
    } else {
      this.step2 = !this.step2;
      this.step3 = !this.step3;
      this.selectedGradeC = false;
    }
  };

  this.completeOrder = function(){

    if ((this.grade != 'A') && (this.optionExtra == 'reinforced-bottom')) {
      this.selectedReinforcedBottom = true;
    } else {
      this.addBox();
      this.selectedReinforcedBottom = false;
      this.showTot();
    }
  };

  this.sum = function(){

    var total = 0;
    for(var i = 0; i < this.order.length; i++) {
      total = total + this.order[i].totCost;
    }
    return total;

  };

  this.addBox = function(){

    if ((this.grade != 'A') && (this.optionExtra == 'reinforced-bottom')) {
      this.selectedReinforcedBottom = true;
    } else {
      this.createBox();
      this.selectedReinforcedBottom = false;
      this.emptyBox();
      this.toTheTop();
    }
  };

  this.findExtraCost = function(){

    this.extraCostSchema = {
      'reinforced-bottom': 0.05,
      'handles': 0.10
    };
    this.extraCost = this.extraCostSchema[this.optionExtra];
    return this.extraCost;
  };

  this.toTheTop = function(){
    this.step4 = !this.step4;
    this.step1 = !this.step1;

  };

  this.showStep2 = function(){
    this.step2 = !this.step2;
    this.step1 = !this.step1;
  };

  this.backToStep1 = function(){
    this.step2 = !this.step2;
    this.step1 = !this.step1;
    this.selectedGradeC = false;
  };

  this.showStep3 = function(){
    this.checkBoxesLargerThanTwoM();
  };

  this.backToStep2 = function(){
    this.step3 = !this.step3;
    this.step2 = !this.step2;
  };

  this.showStep4 = function(){
    this.step4 = !this.step4;
    this.step3 = !this.step3;
  };

  this.backToStep3 = function(){
    this.step4 = !this.step4;
    this.step3 = !this.step3;
    this.selectedReinforcedBottom = false;
  };

  this.showTot = function(){
    this.tot = !this.tot;
    this.step1 = !this.step1;
  };

}]);

