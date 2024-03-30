//Genetic Algorithm
const populationSize = 100
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
                        fisherYatesShuffler(unassignedSubjects.filter(subject=>subject.session!="async").filter(subject=>subject.professor.employmentType=="part-time").filter(subject=>subject.professor.availability.includes(day))).forEach(subject => { // loop through each shuffled non-async subjects
                            if(schoolHours<schoolHourTolerance){
                                if(subject.session=="sync"){
                                    chosenRoom = "-"
                                }
                                else{
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
                                }

                                timeSlot = time[Math.floor(Math.random()*(time.length-11))].slot;
                                startTime = time.find(slot=>slot.slot==timeSlot);
                                endTime = time.find(slot=>slot.slot==(timeSlot+subject.duration));
                                sectionLevelSched.push({subjCode:subject.subjCode,subjName:subject.subjName,section:section,day:day,professor:subject.professor,session:subject.session,room:chosenRoom, startTime:startTime,endTime:endTime});
                                subject.assigned = true;
                                schoolHours = schoolHours+subject.duration;
                            }
                        });
                        fisherYatesShuffler(unassignedSubjects.filter(subject=>subject.session!="async").filter(subject=>subject.professor.availability.includes(day)).filter(subject=>subject.professor.employmentType=="full-time")).forEach(subject => { // loop through each shuffled non-async subjects
                            if(schoolHours<schoolHourTolerance){
                                if(subject.session=="sync"){
                                    chosenRoom = "-"
                                }
                                else{
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
                                }
                                timeSlot = time[Math.floor(Math.random()*(time.length-11))].slot;
                                startTime = time.find(slot=>slot.slot==timeSlot);
                                endTime = time.find(slot=>slot.slot==(timeSlot+subject.duration));
                                sectionLevelSched.push({subjCode:subject.subjCode,subjName:subject.subjName,section:section,day:day,professor:subject.professor,session:subject.session,room:chosenRoom, startTime:startTime,endTime:endTime});
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
                                sectionLevelSched.push({subjCode:subject.subjCode,subjName:subject.subjName,section:section,day:day,professor:subject.professor,session:subject.session,room:chosenRoom, startTime:startTime,endTime:endTime});
                                subject.assigned = true;
                                schoolHours = schoolHours+subject.duration;
                            }
                        });
                    }
                }
                overAllSched.push(sectionLevelSched);
            }
        }
        // console.log(fitnessFunction(overAllSched));
        initialPopulation.push(fitnessFunction(overAllSched));
    }
    return initialPopulation;
}

