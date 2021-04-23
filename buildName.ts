"use strict";

import { strict } from "assert";
import { json } from "express";
import * as buildName from "./src/buildName";

const args:Array<string> = process.argv;
const START_USER_PARAMETER:number  = 2;
 
   
function init(args:Array<string>)
{   
  

  let quantity:number = 1;

  if(args.length < 4)    
  {
    console.error(`Para gerar nome precisa dois parâmetros:`);
    console.error(`buildName <ORIGEM eg:BR> <GENERO eg:F> [printData] `);
    buildName.printOrigens();
    return;
  }

  
  if(!buildName.isValidOrigin(args[START_USER_PARAMETER]))    
  {
    console.error(`Orígem inválida:`);
    console.error(`buildName <ORIGEM eg:BR> <GENERO eg:F> `);
    buildName.printOrigens();
    return;
  }

  if(!buildName.isValidGender(args[START_USER_PARAMETER+1]))    
  {
    console.error(`Gênero inválido:`);
    console.error(`buildName <ORIGEM eg:BR> <GENERO eg:F> `);
    buildName.printGenders();
    return;
  }

  
  if(buildName.isValidPrint(args[START_USER_PARAMETER+2]))    
  {
    buildName.print(args);
    return;
  }

  
  if(buildName.isValidQuantity(args[START_USER_PARAMETER+2]))
  {
    quantity = parseInt(args[START_USER_PARAMETER+2],10);
  }


  const choosedSetName:buildName.SetName = buildName.getSetName(args[START_USER_PARAMETER]);
  const isFemale:boolean = (args[START_USER_PARAMETER+1].toUpperCase()=="F")?true:false;

  for(let index:number = 0  ; index < quantity ; index++)
  {
    console.log("The name is " + buildName.generateName(choosedSetName,isFemale));
  }
  
    
}

init(args);