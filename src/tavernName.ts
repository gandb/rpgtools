"use strict";

import { strict } from "assert";
import { json } from "express";
import { parseIsolatedEntityName } from "typescript";
import * as random from "./random";

const args:Array<string> = process.argv;
const START_USER_PARAMETER:number  = 2;

 
export interface SetName{
  name:string,
  key:string,
  male:Array<string>,
  female:Array<string>,
  neutralGender:Array<string>,
  flexGenderQuality:Array<string>,
  quality:Array<string>,
}


export interface Entity{
  name:string,
  isFemale:boolean
}


const charactersName : SetName = {
  name : "Characters Names",
  key:"CH",
  male :["Dragão","Rinoceronte","Rouxinol","Demônio","Réptil","Jogador","Violinista","Explorador","Rei","Nômade","Diabo","Cronista","Troll","Arcanista","Padre","Cafageste","Conquistador","Vidente","Saqueador","Cultista","Sapo","Criador","Duelista","Marido","Bufão","Campeão","Vizir","Jacaré","Defensor","Rei-Bruxo","Basilisco","Elefante","Vigia","Mercador","Cogumelo","Pombo","Herege","Juiz","Gambá","Tigre","Furão","Sacerdote","Sonhador","Ladrão","Naufrag","Pirata","Vingador","Feiticeiro","Vampiro","Trabalhador","Druida","Lobisomem","Hierofante","Aldeão","Pernilongo","Grilo","Gafanhoto","Leão","Gorila","Principe"],
  female : ["Salamandra","Valkyria","Serpente","Medusa","Fênix","Arara","Tartaruga","Rã","Princesa","Mosca","Barata","Mula","Centopeia","Lince","Cobra","Jogadora","Exploradora","Nômade","Rainha","Arcanista","Cafageste","Conquistadora","Vidente","Saqueador","Cultista","Criadora","Esposa","Campeã","Defensora","Rainha-Bruxa","Vigia","Mercadora","Herege","Juiza","Sacerdote","Sonhadora","Vingadora","Feiticeira","Vampira","Trabalhadora","Ladra","Druida","Aldeã","Leoa","Gorila"],
  neutralGender: ["Brux","Andarilh","Brux","Assassin","Bard","Bárbar","Escrav","Peregrin","Metamorf","Defunt","Coelh","Pássar","Cachorr","Campeão","Rat","Gat","Sábi","Mag","Macac","Naufrag","Templári","Cavaleir","Pat","Porc","Prisioneir","Guerreir","Conselheir","Bisp"],
  flexGenderQuality : ["Etern","Perdid","Sombri","Dourad","Zangad","Divin","Subterrâne","Oníric","Batráqui","Esquecid","Preguiços","Sonolent","Pratead","Sangrent","Lendári","Ingrat","Profan","Condenad","Imens","Melanólic","Secret","Ocult","Calad","Mentiros","Ungid","Enfeitiçad","Audacios","Silencios","Estranh","Antipátic","Patétic","Titânic","Desconhecid","Misterios","Dracônic","Impiedos","Sádic","Morto-viv","Gulos","Metálic","Maculad","Malandr","Medonh","Enigmátic","Desuman","Belicos","Burr","Atent","Bizarr","Invertid","Afortunad","Azarad","Moribund","Libertinos","Vagaros","Orgulhos","Dorminhoc","Zarolh","Maquiavélic","Simpátic","Famint","Asqueros"],
  quality : ["Imortal","Egoísta","Mortal","Selvagem","Das Trevas","Do Caos","Da Ordem","Insaciável","Escarlate","Flutuante","Das Estrelas","Terrível","Rastejante","Paciente","Inimaginável","Inefável","Cruel","Canibal","Extraplanar","Sem Cor","De Cristal","Feliz","Eloquente","Vigarista","Dócil","Altruista","Celeste","Implacável","Iridescente","Invisível","Sufocante","Do Destino","Pedante","Tímido","Ancião","Ancestral","Incorpóreo"] 
}; 


