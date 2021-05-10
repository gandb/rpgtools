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

const months: Array<string> = ["Luquino","Anise","Gabrilho","Helenise","1oInterlúdio","Rafaelino","Catarise","Zortano","Livise","2oInterlúdio"];

 
//https://www.dicionariodenomesproprios.com.br/nomes-russos/

function monthStrToMonthInt(month:string)
{
  

  if(!isNaN(month as any))
  {
    return parseInt(month,10);
  }

  for( let index : number  = 0 ; index <  months.length ; index ++)
  {
     if(months[index].toLowerCase()===month.toLowerCase())
     {
       return index+1;
     }
  }

  return null;
}
   
function printMonths()
{
  let ret:string = "";

  for( let index : number = 0  ; index <  months.length ; index ++)
  {
    if(ret!=="")
    {
        ret+=" | ";
    }
     ret += months[index];
  }

  return ret;
}

function splitDate( date:string):DateIarys
{
  
  const dateIarys:DateIarys = {era:3,year:0,month:1,day:1,weekday:1};
  const parts:Array<string>= date.split("-");


  if(isNaN(parts[0] as any) ||isNaN(parts[2] as any))
  {
    return null;
  }
  
  dateIarys.day = parseInt(parts[0],10);

  dateIarys.month  = monthStrToMonthInt(parts[1]);
  if(!dateIarys.month)
  {
    return null;
  }

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

function printSeason(date:string)
{
  const dateIarys :DateIarys = splitDate(date);

  let days:number =  daysFromStart(date,false);

  
  if(days <= 35)
  {
    console.log("Estação  : Verão " + Math.floor(((days+35)/70)*100) + "%");
  }
  else if(days <= 105)
  {
    console.log("Estação  : Outono " + Math.floor(((days-35)/70)*100) + "%");
  }
  else if(days <= 135)
  {
    console.log("Estação  : Inverno " + Math.floor(((days-105)/70)*100) + "%");
  }
  else if(days <= 170)
  {
    console.log("Estação  : Breu " + Math.floor(((days-135)/35)*100) + "%");
  }
  else if(days <= 200)
  {
    console.log("Estação  : Inverno " + Math.floor(((days-135)/70)*100) + "%");
  }
  else if(days <= 270)
  {
    console.log("Estação  : Primavera " + Math.floor(((days-200)/70)*100) + "%");
  }
  else if(days <= 305)
  {
    console.log("Estação  : Verão " + Math.floor(((days-270)/70)*100) + "%");
  }
  else
  {
    console.log("Estação  : Lume " + Math.floor(((days-305)/35)*100) + "%");
  }
}

function daysFromStart(date:string,usingYear:boolean):number
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

  if(usingYear)
  {
    daysFromStart += dateIarys.year * 340;
  }  

  return daysFromStart;
}


function printWeek(date:string)
{
  const dateIarys :DateIarys = splitDate(date);

  let days:number = daysFromStart(date,true);   

  //shift necessário pois o dia 1 da terceira era não foi o primeiro dia
  days -=1;

  let week : number = days % 7;
  week = ( week==0)?7:week;


  console.log("Dia da Semana : " + friendlyWeekDayName(week));

}


function printLight(date:string)
{
   
  const dateIarys :DateIarys = splitDate(date);

  let days:number = daysFromStart(date,false);
  
  let weeksFromStart:number = Math.round(days/7);
  let hours: number = 22;

  hours = hours - weeksFromStart;

  if(hours < 0 )
  {
    hours = hours * -1;
    hours--;

    if (hours>23)
    {
      hours = 23;
    }
  }

  let  startHour:string = "";
  let  endHour:string = "";

  if(hours%2==0)
  {
    startHour = (12- (hours/2)) + " horas";
    endHour = (12 + (hours/2)) + " horas";
  }
  else 
  {
    startHour = (12- 1 - Math.floor(hours/2)) + ":30 ";
    endHour = (12 + Math.floor(hours/2)) + " :30";
  }

  
  console.log("A quantidade de luz neste dia é de  : " + hours + " horas");
  if(hours!=0)
  {
    console.log("O sol nasce às " + startHour + " e se põe às " + endHour );
  }
  else{
    console.log("O sol não nasce nesse dia.");
  }

}

function helpSeason()
{
  console.error(`calendar -e <DATE>`);    
  console.error(`<DATE> := <DATE NUMERIC> | <DATE ALPHANUMERIC> `);
  console.error(`<DATE NUMERIC> :=  dd-mm-yyyy ` );
  console.error(`<DATE ALPHANUMERIC> := dd-<MONTH NAME>-yyyy` );    
  console.error(`<MONTH NAME> := ${printMonths()}` ); 
}

function helpWeek()
{
  console.error(`calendar -s <DATE>`);    
  console.error(`<DATE> := <DATE NUMERIC> | <DATE ALPHANUMERIC> `);
  console.error(`<DATE NUMERIC> :=  dd-mm-yyyy ` );
  console.error(`<DATE ALPHANUMERIC> := dd-<MONTH NAME>-yyyy` );    
  console.error(`<MONTH NAME> := ${printMonths()}` );    
}

function helpLight()
{
  console.error(`calendar -l <DATE>`);    
  console.error(`<DATE> := <DATE NUMERIC> | <DATE ALPHANUMERIC> `);
  console.error(`<DATE NUMERIC> :=  dd-mm-yyyy ` );
  console.error(`<DATE ALPHANUMERIC> := dd-<MONTH NAME>-yyyy` );    
  console.error(`<MONTH NAME> := ${printMonths()}` );    
}


function helpOptions()
{
  console.error(`calendar <OPTION> <ARGS>`); 
  console.error(`<OPTION> := -s para mostrar o dia da semana`);
  console.error(`<OPTION> := -e para mostrar a estação`);
  console.error(`<OPTION> := -l para mostrar a quantidade de luz`);

}

function isValidOption(option:string):boolean
{
  const options:Array<string> = ["-s","-e","-l"];
   return options.some((value,index,arr)=>{
     return value==option;
   });
}

function execDateFunction(date:string,func:(value:string)=>void)
{
  
  if(!isValidDate(date))    
  {
    console.error(`Data inválida:`);
    helpWeek();
    return;
  }

  func(date);
}
 
 
function init(args:Array<string>)
{   


  if(args.length <= START_USER_PARAMETER || !isValidOption(args[START_USER_PARAMETER]))
  {
    console.error(`Não foi fornecido a opção:`);
    helpOptions();    
    return;
  } 

  if(args[START_USER_PARAMETER].toLowerCase()=="-s")
  {
    if(args.length < (START_USER_PARAMETER+2))
    {
      console.error(`Para calcular o dia da semana precisa da data:`);
      helpWeek();  
      return;  
    }    
    execDateFunction(args[START_USER_PARAMETER+1],printWeek);
  }
  else if(args[START_USER_PARAMETER].toLowerCase()=="-e")
  {
    if(args.length < (START_USER_PARAMETER+2))
    {
      console.error(`Para calcular a estação precisa da data:`);
      helpSeason();
      return;
    }    
    
    execDateFunction(args[START_USER_PARAMETER+1],printSeason);
  }
  else if(args[START_USER_PARAMETER].toLowerCase()=="-l")
  {
    if(args.length < (START_USER_PARAMETER+2))
    {
      console.error(`Para calcular a quantidade de luz  precisa da data:`);
      helpLight();
      return;
    }    
    
    execDateFunction(args[START_USER_PARAMETER+1],printLight);
  }
    
}

init(args);