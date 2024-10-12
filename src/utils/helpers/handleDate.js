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

export const getDay = (timestamp) => {
  const date = new Date(timestamp)
  return date.getDay()
}

export const getMonth = (timestamp) => {
  const date = new Date(timestamp)
  return date.getMonth() + 1
}

export const getYear = (timestamp) => {
  const date = new Date(timestamp)
  return date.getFullYear()
}