const objectName : SetName = {
  name : "Object Names",
  key:"OB",
  male :["Cálice","Elmo","Baú","Caneco","Gerador","Globo","Relicário","Martelo","Escudo","Cajado","Broche","Anel","Chifre","Tomo","Livro","Grimório","Coração","Olho","Pilar","Arco","Sino","Colar","Crânio","Machado","Vaso","Elixir","Fruto","Lótus","Amuleto","Pergaminho","Mapa","Cadeado","Ídolo","Trono","Cetro","Manto","Corselete","Brinco","Incensário","Ovo","Pernil","Pão","Vinho","Dado","Queijo","Chá","Bolo","Prato","Escaravelho","Garfo","Forno","Espelho","Caldeirão"],
  female : ["Moeda","Espada","Orbe","Coroa","Joia","Gema","Forja","Urna","Capa","Lanterna","Sandália","Braçadeira","Tiara","Luva","Manopla","Bota","Lira","Harpa","Trombeta","Carta","Estátua","Fonte","Árvore","Arca","Garra","Presa","Lança","Luneta","Rosa","Flor","Tocha","Runas","Chave","Estatueta","Garrafa","Taça","Cerveja","Lâmpada","Vela","Lareira","Salsicha","Bússola","Xícara","Moeda","Máscara","Panela","Faca","Adaga"],
  neutralGender: [],
  flexGenderQuality : ["Etern","Perdid","Sombri","Dourad","Divin","Delicios","Fedorent","Suj","Pegajos","Esquecid","Proibid","Assad","Pratead","Sangrent","Lendári","Profan","Viv","Abençoad","Imens","Mecânic","Secret","Ocult","Cósmic","Suculent","Últim","Enfeitiçad","Temperad","Apimentad","Silencios","Estranh","Prismátic","Titânic","Desconhecid","Misterios","Dracônic","Salgad","Quebrad","Frit","Apetitos","Gélid","Metálic","Enferrujad","Maculado","Medonh","Enigmátic","Enevoad","Escuro","Clar","Bizarr","Invertid","Afortunad","Azarad","Restaurad","Partid","Pesad","Obsidian","Mofad","Tort","Antig","Encravad","Incorpóre","Asqueros"
],
  quality : ["Brilhante","Esmeralda","Delirante","Dos Sonhos","Das Trevas","Do Caos","Da Ordem","Irreal","Imóvel","Escarlate","Flutuante","Das Estrelas","Terrível","De Outro Mundo","Inimaginável","Inefável","Doce","Enebriante","Incolor","Dançante","De Cristal","Flamejante","Milenar","Das Profundezas","Abissal","Celeste","Implacável","Familiar","Iridescente","Invisível","Ardente","Sufocante","Do Destino","Pulsante","Reluzente","Crepitante","Ancestral","Borbulhante"]
}; 

//https://www.dicionariodenomesproprios.com.br/nomes-russos/

  
  

export function isValidPrint( print:string)
{
  return print && print.toLocaleLowerCase()=="printdata";
}
  
 

function orderArray(array:Array<string>):Array<string>
{
  const set:Set<string> = new Set<string>();
  array = array.sort( (a,b)=>{  return a.localeCompare(b); }).filter((value,index,array)=>{
    if(set.has(value))
    {
      return false;
    }
    set.add(value);
    return true;
  });

  array = Array.from(set);

  return array;
   
}

function orderSetName( choosedSetName:SetName):SetName
{
    choosedSetName.female =orderArray(choosedSetName.female);
    choosedSetName.male =orderArray(choosedSetName.male);
    choosedSetName.neutralGender =orderArray(choosedSetName.neutralGender);
    choosedSetName.quality =orderArray(choosedSetName.quality);
    choosedSetName.flexGenderQuality =orderArray(choosedSetName.flexGenderQuality);
    
    return choosedSetName;   
    
}

function pretty(json,singlineArray:boolean) {
  if (typeof json != 'string') {
       json = JSON.stringify(json, undefined, 2);
  }
  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  json = json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {   
      return   match ;
  });
  if(singlineArray)
  {
    json = json.replace(/\[(.*?)\]/gs, (match)=>{
      const test:string = match.toString();
      return test.replace(/\n\s*/gs,"");
    })
}
  return json;
}




export function print()
{
    
    const charset = orderSetName(charactersName);
    const objectset = orderSetName(objectName); 

    const allConfig = {charset, objectset};

    const singlineArray:boolean = args[START_USER_PARAMETER+1] && args[START_USER_PARAMETER+1].toLocaleLowerCase()=="oneline";

    console.log("firstName=>",pretty(allConfig,singlineArray));
}

