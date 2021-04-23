"use strict";

import { strict } from "assert";
import { json } from "express";
import { parseIsolatedEntityName } from "typescript";
import * as tavernName from "./src/tavernName";

const args:Array<string> = process.argv;
const START_USER_PARAMETER:number  = 2;

  

 
function init()
{ 
  if(args[START_USER_PARAMETER] && args[START_USER_PARAMETER].toLocaleLowerCase()=="print")
  {
    tavernName.print();
    return;
  } 

  if(args[START_USER_PARAMETER] && args[START_USER_PARAMETER].toLocaleLowerCase()=="help")
  {
    console.log("taverName [print [ondeLine] | help| version]");
    return;
  } 
  
  if(args[START_USER_PARAMETER] && args[START_USER_PARAMETER].toLocaleLowerCase()=="version")
  {
    console.log("TavernName v1.0.1");
    return;
  }

  tavernName.printName();
  
   
}

init();