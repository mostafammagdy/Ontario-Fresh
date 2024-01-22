//this is to be used on the array from the scaleTab component

export const sentenceConstructor = (array) => {
    const sizeArray = []
    if (array.includes("SML") || array.includes("Sma")) {
        sizeArray.push("small")
    }
    if (array.includes("MED") || array.includes("Med")) {
        sizeArray.push("medium")
    }
    if (array.includes("LRG") || array.includes("Lar")) {
        sizeArray.push("large")
    }
    
    if (sizeArray.length === 3) {
        return " in " + sizeArray[0] + ", " + sizeArray[1] + ", " + sizeArray[2] + " volumes"
    }
    else if (sizeArray.length === 2) {
        return " in " + sizeArray[0] + ", " + sizeArray[1] + " volumes"
    }
    else if (sizeArray.length === 1) {
        return " in " + sizeArray[0] + " volumes"
    }
    else {
        return ""
    }
}
