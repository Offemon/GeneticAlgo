//Genetic Algorithm
const populationSize = 10
const sections = [["11M1","11A1"],["21M1","21A1"],["31A1"],["41E1"]]
let days = ["monday","tuesday","wednesday","thursday","friday","saturday"]


const initializePopulation = (sections) => {
    let initialPopulation = [];
    let overAllSched;
    // const subjects = curriculum[0].contents.find(content=>content.level=="1st_year").firstSem;
    const roomsToBeUsed = new Rooms(rooms);
    const professorsToBeAssigned = new Professors(professors);
    const levels = ["1st_year","2nd_year","3rd_year","4th_year"];
    // console.log(addProfessorDailyLoad((new Professors(professors)).professors));
    for(let i = 0; i < populationSize; i++){ // generate an initial population of 50
        overAllSched = [];
        //TO-DO
        //create a foreach loop for every course
            //create a foreach loop for every level
        for(let l = 0; l<levels.length;l++){
            const subjects = curriculum[0].contents.find(content=>content.level==levels[l]).firstSem;
            for (let j = 0; j < sections[l].length ; j++){ //generate a monday to saturday sched for each section
                let sectionLevelSched = [];
                let prepdSubjects = subjectSessionPrep(assignProfToSubject(professorsToBeAssigned,subjects));
                days = fisherYatesShuffler(days);
                for(let k = 0; k<days.length;k++){  //loop through the days of the week
                    let day = days[k];
                    let section = sections[l][j]
                    let schoolHourTolerance = 8;
                    let schoolHours=0;
                    let unassignedSubjects = prepdSubjects.filter(subject=>subject.assigned===false);
    
                    if(schoolHours<schoolHourTolerance){
                        //TO-DO
                        //Fix subjects with professors that are only available every saturday kept being contested and end up not being assigned
                        fisherYatesShuffler(unassignedSubjects.filter(subject=>subject.session!="async").filter(subject=>subject.professor.availability.includes(day)).filter(subject=>subject.professor.employmentType=="part-time")).forEach(subject => { // loop through each shuffled non-async subjects
                            if(schoolHours<schoolHourTolerance){
                                let chosenRoom;
                                let timeSlot;
                                let startTime;
                                let endTime;
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
                                let chosenRoom;
                                let timeSlot;
                                let startTime;
                                let endTime;
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
                                let chosenRoom;
                                let timeSlot;
                                let startTime;
                                let endTime;
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

const fitnessFunction = () => {

}

const crossOverFunction = () => {

}

const mutationFunction = () => {

}


//non-GA functions section
const fisherYatesShuffler = (array) => {
    for (let i = array.length-1; i> 0; i--){
        const randomIndex = Math.floor(Math.random()*(i+1));
        [array[i],array[randomIndex]]=[array[randomIndex],array[i]]
    }
    return array;
}

const subjectSessionPrep = (subjectArray) => {
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

const addProfessorDailyLoad = (professorsArray) => {
    let newProfessorArray = [];
    professorsArray.forEach(professor=>{
        newProfessorArray.push({...professor,dailyHours:0,priority:1});
    })
    return newProfessorArray
}

const assignProfToSubject = (professorsObj,subjArray) => {
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