<?php
abstract class Car {
  private model;
  private make;
  private year;
  public function setModel($model) {
  }
  public function setMake($make) {
  }
  public function setYear($param0) {
  }
  public function getModel() {
      return null;
  }
  public function getMake() {
      return null;
  }
  public function getYear() {
      return null;
  }
}
?>

<?php
class NamesInThings {
  private field;
  private field1;
  private _some_private;
  private field_2;
  public function member() {
  }
  public function member2() {
      return null;
  }
  public function member3() {
  }
  public function member_s() {
      return null;
  }
}
?>

<?php
class Toyota extends Car {
}
?>

<?php
class Honda extends Car {
}
?>

<?php
class Ford extends Car {
}
?>

