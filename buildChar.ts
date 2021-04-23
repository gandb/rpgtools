"use strict";

import { strict } from "assert";
import { json } from "express";
import * as buildName from "./src/buildName";
import { chownSync } from "fs";

const args:Array<string> = process.argv;
const START_USER_PARAMETER:number  = 2; 
 
function init(args:Array<string>)
{   

  console.log("BuildChar v1.0.0");

  if(args.length < (START_USER_PARAMETER+2))    
  {
    console.error(`Para gerar um personagem precisa dois parâmetros:`);
    console.error(`buldChar <ORIGEM eg:BR> <GENERO eg:F> [printData] `);
    buildName.printOrigens();
    return;
  }

  
  if(!buildName.isValidOrigin(args[START_USER_PARAMETER]))    
  {
    console.error(`Orígem inválida:`);
    console.error(`buldChar <ORIGEM eg:BR> <GENERO eg:F> `);
    buildName.printOrigens();
    return;
  }

  if(!buildName.isValidGender(args[START_USER_PARAMETER+1]))    
  {
    console.error(`Gênero inválido:`);
    console.error(`buldChar <ORIGEM eg:BR> <GENERO eg:F> `);
    buildName.printGenders();
    return;
  }
 
  const choosedSetName:buildName.SetName = buildName.getSetName(args[START_USER_PARAMETER]);
  const isFemale:boolean = (args[START_USER_PARAMETER+1].toUpperCase()=="F")?true:false;
 
  const name:string = buildName.generateName(choosedSetName,isFemale);

  const habilities:string = `"Str":2,"Dex":1,"Con":1,"Wis":0,"Car":-1;`;

  console.log("Name:" + name);
  console.log("Race:" + choosedSetName.race);
  console.log("Habilities:" + habilities);
    
}

init(args);