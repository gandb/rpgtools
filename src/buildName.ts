"use strict";

import { strict } from "assert";
import { json } from "express";
import * as random from "./random";

const args:Array<string> = process.argv;
const START_USER_PARAMETER:number  = 2;

export interface SetName{
    name:string,
    key:string,
    race:string,
    maleFirstName:Array<string>,
    femaleFirstName:Array<string>,
    lastName:Array<string>,
    filterFirstName?:(name:string,female:boolean)=>string,
    filterLastName?:(name:string,female:boolean)=>string,
}


const BrazilianNames : SetName = {
  name : "Brazilian Names",
  key:"BR",
  race:"Human",
  maleFirstName :["Antonio","Alexandre","Artur","Bernardo","Bruno","Daniel","David","Eduardo","Edson","Emerson","Felipe","Fernando","Gabriel","Guilherme","Gustavo","Henrique","João","José","Lucas","Robson","Marcelo","Mateus","Miguel","Pedro","Rafael","Ricardo","Roberto","Samuel"],
  femaleFirstName : ["Alexandra","Alice","Angélica","Beatriz","Bianca","Catarina","Cecília","Eliza","Eloá","Fernanda","Helena","Joana","Júlia","Laura","Letícia","Luana","Luciana","Maíra","Maitê","Maria","Michele","Paula","Roberta","Sara","Sofia","Isabele"],
  lastName : ["Almeida","Alves","Araújo","Aurélio","Cardoso","Carli","Carvalho","Coelho","Costa","de Oliveira","de Souza","Ferreira","Figueira","Gomes","Lima","Maggionni","Pereira","Ribeiro","Rodrigues","Santos","Teixeira"]
};

