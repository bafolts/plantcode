
@startuml

hide empty members

abstract Car {
  + String getModel()
  + String getMake()
  + Number getYear()
}
  
class Toyota
class Honda
class Ford
  
Toyota --|> Car
Honda --|> Car
Ford --|> Car

@enduml
