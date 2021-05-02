import { Global, Logger } from "@nestjs/common";

@Global()
export class ObjectMapper{
    static mappedValues<S, D>(sourceObject, destinationObject, option?){
        Object.keys(sourceObject).forEach(key => {
            Logger.debug(` >>>>> key :: [${key}]`);
            if(option?.skip){
                Logger.debug(` >>> option :: skips :: ${option.skip}`);
                const skips = option.skip??[];
                if(!skips.find(skip => skip === key)){
                    destinationObject[key] = sourceObject[key]?? destinationObject[key];
                }
            }else{
                destinationObject[key] = sourceObject[key]?? destinationObject[key];
            }
        })
        return destinationObject
    }
}