const MedievalNames : SetName = {
  name : "Medieval Names",
  key:"MV",
  race:"Human",
  maleFirstName : ["Aaron","Adailton","Adalard","Adam","Adelpho","Adelson","Adenilson","Adílson","Adolphus","Aidan","Ailson","Aílton","Airon","Aírton","Alair","Albert","Alexander","Alexandre","Alison","Alite","Allyson","Alyson","Ambrose","Amis","Anderson","Anthony","Antony","Archie","Arielson","Arthur","Arvid","Ary","Ashton","Astaroth","Austin","Ayrton","Baldwin","Barney","Baron","Barry","Bartolomeu","Benson","Bentley","Bernard","Bill","Binder","Bjorn","Blair","Bob","Brandon","Bromberg","Brook","Bud","Byron","Cadman","Cadu","Calvin","Cam","Carter","Chandler","Charles","Charlie","Chase","Chester","Christian","Christofer","Christopher","Chuck","Clark","Clayton","Cleiton","Cléver","Cleverson","Cleyton","Cliff","Clinton","Cole","Colin","Colton","Cosmo","Dalibor","Dallas","Dalton","Damon","Darin","Darwin","Davidson","Davis","Dean","Denílson","Denzel","Derek","Derick","Dexter","Dick","Dickson","Dilan","Dílson","Domenico","Dominic","Donald","Drake","Drew","Duarte","Duncan","Durward","Earl","Ebert","Eddy","Éderson","Edilson","Edmílson","Edson","Eduardo","Edward","Edwin","Elder","Elijah","Elivelton","Elliot","Ellis","Élson","Élton","Emerson","Emery","Emmett","Enguerrand","Erasto","Ernest","Esmond","Esmondo","Ethan","Everson","Everton","Ewerthon","Falcão","Farell","Fergus","Floyd","Fóster","Fox","Franklin","Fred","Frederico","Garnet","Gary","Gaylord","Gelson","Genival","Genivaldo","Geoffrey","George","Gílson","Giuseppe","Gleidson","Gleison","Goldman","Gordon","Grannus","Gregory","Hadrian","Hakon","Haley","Hamilton","Hamlet","Hardy","Harley","Harmon","Harold","Harriet","Harrison","Harrisson","Harry","Hawise","Hayden","Hazel","Hector","Hélder","Helge","Helton","Henderson","Henry","Herbert","Herman","Hudson","Hugh","Hunter","Isaac","Ives","Jack","Jackson","Jailson","Jailton","James","Jáper","Jason","Jásper","Jayden","Jeferson","Jefferson","Jeffrey","Jetro","Jewel","Jhon","Jhonatan","Jim","Jimy","Jóbson","Joelson","Joelton","John","Johnny","Johnson","Jonathan","Jones","Jordan","Joseph","Josh","Justin","Karl","Keane","Keenan","Kelson","Kemp","Ken","Kendrick","Kennedy","Kenneth","Kenrick","Kesley","Killian","Kimball","Kimberley","Kinderman","King","Knox","Kristopher","Lake","Lamar","Larry","Laurel","Lee","Lenilson","Lennon","Leonice","Letholdus","Lewis","Lincoln","Lola","Lutero","Madge","Madson","Maggy","Máicol","Maicon","Malcolm","Marigold","Marley","Marshal","Marvin","Maverick","Maxwel","Michael","Mike","Miller","Milo","Milton","Mollie","Montgomery","Morgan","Moses","Nathan","Nelson","Newton","Nicholas","Nick","Nikolas","Nilson","Nolan","Noreen","Norman","Norris","Norton","Odir","Ogden","Oris","Orson","Oscar","Oskar","Oswald","Paim","Pálmer","Patrick","Patsy","Paul","Perci","Percy","Peter","Peterson","Phoenix","Quentin","Quinn","Rain","Ralph","Ramsey","Randall","Randy","Raulino","Raylan","Raymond","Reagan","Reed","Reid","Reuben","Rhett","Ricardo","Richard","Rick","Rider","Riley","Rob","Róbby","Robert","Robin","Róbinson","Robson","Rockne","Roderick","Rodnei","Rodney","Roland","Rolf","Ronny","Rudson","Sam","Sampson","Saymon","Scott","Seamus","Sebastian","Sherlock","Sidney","Simon","Singer","Smith","Solomon","Spencer","Spike","Steve","Stewart","Talisson","Tansy","Taylor","Ted","Teddy","Thalisson","Theodore","Thomas","Tim","Toby","Tom","Tomé","Tommy","Tony","Torrance","Travis","Tyler","Tyson","Uilian","Ulric","Upton","Usher","Valerie","Vince","Vincent","Virgil","Volnei","Wanderson","Ward","Warley","Washington","Welington","Welles","Wellington","Welton","Wesley","Weston","Weverton","Whindersson","William","Wilmar","Wilson","Wiltom","Wilton","Windsor","Winston","Wolf","Woody","Yates","Zachary","Zack","Zola"],
  femaleFirstName :  ["Ada","Adela","Adina","Agatha","Agnes","Aila","Aileen","Alanis","Alanna","Alba","Alden","Alisson","Amice","Amy","Ana Célia","Anabela","Anais","Anália","Anise","Annabeth","Anni","Annie","Anny","April","Arabela","Arlene","Arlete","Arline","Ashiley","Ashley","Audrey","Avril","Barbie","Becky","Bell","Bella","Berry","Bessie","Beth","Bethany","Betsy","Betty","Beverly","Blanck","Blue Ivy","Bonnie","Bozena","Brandi","Brenda","Brittany","Brooke","Bryana","Burle","Cadence","Carolaine","Cateline","Catherine","Célia","Celina","Celine","Chelsea","Cherry","Chloe","Clare","Clay","Cléia","Cleidiane","Clover","Connie","Courtney","Cyndi","Dale","Darlene","Davina","Dayse","Deise","Destiny","Diamonique","Dilza","Dionísia","Dorothy","Dustin","Dyane","Ebony","Eda","Edilene","Edite","Eileen","Elaine","Elane","Elen","Elis","Elizabeth","Ellen","Elsie","Emilly","Emily","Emma","Emma Grace","Ethel","Evelin","Eveline","Evellyn","Evelyn","Everly","Eyshila","Faith","Fani","Fanny","Fany","Fay","Felicity","Florence","Frances","Gaby","Gail","Gardênia","Gene","Geni","Géssica","Gilda","Gildete","Gilmara","Gisela","Gisele","Giseli","Giselle","Gladis","Gleide","Glenda","Godiva","Grace","Gwen","Gwendolyn","Hanna","Hayley","Heather","Hilary","Hilda","Holly","Hope","Isabel","Isabele","Isabeu","Ivy","Izabele","Jailma","Jamie","Janelle","Janet","Janete","Janice","Jeane","Jênie","Jenifer","Jennie","Jennifer","Jessie","Jessy","Jill","Joan","Joana","Jocosa","Josi","Josie","Judith","Juniper","Kaila","Kara","Karin","Karly","Karolaine","Karolyn","Kate","Katherine","kathleen","Kathy","Keity","Keli","Kellen","Kelly","Kemilly","Kendra","Kênia","Khloe","Kimberly","Kimi","Kira","Kitty","Kristal","Kristen","Lane","Latóya","Lauana","Laureen","Lauren","Léia","Leide","Leona","Leone","Liberty","Lilian","Liliana","Liliane","Lily","Lindsay","Lisa","Lisiane","Liz","Lolla","Loren","Lorna","Lorrane","Luana","Lucinda","Lysandra","Lyssa","Lyudmila","Mab","Mabel","Mallory","Marcielly","Margarete","Margareth","Margot","Mariah","Mariane","Marineide","Marisa","Marisia","Marizete","Marjorie","Marjory","Marly","Martha","Mary","Matilda","Meg","Megan","Meggy","Melody","Mércia","Mercy","Merry","Mia","Mildred","Millie","Mirela","Mirella","Mirelle","Molly","Myrella","Nanci","Nancy","Nanette","Navy","Neila","Neli","Nelly","Nelma","Nilma","Norma","Oneide","Oscarina","Paige","Patience","Pearl","Peddy","Peggy","Poliana","Polly","Pollyanna","Polyanna","Queli","Ramona","Raven","Ravena","Raylene","Rhana","Rihanna","Roaslie","Rosana","Rosane","Rose","Roseane","Rosely","Rosemary","Rosenilda","Roseta","Rosmerta","Sadie","Salete","Sandy","Scarlet","Serenity","Sharon","Shirlei","Shirley","Sirlene","Sirley","Skyler","Stace","Stefani","Stefanie","Stefany","Stephanie","Sthefanny","Suelen","Suellen","Susie","Suzi","Suzy","Tayla","Thayla","Thyri","Tiffany","Tracy","Trícia","Trinity","Urd","Valdelice","Venus","Vicki","Violet","Vivian","Wade","Wendy","Whitney","Willow","Wilma","Winnie","Ylana","Yolanda","Zara"],
  lastName : ["Allen","Ashley","Axel","Baker","Bennett","Brown","Cadman","Carter","Clarke","Collins","Cook","Cooper","Cox","Davies","Dean","Dragomir","Edwards","Elliot","Eratos","Evans","Fernsby","Floyd","Franklin","Grannus","Green","Gwendolyn","Hall","Harris","Harrison","Hawise","Hill","Jackson","James","Johnson","Jones","Lancaster","Lewis","MacGyver","Mitchell","Morris","Odilia","Phillips","Riley","Roberts","Robinson ","Rudson","Sallow","Scott","Smith","Stuart","Taylor","Thomas","Thyri","Tudor","Turner","Tyler","Villin","Walker","Wallace","Ward","White","Williams","Wilson","Windsor","Wood","Wright","Young"]
};

