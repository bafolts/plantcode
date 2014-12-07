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

