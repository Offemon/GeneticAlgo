//Genetic Algorithm
const populationSize = 1000
const sections = [["11M1","11A1"],["21M1","21A1"],["31A1"],["41E1"]]
let days = ["monday","tuesday","wednesday","thursday","friday","saturday"]


const initializePopulation = (sections) => {
    let initialPopulation = [];                                     //this is an array of all generated initial schedules for GA
    let overAllSched;                                               //An array that holds a single generated schedule from first year to fourth year
    const roomsToBeUsed = new Rooms(rooms);                         //a variable for the room object
    const professorsToBeAssigned = new Professors(professors);      //avariable for the professors object
    const levels = ["1st_year","2nd_year","3rd_year","4th_year"];   //an array for all available levels
for(let i = 0; i < populationSize; i++){                            //loops for nth number of times depending on the value of the populationSize constant
        overAllSched = [];
        //TO-DO
        //create a foreach loop for every course - I still dont have a BSIT Curriculum
            //create a foreach loop for every level - RESOLVED

        for(let l = 0; l<levels.length;l++){                                                            //loop that goes through each level in the levels array
            const subjects = curriculum[0].contents.find(content=>content.level==levels[l]).firstSem;   //this line needs to be refactored
            for (let j = 0; j < sections[l].length ; j++){                                              //loop that goes through each section
                let sectionLevelSched = [];         //an array that holds multiple classes for a section
                let prepdSubjects = subjectSessionPrep(assignProfToSubject(professorsToBeAssigned,subjects));
                days = fisherYatesShuffler(days);
                for(let k = 0; k<days.length;k++){  //loop through the days of the week
                    let day = days[k];              //variable that holds the current day of the week
                    let section = sections[l][j]    //variable that holds the current section
                    let schoolHourTolerance = 8;    //variable that holds the maximum number of hours that a section can have per day
                    let schoolHours=0;              //variable that holds the initial value of hours
                    let unassignedSubjects = prepdSubjects.filter(subject=>subject.assigned===false);   //an array of unassigned subjects
                    if(schoolHours<schoolHourTolerance){
                        let chosenRoom;             //variable that holds the chosen room for a section's subject
                        let timeSlot;               //variable that holds a timeslot for a section's subject
                        let startTime;              //variable that holds a start time value for a section's subject
                        let endTime;                //variable that holds a end time value for a section's subject
                        //TO-DO
                        //Fix subjects with professors that are only available every saturday kept being contested and end up not being assigned - RESOLVED!
                        fisherYatesShuffler(unassignedSubjects.filter(subject=>subject.session!="async").filter(subject=>subject.professor.availability.includes(day)).filter(subject=>subject.professor.employmentType=="part-time")).forEach(subject => { // loop through each shuffled non-async subjects
                            if(schoolHours<schoolHourTolerance){
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
                                sectionLevelSched.push({section:section,day:day,professor:subject.professor,session:subject.session,subjName:subject.subjName,room:chosenRoom, startTime:startTime.value,endTime:endTime.value});
                                subject.assigned = true;
                                schoolHours = schoolHours+subject.duration;
                            }
                        });
                        fisherYatesShuffler(unassignedSubjects.filter(subject=>subject.session!="async").filter(subject=>subject.professor.availability.includes(day)).filter(subject=>subject.professor.employmentType=="full-time")).forEach(subject => { // loop through each shuffled non-async subjects
                            if(schoolHours<schoolHourTolerance){
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
                                sectionLevelSched.push({section:section,day:day,professor:subject.professor,session:subject.session,subjName:subject.subjName,room:chosenRoom, startTime:startTime.value,endTime:endTime.value});
                                subject.assigned = true;
                                schoolHours = schoolHours+subject.duration;
                            }
                        });
                        fisherYatesShuffler(unassignedSubjects.filter(subject=>subject.session=="async")).forEach(subject => { // loop through each shuffled async subjects
                            if(schoolHours<schoolHourTolerance){
                                chosenRoom = "-"
                                timeSlot = time[Math.floor(Math.random()*(time.length-11))].slot;
                                startTime = time.find(slot=>slot.slot==timeSlot);
                                endTime = time.find(slot=>slot.slot==(timeSlot+subject.duration));
                                sectionLevelSched.push({section:section,day:day,professor:subject.professor,session:subject.session,subjName:subject.subjName,room:chosenRoom, startTime:startTime.value,endTime:endTime.value});
                                subject.assigned = true;
                                schoolHours = schoolHours+subject.duration;
                            }
                        });
                    }
                }
                overAllSched.push(sectionLevelSched);
            }
        }
        initialPopulation.push(overAllSched);
    }
    return initialPopulation;
}

const fitnessFunction = () => {     //this funtion evaulates the fitness of a single generated schedule

}

const crossOverFunction = () => {   //this function splices the genomes of the best schedule - 2 at a time

}

const mutationFunction = () => {    //this function enables a schedule to reroll some of it's genomes

}


//non-GA functions section
const fisherYatesShuffler = (array) => {                        //a function that uses Fisher-Yates algorithm to shuffle an array
    for (let i = array.length-1; i> 0; i--){
        const randomIndex = Math.floor(Math.random()*(i+1));
        [array[i],array[randomIndex]]=[array[randomIndex],array[i]]
    }
    return array;
}

const subjectSessionPrep = (subjectArray) => {                  //a function that attaches an assignment variable and session property based on its classType
    let newsubjectArray = [];
    subjectArray.forEach(subject=>{

        duration = subject.duration
        subject.assigned = false;

        if(subject.classType==="lec"){
            subject.duration = 1.5;
            newsubjectArray.push({...subject,session:"sync"});
            newsubjectArray.push({...subject,session:"async"});
        }
        else if(subject.classType==="lab"){
            newsubjectArray.push({...subject,session:"f2f",duration:3});
            newsubjectArray.push({...subject,session:"async",duration:1.5});
        }
        else{
            newsubjectArray.push({...subject,session:"f2f",duration:3});
        }
    })
    return newsubjectArray;
}

const addProfessorDailyLoad = (professorsArray) => {            //a function that attaches a variable to hold the number of time that a professor can spend per day and a variable to hold a priority value
    let newProfessorArray = [];
    professorsArray.forEach(professor=>{
        newProfessorArray.push({...professor,dailyHours:0,priority:1});
    })
    return newProfessorArray
}

const assignProfToSubject = (professorsObj,subjArray) => {      //a function that assigns a professor to a subject based on the expertise requirement of the subject
    let newSubjArr = []
    subjArray.forEach(subject=>{
        let chosenProf
        let professorForThisSubject = professorsObj.getByExpertise(subject.expertiseReq).professors;
        let partTimeProfs = professorForThisSubject.filter(prof => prof.employmentType === "part-time");
        let fullTimeProfs = professorForThisSubject.filter(prof => prof.employmentType === "full-time");
        if(partTimeProfs.length >=1){
            chosenProf = partTimeProfs[Math.floor(Math.random()*(partTimeProfs.length-1))];
            newSubjArr.push({...subject,professor:chosenProf});
        }
        else{
            chosenProf = fullTimeProfs[Math.floor(Math.random()*(fullTimeProfs.length-1))];
            newSubjArr.push({...subject,professor:chosenProf});
        }
    })
    return newSubjArr
}