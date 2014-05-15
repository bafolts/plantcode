plantuml-code-generator
=======================

Provides a utility to generate code in various languages given a plantuml class diagram.

PEG.js
--------------------
The most recent version of PlantUML does not have a defined grammar to use with
parsing the PlantUML code. Below is my guess as to what the grammer for
the language should be, relative to the PEG.js parser. This creates
a parser which is then used in the creation of all output files.

Goals
-------------------
Initially this project will only run with node.js and output javascript classes
but the general idea is that given any PlantUML file we will be able
to generate class files in any output language.