const EnglishNames : SetName = {
  name : "English Names",
  key:"EN",
  race:"Human",
  maleFirstName : ["Aaron","Adailton","Adalard","Adam","Adelpho","Adelson","Adenilson","Adílson","Adolphus","Aidan","Ailson","Aílton","Airon","Aírton","Alair","Albert","Alexander","Alison","Alite","Allyson","Alyson","Ambrose","Amis","Anderson","Anthony","Antony","Archie","Arielson","Ary","Ashton","Astaroth","Austin","Ayrton","Baldwin","Barney","Baron","Barry","Benson","Bentley","Bernard","Bill","Binder","Blair","Bob","Brandon","Bromberg","Brook","Bud","Byron","Cadman","Cadu","Calvin","Cam","Carter","Chandler","Charles","Charlie","Chase","Chester","Christian","Christofer","Christopher","Chuck","Clark","Clayton","Cleiton","Cléver","Cleverson","Cleyton","Cliff","Clinton","Cole","Colin","Colton","Cosmo","Dallas","Dalton","Damon","Darin","Darwin","Davidson","Davis","Dean","Denílson","Denzel","Derek","Derick","Dexter","Dick","Dickson","Dilan","Dílson","Dominic","Donald","Drake","Drew","Duarte","Duncan","Durward","Earl","Ebert","Eddy","Éderson","Edilson","Edmílson","Edson","Edward","Edwin","Elder","Elijah","Elivelton","Elliot","Ellis","Élson","Élton","Emerson","Emery","Emmett","Ernest","Esmond","Esmondo","Ethan","Everson","Everton","Ewerthon","Falcão","Farell","Fergus","Floyd","Fóster","Fox","Franklin","Fred","Garnet","Gary","Gaylord","Gelson","Genival","Genivaldo","Geoffrey","George","Gílson","Giuseppe","Gleidson","Gleison","Goldman","Gordon","Gregory","Hadrian","Haley","Hamilton","Hamlet","Hardy","Harley","Harmon","Harold","Harriet","Harrison","Harrisson","Harry","Hayden","Hazel","Hector","Hélder","Helge","Helton","Henderson","Henry","Herbert","Herman","Hudson","Hugh","Hunter","Isaac","Ives","Jack","Jackson","Jailson","Jailton","James","Jáper","Jason","Jásper","Jayden","Jeferson","Jefferson","Jeffrey","Jetro","Jewel","Jhon","Jhonatan","Jim","Jimy","Jóbson","Joelson","Joelton","John","Johnny","Johnson","Jonathan","Jones","Jordan","Joseph","Josh","Justin","Karl","Keane","Keenan","Kelson","Kemp","Ken","Kendrick","Kennedy","Kenneth","Kenrick","Kesley","Killian","Kimball","Kimberley","Kinderman","King","Knox","Kristopher","Lake","Lamar","Larry","Laurel","Lee","Lenilson","Lennon","Leonice","Lewis","Lincoln","Lola","Madge","Madson","Maggy","Máicol","Maicon","Malcolm","Marigold","Marley","Marshal","Marvin","Maverick","Maxwel","Michael","Mike","Miller","Milton","Mollie","Montgomery","Morgan","Moses","Nathan","Nelson","Newton","Nicholas","Nick","Nikolas","Nilson","Nolan","Noreen","Norman","Norris","Norton","Odir","Ogden","Oris","Orson","Oscar","Oskar","Oswald","Paim","Pálmer","Patrick","Patsy","Paul","Perci","Percy","Peter","Peterson","Phoenix","Quentin","Quinn","Rain","Ralph","Ramsey","Randall","Randy","Raulino","Raylan","Raymond","Reagan","Reed","Reid","Reuben","Rhett","Richard","Rick","Rider","Riley","Rob","Róbby","Robert","Robin","Róbinson","Robson","Rockne","Roderick","Rodnei","Rodney","Rolf","Ronny","Rudson","Sam","Sampson","Saymon","Scott","Seamus","Sebastian","Sherlock","Sidney","Simon","Singer","Smith","Solomon","Spencer","Spike","Steve","Stewart","Talisson","Tansy","Taylor","Ted","Teddy","Thalisson","Theodore","Thomas","Tim","Toby","Tom","Tomé","Tommy","Tony","Torrance","Travis","Tyler","Tyson","Uilian","Ulric","Upton","Usher","Valerie","Vince","Vincent","Virgil","Volnei","Wanderson","Ward","Warley","Washington","Welington","Welles","Wellington","Welton","Wesley","Weston","Weverton","Whindersson","Wilmar","Wilson","Wiltom","Wilton","Windsor","Winston","Wolf","Woody","Yates","Zachary","Zack","Zola"],
  femaleFirstName : ["Ada","Adela","Adina","Agatha","Aileen","Alanis","Alanna","Alden","Alisson","Amy","Ana Célia","Anabela","Anais","Anália","Anise","Annabeth","Anni","Annie","Anny","April","Arabela","Arlene","Arlete","Arline","Ashiley","Ashley","Audrey","Avril","Barbie","Becky","Bell","Bella","Berry","Bessie","Beth","Bethany","Betsy","Betty","Beverly","Blanck","Blue Ivy","Bonnie","Brandi","Brittany","Brooke","Burle","Cadence","Carolaine","Catherine","Célia","Celina","Celine","Chelsea","Cherry","Chloe","Clare","Clay","Cléia","Cleidiane","Clover","Connie","Courtney","Cyndi","Dale","Darlene","Davina","Dayse","Deise","Destiny","Diamonique","Dilza","Dorothy","Dustin","Dyane","Ebony","Eda","Edilene","Edite","Eileen","Elaine","Elane","Elen","Elis","Ellen","Elsie","Emilly","Emily","Emma Grace","Ethel","Evelin","Eveline","Evellyn","Evelyn","Everly","Eyshila","Faith","Fani","Fanny","Fany","Fay","Felicity","Florence","Frances","Gaby","Gail","Gardênia","Gene","Geni","Géssica","Gilda","Gildete","Gilmara","Gisela","Gisele","Giseli","Giselle","Gladis","Gleide","Glenda","Godiva","Grace","Gwen","Hanna","Hayley","Heather","Hilary","Holly","Hope","Ivy","Izabele","Jailma","Jamie","Janelle","Janet","Janete","Janice","Jeane","Jênie","Jenifer","Jennie","Jennifer","Jessie","Jessy","Jill","Joan","Josi","Josie","Judith","Juniper","Kaila","Kara","Karin","Karly","Karolaine","Karolyn","Kate","Katherine","kathleen","Kathy","Keity","Keli","Kellen","Kelly","Kemilly","Kendra","Kênia","Khloe","Kimberly","Kimi","Kira","Kitty","Kristal","Kristen","Lane","Latóya","Lauana","Laureen","Lauren","Léia","Leide","Leona","Leone","Liberty","Lilian","Liliana","Liliane","Lily","Lindsay","Lisa","Lisiane","Liz","Lolla","Loren","Lorna","Lorrane","Luana","Lucinda","Lysandra","Lyssa","Mab","Mabel","Mallory","Marcielly","Margarete","Margareth","Margot","Mariah","Mariane","Marineide","Marisa","Marisia","Marizete","Marjorie","Marjory","Marly","Martha","Mary","Meg","Megan","Melody","Mércia","Mercy","Merry","Mia","Mildred","Millie","Mirela","Mirella","Mirelle","Molly","Myrella","Nanci","Nancy","Nanette","Navy","Neila","Neli","Nelly","Nelma","Nilma","Norma","Oneide","Oscarina","Paige","Patience","Pearl","Peddy","Peggy","Poliana","Polly","Pollyanna","Polyanna","Queli","Ramona","Raven","Ravena","Raylene","Rhana","Rihanna","Roaslie","Rosana","Rosane","Rose","Roseane","Rosely","Rosemary","Rosenilda","Sadie","Salete","Sandy","Scarlet","Serenity","Sharon","Shirlei","Shirley","Sirlene","Sirley","Skyler","Stefani","Stefanie","Stefany","Stephanie","Sthefanny","Suelen","Suellen","Susie","Suzi","Suzy","Tayla","Thayla","Tiffany","Tracy","Trícia","Trinity","Valdelice","Venus","Vicki","Violet","Vivian","Wade","Wendy","Whitney","Willow","Wilma","Winnie","Ylana","Yolanda","Zara"],
  lastName : ["Smith","Jones","Taylor","Williams","Wilson","Thomas","Brown","Davies","Roberts","Johnson","Jackson","White","Evans","Walker","Edwards","Wright","Wood","Green","Phillips","Clarke","Morris","Scott","Cooper","Lewis","Rudson","Robinson ","Riley","Wallace","Elliot","Harris","Carter","Hall","Ward","Hill","Allen","Harrison","Bennett","Windsor","Floyd","Ashley","Tyler","MacGyver","Axel","Dean","Franklin","Tudor","Lancaster","Stuart","Mitchell","Turner","James","Young","Sallow","Fernsby","Cook","Baker","Villin","Collins","Cox"]
};


