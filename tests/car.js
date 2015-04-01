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


