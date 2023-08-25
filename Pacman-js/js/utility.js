let getPos = (level, toSearch) =>{
    let position = [];
    let foundIt = false;
 console.log(level)
    level.forEach((element,index1) => {
        if(!foundIt){
            position[0] = element.findIndex((value,index)=> (foundIt = value===toSearch))
            position[1] = position[0] != null ? index1 : null;
        }
        
    });
    
    return position;
}

let blockScroollPage = () => {
    window.addEventListener(
        "keydown",
        (e) => {
            if (
                [
                    "Space",
                    "ArrowUp",
                    "ArrowDown",
                    "ArrowLeft",
                    "ArrowRight",
                ].indexOf(e.key) > -1
            ) {
                e.preventDefault();
            }
        },
        false
    );
};





export { getPos, blockScroollPage }; 