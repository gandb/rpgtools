
import { strict } from "assert";
import { json } from "express";
import { parseIsolatedEntityName } from "typescript";
import * as random from "./src/random";

const args:Array<string> = process.argv;
const START_USER_PARAMETER:number  = 2;
 
 

const pos:Array<string> = ["es","y","a","ed","ip","o","un","ith","an","is"];


 
export interface SetName{
  name:string,
  key:string,
  words:Array<string>,
  singleWords:Array<string>,//words that work alone
  pos:Array<string>,
  bigChance:number //% de ser uma palavra grande

}

const comonWords : Array<string> = ["Ts","Ok","M","Cz","V","N","P","Qu","X","T","R","S","C","D","K","L"];
const commonSingleWords : Array<string> =["Ast","Tasarak","Simural","Krinaw","O","A","Reaukn","Let","Oria","Shiet","Ser","Hulas","Honos","Kal","Kar","Toban","Arb","Yur","Ig","Ivan","Dimit","Andr","Hig","Iv","Yg","Yur","Ivan","Ives","Nik","Pav","Serg","Yul","Mik","Dim","Nic","Oks","Yer","Fran","Rur","Krig","Yeg","Yur","Yv"];

const arcan:SetName = {
  name:"Arcan Words",
  key:"AR",
  words:   comonWords,
  singleWords:  commonSingleWords,
  pos: ["es","y","a","ed","ip","o","un","ith","an","is","us","alf","i"],
  bigChance:20
};


const elven:SetName = {
  name:"Elven Words",
  key:"EV",
  words:  comonWords,
  singleWords:  commonSingleWords,
  pos: ["osa","esa","elya","ena","uni","om","ane","e"],
  bigChance:20
};


const dwarf:SetName = {
  name:"Dwarf Words",
  key:"DW",
  words:  comonWords,
  singleWords: commonSingleWords,
  pos: ["eva","ova","isk","ev","ov"],
  bigChance:40
};



const all:Array<SetName> = [arcan,dwarf,elven];

export function printOrigens():void
{
    console.error("As origens aceitas são:");
    for(let index = 0 ; index < all.length ; index++)
    {
      console.error(all[index].key + " : " + all[index].name );  
    }
    
}


export function isValidOrigin(origin:string):boolean
{
  const ret:boolean =  all.find((set,index,arr)=>{return set.key==origin.toUpperCase()})!=null;  
  return ret;
}

export function getSetName(origin:string):SetName
{
  const set:SetName =  all.find((set,index,arr)=>{return set.key==origin.toUpperCase()});

  if(set==null)
  {
    throw new Error("Set name not implemented!");
  }
  
  return set;
}

export function buildWord(origem:SetName):string
{
  const hasSingle:boolean = random.int(2)==0;
  

  let word = "";

  const isBigWord:boolean = random.int(100)<origem.bigChance;

  if(hasSingle)
  {    
    const hasPos:boolean = random.int(2)==0;
    word =  origem.singleWords[random.indexArray(origem.singleWords)];
    if(hasPos)
    {
      const pos:string = origem.pos[random.indexArray(origem.pos)];
      word+=pos;
    }
  }
  else{
    word =  origem.words[random.indexArray(origem.words)];
    const pos:string = origem.pos[random.indexArray(origem.pos)];
    word+=pos;
  }

  if(isBigWord)
  {
    word += buildWord(origem).toLocaleLowerCase();
  }

  
  return word ;
}

export function buildPhrase(origem:SetName,quantity:number) :string
{
  let phrase:string = "";

  
  for(let index:number=0;index<quantity;index++)
  {
    
    if(phrase!="")
    {
      phrase+=" ";
    }

    phrase+=buildWord(origem);
  }

  
  return phrase;
}

 
function init()
{ 
   console.log("spellWords V1.0.0");
   
   let length:number = 3;
   
   
  if(args.length < ( START_USER_PARAMETER + 2 ))
  {
    console.error(`Para gerar uma frase precisa dois parâmetros:`);
    console.error(`buildName <ORIGEM eg:AR> <quantity> [printData] `);
    printOrigens();
    return;
  }

  
  if(!isValidOrigin(args[START_USER_PARAMETER] as any) )
  {
    console.error(`Origem inválida:`);
    console.error(`buildName <ORIGEM eg:AR> <quantity> [printData] `);
    printOrigens();
    return;
  }



  const origem:SetName = getSetName(args[START_USER_PARAMETER]);
  length = parseInt(args[START_USER_PARAMETER + 1] ,10) ;  
  
  console.log(buildPhrase(origem,length)); 
    
   
}

init();