const DwarfNames : SetName = {
  name : "Dwarf Names",
  key:"DW",
  race:"Dwarf",
  maleFirstName : ["Yuri","Igor","Ivan","Dimitri","Andrey","Higor","Ivo","Ygor","Yure","Ivanildo","Ives","Nikolai","Pavel","Serguei","Yuli","Igor Felipe","Mikhail","Czar","Dimitre","Nicol","Oksana","Yerik","Frans","Rurik","Kriger","Yegor","Krigor","Dmitry","Yurio","Yvon",
  "Yuri","Igor","Ivan","Dimitri","Andrey","Higor","Ivo","Ygor","Ivanildo","Yure","Vladislav","Górki","Pavlov","Josivan","Vonda","Ruslan","Lev","Yaroslav","Vasily","Maksim","Fiódor","Arytom","Daniil"],
  femaleFirstName : ["Lara","Raissa","Kira","Rayssa","Sônia","Lana","Tânia","Nádia","Vânia","Tâmara","Kátia","Natasha","Olga","Sasha","Cátia","Valdirene","Ivana","Kênia","Natacha","Ana Lara","Ivani","Violetta","Ivanete","Vanilda","Svetlana","Avani","Yeva","Ania","Katya","Yelena",
  "Lara","Raissa","Kira","Rayssa","Sônia","Lana","Tânia","Nádia","Vânia","Tâmara","Oxana","Nadezhda","Lyuba","Katiucia","Liuba","Ksenya","Irenia","Galena","Valia","Latasha","Branka","Jekaterina","Masha","Tasha","Alya","Yelizaveta"],
  lastName : ["Escudo de","Machado de","Espada de","Elmo de","Braço de","Punhos de","Pés de","Martelo de","Lança de","Espinhos de"],
  filterLastName: (name:string,female:boolean)=>{

    const qualities : Array<string> = ["Carvalho","Ferro","Ouro","Diamante","Rubi","Madeira","Prata","Cobre","Bronze","Vidro","Flores"];
    
     let  quality : number = Math.round(Math.random()*qualities.length);
     quality = ( quality>=qualities.length )?0:quality;
     return name + " " + qualities[quality];
    
  }
};

