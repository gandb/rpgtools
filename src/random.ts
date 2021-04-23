
const args:Array<string> = process.argv;
const START_USER_PARAMETER:number  = 2;

export function rool( faces:number ) : number
{
    const partial =  Math.round(Math.random() * faces )+1 ;
    if(partial==(faces+1))
    {
        return 1;
    }
    return partial;
}


export function indexArray(arr:Array<any>):number
{
  let index =  Math.ceil( Math.random() * arr.length );
  if(index == arr.length)
  {
    index = 0 ;
  }
  return index;
}
 
//devolve um número randomico de 0 até o número passado -1 (ex 5 gera 0, 1, 2, 3 ou 4)
export function int(value:number)
{
  let ret:number = Math.floor( Math.random() * value ) ;
  ret = (ret==(value+1)) ?  0: ret;
  return ret;
}
