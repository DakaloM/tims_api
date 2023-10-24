

const serializeObject = (object: object) => {
    
    const newObject = JSON.parse(JSON.stringify(object, (key, value) => 
        typeof value === "bigint"? value.toString() : value  
    ))
    return newObject
}

export {serializeObject}