const RussiansNames : SetName = {
  name : "Russian Names",
  key:"RU",
  race:"Human",
  maleFirstName : ["Yuri","Igor","Ivan","Dimitri","Andrey","Higor","Ivo","Ygor","Yure","Ivanildo","Ives","Nikolai","Pavel","Serguei","Yuli","Igor Felipe","Mikhail","Czar","Dimitre","Nicol","Oksana","Yerik","Frans","Rurik","Kriger","Yegor","Krigor","Dmitry","Yurio","Yvon",
  "Yuri","Igor","Ivan","Dimitri","Andrey","Higor","Ivo","Ygor","Ivanildo","Yure","Vladislav","Górki","Pavlov","Josivan","Vonda","Ruslan","Lev","Yaroslav","Vasily","Maksim","Fiódor","Arytom","Daniil"],
  femaleFirstName : ["Lara","Raissa","Kira","Rayssa","Sônia","Lana","Tânia","Nádia","Vânia","Tâmara","Kátia","Natasha","Olga","Sasha","Cátia","Valdirene","Ivana","Kênia","Natacha","Ana Lara","Ivani","Violetta","Ivanete","Vanilda","Svetlana","Avani","Yeva","Ania","Katya","Yelena",
  "Lara","Raissa","Kira","Rayssa","Sônia","Lana","Tânia","Nádia","Vânia","Tâmara","Oxana","Nadezhda","Lyuba","Katiucia","Liuba","Ksenya","Irenia","Galena","Valia","Latasha","Branka","Jekaterina","Masha","Tasha","Alya","Yelizaveta"],
  lastName : ["Alekse","Grigori","Pavl","Pop","Fedor","Iva","Smir","Sido","Vassil","Asi","Sharap","Dostoiévski","Tchekh","Gonchar","Turgueni","Roman","Demid","Orl","Rurik"],
  filterLastName: (name:string,female:boolean)=>{
    if(female)
    {
        if(Math.random()*1000>500)
        {
          return name+"eva";
        }
        return name+"ova";
    }
    if(Math.random()*1000>500)
        {
          return name+"ev";
        }
        return name+"ov";
    return "";
  }
};


