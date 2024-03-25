//Genetic Algorithm Functions
const populationSize = 50
const sections = ["11M1","11M2","11A1","11A2"]
const days = ["monday","tuesday","wednesday","thursday","friday","saturday"]
const initializePopulation = (sections) => {
    let initialPopulation = [];
    const subjects = curriculum[0].contents.find(content=>content.level=="1st_year").firstSem;
    const roomsToBeUsed = new Rooms(rooms);
    const professorsToBeAssigned = new Professors(professors);

    for(let i = 0; i < populationSize; i++){ // generate an initial population of 50
        let sectionLevelSched = [];
        for (let j = 0; j < sections.length ; j++){

            for(let k = 0; k<days.length;k++){
                //search for a part-timer for this day
                //look for a subject that matches the expertise of the part-timer
                //randomly select
            }
            subjects.forEach(subject => {
                //TO-DO
                //get professor based on expertise
                //look for part timer
                sectionLevelSched.push({subjName:subject.subjName});
            });
        }
    }

    return initialPopulation;
}

const fitnessFunction = () => {

}

const crossOverFunction = () => {

}

const mutationFunction = () => {

}



