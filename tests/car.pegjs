
@startuml

hide empty members

' This is a comment line

abstract Car {
  + void setModel(String model)
  + void setMake(String make)
  + void setYear(Number)
  + String getModel()
  + String getMake()
  + Number getYear()
  - String model
  - String make
  - Number year
}

class NamesInThings {
  + String field
  + String1 field1
  - String _some_private
  - String_2 field_2
  + void member()
  - String1 member2()
  # void member3()
  - String2 member_s()
}
  
class Toyota
class Honda
class Ford
  
Toyota --|> Car
Honda --|> Car
Ford --|> Car

@enduml