const ElvenNames : SetName = {
  name : "Elven Names",
  key:"EV",
  race:"Elven",
  maleFirstName : ["Aragorn","Angrod","Caranthir","Darian","Celegorm","Eldar","Elrond","Fëanor","Fingolfin","Finrod","Isildur","Lórien","Mablung","Maedhros","Silverleaf","Legolas","Poldo","Voronwe","Gildor","Elrohir","Aldon","Cirdan","Haldir","Iston","Callon","Earendil","Elladan","Garrett","Logon"],
  femaleFirstName : ["Anna","Amarïe","Aerin","Freda","Luthien","Calen","Galadriel","Yavanna","Arwen","Elanor","Eowyn","Estel","Idril","Nessa","Celebrindal","Elentari","Indis","Lúthien","Miriel","Nimrodel","Níniel","Kaelin","Adélie"],
  lastName : ["Half","Born","Hight","Jewel","Star","Whisper","Silver"],
  filterLastName: (name:string,female:boolean)=>{
    const quality:Array<string> = ["moon","star","flower","diamonts","precious","silver","leaf","oak","tree","night","morning","dusk","gold"];
    let index = Math.round(Math.random()* quality.length);
    index = (index>= quality.length)?0:index;
    return name + quality[index];    
  }
};


//https://www.dicionariodenomesproprios.com.br/nomes-russos/

 
const all:Array<SetName> = [BrazilianNames,MedievalNames,EnglishNames,DwarfNames,RussiansNames,ElvenNames];
 