const fitnessFunction = (scheduleArray) => {     //this funtion evaulates the fitness of a single generated schedule
    //TO-DO
    //create evaluation criterias that will determine the fitness of a generated schedule (lower accumulated points is better)
    //criterias:
        //NSTP classes should be on Saturdays (+3 points)
        //No two or more classes of share the same classroom at the same time (+1 points)
        //No two or more classes of share the same professor at the same time (+1 points)
        //No two or more classes schedule of the same section share or has overlapping room and/or time slot (+2 points)

    //this function should assign whether a single class is considered recessive or dominant
        //recessive traits are less likely to be used for crossovers but is more likely to mutate ro reroll some favorable properties
        //dominant trains are more likely to be used for crossovers but is less likely to mutate ro reroll some favorable properties
    let evaluatedSchedule;      //an array that holds a variable for the fitness evaluation and the schedule that is being evaluated
    let conflictingTimeSlot=0;    //a variable that is incremented if there are conflicting time slots
    let conflictingRooms=0;       //a variable that is incremented if there are conflicting rooms
    let conflictingProfessor=0;   //a variable that is incremented if there are professors that are needed be 2 or more different classes at the same time
    let weekDayNSTP=0;            //a variable that is incremented if there are NSTP Classes on weekdays
    let traitVar;               //a variable that holds a value whether a class is dominant or recessive
    let maximumOopsiePoints=0;         //a variable that contains the maximum number of negative points that a schedule can have
    let totalOopsiePoints=0;           //a variable that contains the accumulated number of negative points  of a schedule
    let oopsiePoints=0          //a variable to track a class' oopsie
    let spreadedClasses=[];        //an array that holds the spreaded classes of each section. i.e. the classes will no longer be grouped per section
    scheduleArray.forEach(section=>{
        spreadedClasses.push(...section);
    });
    //TO-DO
    //calculate maximum oopsies
    //count the number of classes that are NSTP
    //count the number of classes that are not NSTP
    const nstpClassCount = spreadedClasses.filter(selectedClass=> selectedClass.subjCode=="NSTP1" || selectedClass.subjCode=="NSTP2").length;
    const nonNSTPClassCount = spreadedClasses.filter(selectedClass=> selectedClass.subjCode!="NSTP1" && selectedClass.subjCode!="NSTP2").length;
    maximumOopsiePoints = (nstpClassCount*100)+(nonNSTPClassCount*60);

    for(let currentClassIndex = 0; currentClassIndex< spreadedClasses.length; currentClassIndex++){ //loop through all subjects to assign a default trait value of "dominant"
        spreadedClasses[currentClassIndex].trait = "dominant";
    }

    for(let currentClassIndex = 0; currentClassIndex< spreadedClasses.filter(selectedClass=>selectedClass.trait=="dominant").length-1; currentClassIndex++){

        for(let comparedToIndex = currentClassIndex+1; comparedToIndex<spreadedClasses.length;comparedToIndex++){
            //check time conflict
            if(spreadedClasses[currentClassIndex].day == spreadedClasses[comparedToIndex].day && (spreadedClasses[currentClassIndex].startTime.slot>=spreadedClasses[comparedToIndex].startTime.slot && spreadedClasses[currentClassIndex].endTime.slot<spreadedClasses[comparedToIndex].endTime.slot)){
                conflictingTimeSlot += 20;
                spreadedClasses[currentClassIndex].trait = "recessive";
                spreadedClasses[comparedToIndex].trait = "recessive"
            }

            //check professor conflict
            if(spreadedClasses[currentClassIndex].professor.name == spreadedClasses[comparedToIndex].professor.name && spreadedClasses[currentClassIndex].day == spreadedClasses[comparedToIndex].day && (spreadedClasses[currentClassIndex].startTime.slot>=spreadedClasses[comparedToIndex].startTime.slot && spreadedClasses[currentClassIndex].endTime.slot<spreadedClasses[comparedToIndex].endTime.slot)){
                conflictingProfessor += 30;
                spreadedClasses[currentClassIndex].trait = "recessive";
                spreadedClasses[comparedToIndex].trait = "recessive"
            }

            //check room conflict
            if(spreadedClasses[currentClassIndex].day == spreadedClasses[comparedToIndex].day && (spreadedClasses[currentClassIndex].session == "f2f" && spreadedClasses[comparedToIndex].session == "f2f") && spreadedClasses[currentClassIndex].room == spreadedClasses[comparedToIndex].room && (spreadedClasses[currentClassIndex].startTime.slot>=spreadedClasses[comparedToIndex].startTime.slot && spreadedClasses[currentClassIndex].endTime.slot<spreadedClasses[comparedToIndex].endTime.slot)){
                conflictingRooms += 10;
                spreadedClasses[currentClassIndex].trait = "recessive";
                spreadedClasses[comparedToIndex].trait = "recessive"
            }
        }
    }

    for(let currentClassIndex = 0; currentClassIndex< spreadedClasses.length; currentClassIndex++){ //loop through all subjects to search for an NSTP Subject
        //check if NSTP is on a weekday
        if(spreadedClasses[currentClassIndex].subjCode == "NSTP1" || spreadedClasses[currentClassIndex].subjCode == "NSTP2" && spreadedClasses[currentClassIndex].day!="saturday"){
            weekDayNSTP += 100;
            spreadedClasses[currentClassIndex].trait = "recessive";
        }
    }
    const recessiveCount = spreadedClasses.filter(selectedClass=>selectedClass.trait=="recessive").length;
    totalOopsiePoints = conflictingProfessor + conflictingRooms + conflictingTimeSlot + weekDayNSTP;
    evaluatedSchedule = (1/(1+(totalOopsiePoints/maximumOopsiePoints)))
    // evaluatedSchedule = (1/(1+(totalOopsiePoints)))
    console.log(`Classes Count: ${spreadedClasses.length}, total oopsies: ${totalOopsiePoints}, maximum oopsies: ${maximumOopsiePoints}, NSTP Classes: ${nstpClassCount}, non-NSTP Classes ${nonNSTPClassCount}`);
    console.log(`Fitness: ${evaluatedSchedule*100}%, No. of recessive traits: ${recessiveCount}`);
    return {fitness:evaluatedSchedule, schedule:spreadedClasses};
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