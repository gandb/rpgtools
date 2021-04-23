"use strict";

import { strict } from "assert";
import { json } from "express";


const args:Array<string> = process.argv;
const START_USER_PARAMETER:number  = 2;

interface DateIarys{
    era:number;
    year:number;
    month:number;
    day:number;
    weekday:number;
}

 
 
//https://www.dicionariodenomesproprios.com.br/nomes-russos/

   

function splitDate( date:string):DateIarys
{
  
  const dateIarys:DateIarys = {era:3,year:0,month:1,day:1,weekday:1};
  const parts:Array<string>= date.split("-");
  if(isNaN(parts[0] as any)||isNaN(parts[1] as any) ||isNaN(parts[2] as any))
  {
    return null;
  }
  dateIarys.day = parseInt(parts[0],10);
  dateIarys.month = parseInt(parts[1],10);
  dateIarys.year = parseInt(parts[2],10);


  return dateIarys;
}

function isValidDate( date:string):boolean
{
 
  const dateIarys :DateIarys = splitDate(date);

  if(!dateIarys)
  {
    return false;
  }
  
  if(dateIarys.day<=0  || dateIarys.month<=0 || dateIarys.year<0)
  {
    return false;
  }

  if(dateIarys.day>35)
  {
    return false;
  }

  if(dateIarys.month==4 || dateIarys.month==6)
  {
    if(dateIarys.day>30)
    {
      return false;
    }
  }

  if(dateIarys.month>10)
  {
      return false;    
  }

  return true;
}

function friendlyWeekDayName(weekday:number)
{
  switch(weekday)
  {
    case 1:
      {
        return "Primeiro Dia";
      }
    case 2:
    {
      return "Segundo Dia";
    }
    case 3:
      {
        return "Terceiro Dia";
      }
    case 4:
    {
      return "Quarto Dia";
    }
    case 5:
    {
      return "Quinto Dia";
    }
    case 6:
      {
        return "Sexto  Dia";
      }
    case 7:
    {
      return "Sétimo Dia";
    }
  }
}

function printWeek(date:string)
{
  const dateIarys :DateIarys = splitDate(date);

  let daysFromStart:number =  (dateIarys.month-1) * 35 + dateIarys.day;

  if(dateIarys.month> 6)
  {
    daysFromStart -=5;
  }
  
  if(dateIarys.month> 4)
  {
    daysFromStart -=5;
  }
  
  daysFromStart += dateIarys.year * 340;

  //shift necessário pois o dia 1 da terceira era não foi o primeiro dia
  daysFromStart -=1;

  let week : number = daysFromStart % 7;
  week = ( week==0)?7:week;


  console.log("Week Day : " + friendlyWeekDayName(week));

}
  
 
function init(args:Array<string>)
{   


  if(args.length <= START_USER_PARAMETER)    
  {
    console.error(`Para calcular o dia da semana precisa da data:`);
    console.error(`calendar <DATE eg:dd-mm-yyyy] `);
    return;
  } 

  
  if(!isValidDate(args[START_USER_PARAMETER]))    
  {
    console.error(`Data inválida:`);
    console.error(`calendar <DATE eg:dd-mm-yyyy] `);
    return;
  }

  printWeek(args[START_USER_PARAMETER]);
 
 
    
}

init(args);