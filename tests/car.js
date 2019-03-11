  function Car() {}
  Car.prototype.model = undefined;
  Car.prototype.make = undefined;
  Car.prototype.year = undefined;
  Car.prototype.setModel = function (model) {};
  Car.prototype.setMake = function (make) {};
  Car.prototype.setYear = function (param0) {};
  Car.prototype.getModel = function () {};
  Car.prototype.getMake = function () {};
  Car.prototype.getYear = function () {};




  function NamesInThings() {}
  NamesInThings.prototype.field = undefined;
  NamesInThings.prototype.field1 = undefined;
  NamesInThings.prototype._some_private = undefined;
  NamesInThings.prototype.field_2 = undefined;
  NamesInThings.prototype.member = function () {};
  NamesInThings.prototype.member2 = function () {};
  NamesInThings.prototype.member3 = function () {};
  NamesInThings.prototype.member_s = function () {};


  function Toyota() {
    Car.prototype.constructor.apply(this, arguments);
  }
  Toyota.prototype = Object.create(Car.prototype);
  Toyota.prototype.constructor = Toyota;


  function Honda() {
    Car.prototype.constructor.apply(this, arguments);
  }
  Honda.prototype = Object.create(Car.prototype);
  Honda.prototype.constructor = Honda;


  function Ford() {
    Car.prototype.constructor.apply(this, arguments);
  }
  Ford.prototype = Object.create(Car.prototype);
  Ford.prototype.constructor = Ford;


  function Hyundai() {
    Car.prototype.constructor.apply(this, arguments);
  }
  Hyundai.prototype = Object.create(Car.prototype);
  Hyundai.prototype.constructor = Hyundai;