function buildObject():Entity{
      //character quality
      let name:string = "";
      let isFemale:boolean = false;
      const typeGender = random.int(1) ;
      
      
      switch(typeGender)
      {
        case 0:
          {              
            const index:number = random.indexArray(objectName.male);
            name += "O " + objectName.male[index];
            break;
          }
        case 1:
            {              
              const index:number = random.indexArray(objectName.female);
              name += "A " + objectName.female[index];
              isFemale=true;
              break;
            } 
      } 
  
      return {name,isFemale};
}


function buildCharacter():Entity{
  
  //character quality
  
  
  
  let name:string = "";
  let isFemale:boolean = false;
   
  
     const genderType = random.int(2) ;
     switch(genderType)
     {   
       case 0:
         {              
           const indexCharName:number = random.indexArray(charactersName.male);
           name += "O " + charactersName.male[indexCharName];
           break;
         }
       case 1:
           {              
             const indexCharName:number = random.indexArray(charactersName.female);
             name += "A " + charactersName.female[indexCharName];
             isFemale=true;
             break;
           }
       case 2:
       {
         const gender : number =  random.int(1) ;
         const indexCharName:number = random.indexArray(charactersName.neutralGender);
         if(gender==0)
         {
           name +="O " + charactersName.neutralGender[indexCharName] + "o";
         }
         else{
           name += "A " + charactersName.neutralGender[indexCharName] + "a";
           isFemale=true;
         }
         break;
       }
       }  
  
   return {name,isFemale};
 
 }
 



 function buildNameCharacterAndObject():string
 {
     return buildCharacter().name + " e "  + buildObject().name;
 }

 
function buildNameObjectAndCharacter():string
{
    return  buildObject().name + " e" + buildCharacter().name ;
}


function buildNameObjectObject():string
{
    return buildObject().name + " e " + buildObject().name;
}

function buildNameObjectQuality():string
{
   //character quality
  const typeGender = random.int(1) ;
  const genderQuality = random.int(1) ;
  
  const object:Entity = buildObject();
  let name:string = object.name;

 

  switch(genderQuality)
  {
    case 0:
      {    
        const index:number = random.indexArray(objectName.quality);
        name += " " + objectName.quality[index];
        break;
      }
    case 1:
    {
      const index:number = random.indexArray(objectName.flexGenderQuality);
      if(object.isFemale)
      {
        name += " " + objectName.flexGenderQuality[index] + "a";        
      }
      else
      {
        name += " " + objectName.flexGenderQuality[index] + "o";
      }
      
      break;
    }
  }
  return name;
}

function buildNameCharacterAndCharacter():string{
  
   
  return buildCharacter().name + " e " + buildCharacter().name;

}

function buildNameCharacterQuality():string
{
 //character quality
 const genderType = random.int(2) ;
 const genderQuality = random.int(1) ;
 let character:Entity =  buildCharacter();
 let name:string = character.name;
 
 
  switch(genderQuality)
  {
    case 0:
      {    
        const index:number = random.indexArray(charactersName.quality);
        name += " " + charactersName.quality[index];
        break;
      }
    case 1:
    {
      const index:number = random.indexArray(charactersName.flexGenderQuality);
      if(character.isFemale)
      {
        name += " " + charactersName.flexGenderQuality[index] + "a";        
      }
      else
      {
        name += " " + charactersName.flexGenderQuality[index] + "o";
      }
      
      break;
    }
  }
  return name;
}

export function printName()
{
  let quantity : number = 1 ;
  let count:number = 0;

  if(args[START_USER_PARAMETER]  && !isNaN(args[START_USER_PARAMETER] as any))
  {
    quantity = parseInt(args[START_USER_PARAMETER],10);
  }

  for(let index:number = 0 ; index < quantity ; index++)
  {
    const type : number = random.int(5);

    let name:string = "";


    switch(type)
    {
      case 0:
      {
       
        name = buildNameCharacterQuality();
        count++;
        break;       

      }
      case 1:
      {
        //object and object
        name = buildNameObjectObject();
        break;
      }
      case 2:
      {
        //character and character
        name = buildNameCharacterAndCharacter();
        break;
      }
      case 3:
      {
        //object and quality
        name = buildNameObjectQuality();
        break;
      }
      case 4:
      {
        //character and object
        name = buildNameCharacterAndObject();
        break;
      }
      case 5:
      {
        //object and character
        name = buildNameObjectAndCharacter();
        break;
      }
    }

    console.log(name);        
  } 
}

 
function init()
{ 
   
   
}

init();