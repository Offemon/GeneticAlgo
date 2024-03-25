//Genetic Algorithm
const populationSize = 50
const levels = 1
const sections = ["11M1","11M2","11A1","11A2"]
const days = ["monday","tuesday","wednesday","thursday","friday","saturday"]


const initializePopulation = (sections) => {
    let initialPopulation = [];
    let overAllSched;
    const subjects = curriculum[0].contents.find(content=>content.level=="1st_year").firstSem;
    const roomsToBeUsed = new Rooms(rooms);
    const professorsToBeAssigned = new Professors(professors);
    for(let i = 0; i < populationSize; i++){ // generate an initial population of 50
        overAllSched = [];
        for (let j = 0; j < sections.length ; j++){ //generate a monday to saturday sched for each section
            let sectionLevelSched = [];
            //TO-DO
            //Create an array of unassigned subjects and have a state variable if a specific subject has been assigned
            for(let k = 0; k<days.length;k++){  //loop through the days of the week
                let day = days[k];
                let section = sections[j]

                subjects.forEach(subject => { // loop through each subjects
                    //TO-DO
                    //get professor based on expertise
                    //is the part timer has this expertise? yes? then prioritize the part timer
                    //else just look for a professor that has that expertise

                    //create partitions for synchronous and asynchronous sessions for subjects.

                    let chosenProfessor;
                    let partTimeProfs
                    let fullTimeProfs
                    let chosenRoom
                    let timeSlot
                    let startTime
                    let endTime
                    let professorForThisSubject = professorsToBeAssigned.getByExpertise(subject.expertiseReq);
                    partTimeProfs = professorForThisSubject.getPartTime().getByAvailability(day).professors; //get part time professors that has the expertise and is available during this day
                    fullTimeProfs = professorForThisSubject.getFullTime().getByAvailability(day).professors; //get full time professors that has the expertise and is available during this day
                    
                    if(partTimeProfs.length>=1){
                        chosenProfessor = partTimeProfs[Math.floor(Math.random() * (partTimeProfs.length-1))];
                    }
                    else{
                        chosenProfessor = fullTimeProfs[Math.floor(Math.random() * (fullTimeProfs.length-1))];
                    }

                    switch(subject.classType){ // this needs to have its own function
                        case "lec":
                            roomsArray = roomsToBeUsed.fetchEnabledRooms().fetchRoomsByType("lec").rooms;
                            chosenRoom = roomsArray[Math.floor(Math.random()*(roomsArray.length-1))];
                            break;
                        case "lab":
                            roomsArray = roomsToBeUsed.fetchEnabledRooms().fetchRoomsByType("comp_lab").rooms;
                            chosenRoom = roomsArray[Math.floor(Math.random()*(roomsArray.length-1))];
                            break;
                        case "gym":
                            roomsArray = roomsToBeUsed.fetchEnabledRooms().fetchRoomsByType("gym").rooms;
                            chosenRoom = roomsArray[Math.floor(Math.random()*(roomsArray.length-1))];
                            break;
                        case "out":
                            chosenRoom = "TBA";
                            break;
                        default:
                            chosenRoom = "TBA"
                            break;
                    }
                    timeSlot = time[Math.floor(Math.random()*(time.length-11))].slot;
                    startTime = time.find(slot=>slot.slot==timeSlot);
                    endTime = time.find(slot=>slot.slot==(timeSlot+subject.duration));
                    sectionLevelSched.push({section:section,day:day,professor:chosenProfessor,subjName:subject.subjName,room:chosenRoom, startTime:startTime.value,endTime:endTime.value});
                    // Remarks
                    // Algo still appends classes with undefined professors - needs to be fixed
                    // Algo needs to group each population (4 sections per population)
                });
            }
            overAllSched.push(sectionLevelSched);
        }
        initialPopulation.push(overAllSched);
    }

    return initialPopulation;
}

const fitnessFunction = () => {

}

const crossOverFunction = () => {

}

const mutationFunction = () => {

}