export function loadOrigins()
{  
  //code load origins 
  //for now is fixed
}

export function getOrigens():Array<SetName>
{
  return all;
}

export function printOrigens():void
{
    console.error("As origens aceitas são:");
    for(let index = 0 ; index < all.length ; index++)
    {
      console.error(all[index].key + " : " + all[index].name );  
    }
    
}

export function printGenders():void
{
    console.error("Os generos aceitos são:");    
    console.error("F: Female");
    console.error("M: Male");
}


export function isValidOrigin(origin:string):boolean
{
  const ret:boolean =  all.find((set,index,arr)=>{return set.key==origin.toUpperCase()})!=null;  
  return ret;
}

export function isValidGender(gender:string):boolean
{
  if(gender.toUpperCase()=="F" || gender.toUpperCase()=="M")
  {
    return true;
  }
  return false;
}

export function isValidPrint( print:string)
{
  return print && print.toLocaleLowerCase()=="printdata";
}

export function isValidQuantity(quantity:string)
{
  return !isNaN(quantity as any) && parseInt(quantity,10)== parseFloat(quantity);
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


export function print(args:Array<string>)
{
    
    const choosedSetName:SetName = getSetName(args[START_USER_PARAMETER]);

    
    const isFemale:boolean = (args[START_USER_PARAMETER+1].toUpperCase()=="F")?true:false;

    const setFirstName:Set<string> = new Set<string>();

    let  firstName: Array<string > = (isFemale)?choosedSetName.femaleFirstName : choosedSetName.maleFirstName;
    
    firstName = firstName.sort( (a,b)=>{  return a.localeCompare(b); }).filter((value,index,array)=>{
      if(setFirstName.has(value))
      {
        return false;
      }
      setFirstName.add(value);
      return true;
    });

    const setLastName:Set<string> = new Set<string>();

    let  lastName: Array<string > = choosedSetName.lastName;
    
    lastName = lastName.sort( (a,b)=>{  return a.localeCompare(b); }).filter((value,index,array)=>{
      if(setLastName.has(value))
      {
        return false;
      }
      setLastName.add(value);
      return true;
    });

    
    console.log("firstName=>",JSON.stringify(firstName));
    console.log("lastName=>",JSON.stringify(lastName));

}

export function generateName(choosedSetName:SetName,isFemale:boolean):string
{
    const indexLastName:number = random.indexArray ( choosedSetName.lastName);
    const indexFemaleLastName:number =  random.indexArray ( choosedSetName.femaleFirstName);
    const indexMaleLastName:number =  random.indexArray ( choosedSetName.maleFirstName); 
  
    let firstName :string = (isFemale)? choosedSetName.femaleFirstName[indexFemaleLastName]: choosedSetName.maleFirstName[indexMaleLastName];
  
    if(firstName==undefined)
    {
      console.error("FirstName undefined " , (isFemale)? indexFemaleLastName:indexMaleLastName);
      return;
    }
  
    let lastName :string = choosedSetName.lastName[ indexLastName ];
  
    if(lastName==undefined)
    {
      console.error("LastName undefined " , indexLastName);
      return;
    }
  
    //filters
    if(choosedSetName.filterFirstName)
    {
      firstName = choosedSetName.filterFirstName(firstName,isFemale);
    }
  
    if(choosedSetName.filterLastName)
    {
      lastName = choosedSetName.filterLastName(lastName,isFemale);
    }

    return firstName + " " + lastName;
}

 
function init()
{   
  console.log("BuildName v1.0.1");
   

  loadOrigins();
  
   
}

init();