"use strict";

import * as random from "./src/random";

const args:Array<string> = process.argv;
const START_USER_PARAMETER:number  = 2; 

function init(args:Array<string>)
{   

    let faces:number = 6;
    let length:number = 1;
    let bonus:number = 0;

    if (isNaN(args[START_USER_PARAMETER] as any))
    {
        console.error(`O primeiro parâmetro [${args[START_USER_PARAMETER]}] precisa ser numérico`);
        console.error(`roll <quantidade> [<faces>[bônus]]`);
        return;
    }

    length = parseInt(args[START_USER_PARAMETER]);

    if (!isNaN(args[START_USER_PARAMETER+1] as any))
    {
        faces = parseInt(args[START_USER_PARAMETER+1]);

        if (!isNaN(args[START_USER_PARAMETER+2] as any))
        {
            bonus = parseInt(args[START_USER_PARAMETER+2]);
            
        }  
    }

    let total:number = 0 ;
    let results : string = "";

    for(let index:number =0;index<length;index++)
    {
        if(results!="")
        {
            results+=",";
        }
        let result:number  =  random.rool(faces);
        results = results + result;
        total += result;
    }

    total+=bonus;

    console.log(`O resultado da rolagem de ${length}d${faces}+${bonus} foi : {${results}}+${bonus} = ${total}`);
}

init(args);