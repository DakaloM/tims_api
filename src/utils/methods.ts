import {z} from "zod"

const isEmpty = (obj: object) => {
    for (var prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        return false;
      }
    }
  
    return true
  }

const dateStringToIso = (dateString: string) => {
  if(!dateString){
    return ""
  }
  const newIsoDate = new Date(dateString).toISOString();
  
  return newIsoDate
}

  export {isEmpty, dateStringToIso}