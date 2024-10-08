export const handleStringDate = (timestamp) => {
  const date = new Date(timestamp);
  const year = date.getUTCFullYear(); 
  const month = date.getUTCMonth() + 1;  
  const day = date.getUTCDate();         
  return (`${year}-${month}-${day}`)
}

export const handleObjectDate = (timestamp) =>{
  const date = new Date(timestamp);
  return date;
}