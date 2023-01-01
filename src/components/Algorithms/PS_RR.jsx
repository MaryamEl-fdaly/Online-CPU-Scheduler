// Priority Scheduling Algorithm
export const PS = (arrivalTime, burstTime, priorities) => {
  const calcProcesses = [];
  const readyQ = [];
  const doneJobs = [];
  let processes = [];
  let fTime = [];
  let ganttChartInfo = [];
  let totalTurnAroundT = 0,totalWaitingT = 0,tatV = 0, wtV = 0, i=0,j=0;

//array that has processID, arrival time, burst time and priority for each process sorted by arrival time
  while(i < arrivalTime.length){
    processes.push({
      pID: "P" + i,
      aT: arrivalTime[i],
      bT: burstTime[i],
      priority: priorities[i],
    });
    i++;
  }
  
  //sort processes according to priority and arrival time
  processes.sort((ele1, ele2) => {
    if (ele1.aT > ele2.aT) {
      return 1;
    } else if (ele1.aT < ele2.aT) {
      return -1;
    } else if (ele1.priority > ele2.priority) {
        return 1;
      } else if (ele1.priority < ele2.priority) {
        return -1;
      } else {
        return 0;
      }
    });


  readyQ.push(processes[0]);
  fTime.push(processes[0].bT + processes[0].aT);
  tatV = fTime[0] - processes[0].aT;
  wtV = fTime[0] - processes[0].aT - processes[0].bT;
  totalTurnAroundT += tatV;
  totalWaitingT += wtV;

  calcProcesses.push({
    ...processes[0],
    ft: fTime[0],
    tat: tatV,
    wt: wtV,
  });

  while(j < processes.length) {
    if (processes[j].aT <= fTime[0] && !readyQ.includes(processes[j])) {
      readyQ.push(processes[j]);
    }
    j++;
  }

  readyQ.shift();
  doneJobs.push(processes[0]);

  ganttChartInfo.push({
    pID: processes[0].pID,
    start: processes[0].aT,
    stop: fTime[0],
  });

  for (let i = 1; i < processes.length; i++) {
    if (readyQ.length === 0 && doneJobs.length !== processes.length) {
      const undoneJobs = processes
        .filter((p) => {
          return !doneJobs.includes(p);
        })
        .sort((ele1, ele2) => {
          if(ele1.aT > ele2.aT)
          return 1;
          else if(ele1.aT < ele2.aT)
          return -1;
          else if( ele1.priority > ele2.priority)
          return 1;
          else if(ele1.priority < ele2.priority)
          return -1;
          else 
          return 0;
        });
      readyQ.push(undoneJobs[0]);
    }

  

    // Equal-priority processes are scheduled in FCFS order.
    const readyQsorted_pr = [...readyQ].sort((ele1, ele2) => {
      if (ele1.priority > ele2.priority) {
        return 1;
      } else if (ele1.priority < ele2.priority) {
        return -1;
      } else if (ele1.aT > ele2.aT) {
          return 1;
        } else if (ele1.aT < ele2.aT) {
          return -1;
        } else {
          return 0;
        }
       
    });

    const execProcess = readyQsorted_pr[0];
    const prevfTime = fTime[fTime.length - 1];

    if (execProcess.aT > prevfTime) {
      fTime.push(execProcess.aT + execProcess.bT);
      const latestFtime = fTime[fTime.length - 1];
      ganttChartInfo.push({
        pID: execProcess.pID,
        start: execProcess.aT,
        stop: latestFtime,
      });
    } else {
      fTime.push(prevfTime + execProcess.bT);
      const latestFtime = fTime[fTime.length - 1];
      ganttChartInfo.push({
        pID: execProcess.pID,
        start: prevfTime,
        stop: latestFtime,
      });
    }

    const latestFtime = fTime[fTime.length - 1];

    tatV = latestFtime - execProcess.aT;
    wtV = latestFtime - execProcess.aT - execProcess.bT;


    calcProcesses.push({
      ...execProcess,
      ft: latestFtime,//comleteing time
      tat: tatV,//turn around time
      wt: wtV,//waiting time
    });

    //accumulate to total
    totalTurnAroundT += tatV;
    totalWaitingT += wtV;

    for (let i = 0; i < processes.length; i++) {
      if (
        processes[i].aT <= latestFtime &&
        !readyQ.includes(processes[i]) &&
        !doneJobs.includes(processes[i])
      ) {
        readyQ.push(processes[i]);
      }
    }

    const indexToRemove = readyQ.indexOf(execProcess);
    if (indexToRemove > -1) {
      readyQ.splice(indexToRemove, 1);
    }

    doneJobs.push(execProcess);
  }

  // Sort the processes by arrival time
  calcProcesses.sort((ele1, ele2) => {
    if (ele1.aT > ele2.aT) {
      return 1;
    } else if (ele1.aT < ele2.aT) {
      return -1;
    } else if (ele1.pID > ele2.pID) {
        return 1;
      } else if (ele1.pID < ele2.pID) {
        return -1;
      } else {
        return 0;
      }
    
  });

  // Calculating avy by dividing total by array length
  const avgTurnAroundT = totalTurnAroundT / arrivalTime.length;
  const avgWaitingT = totalWaitingT / arrivalTime.length;

  return { calcProcesses, ganttChartInfo, avgTurnAroundT, avgWaitingT };
};



/********************************************************************************************************************/
/******************* Round Robin Algorithm***************/

export const RR = (arrivalTime, burstTime, timeQuantum) => {
  
  const readyQ = [];
  const calcProcesses = [];
  const ganttChartInfo = [];
  let totalTurnAroundT = 0,totalWaitingT = 0, tatV = 0,wtV = 0;
  
  
  const processes = arrivalTime
    .map((ele, i) => ({
      pID: "P" + i, // generate pID identifier
      aT: ele,
      bT: burstTime[i],
    }))
    .sort((ele1, ele2) => ele1.aT - ele2.aT);

  let currTime = processes[0].aT;
  const unfinshedJobs = [...processes];

  const remT = processes.reduce((acc, process) => {
    acc[process.pID] = process.bT;
    return acc;
  }, {});

  readyQ.push(unfinshedJobs[0]);
  
  while (true) {
    if (
      !Object.values(remT).reduce((acc, cur) => {
        return acc + cur;
      }, 0) ||
      !unfinshedJobs.length > 0
    )
      break;
    if (readyQ.length === 0 && unfinshedJobs.length > 0) {
      readyQ.push(unfinshedJobs[0]);
      currTime = readyQ[0].aT;
    }

    const execProcess = readyQ[0];

    if (timeQuantum >= remT[execProcess.pID]) {
      const remainingT = remT[execProcess.pID];
      remT[execProcess.pID] -= remainingT;
      const prevTime = currTime;
      currTime += remainingT;

      ganttChartInfo.push({
        pID: execProcess.pID,
        start: prevTime,
        stop: currTime,
      });
    } else {
      remT[execProcess.pID] -= timeQuantum;
      const prevTime = currTime;
      currTime += timeQuantum;

      //draw Gantt chart for finished process
      ganttChartInfo.push({
        pID: execProcess.pID,
        start: prevTime,
        stop: currTime,
      });
    }

    // eslint-disable-next-line no-loop-func
    const processToCyc = processes.filter((p) => {
      return (
        p.aT <= currTime &&
        p !== execProcess &&
        !readyQ.includes(p) &&
        unfinshedJobs.includes(p)
      );
    });

    // Push new processes to readyQ
    readyQ.push(...processToCyc);

    // move head item to tail
    readyQ.push(readyQ.shift());

    if (remT[execProcess.pID] === 0) {
      const indexToRemoveUJ = unfinshedJobs.indexOf(execProcess);
      if (indexToRemoveUJ > -1) {
        unfinshedJobs.splice(indexToRemoveUJ, 1);
      }
      const indexToRemoveRQ = readyQ.indexOf(execProcess);
      if (indexToRemoveRQ > -1) {
        readyQ.splice(indexToRemoveRQ, 1);
      }

      //calculate turn and waiting time
      tatV = currTime - execProcess.aT;
      wtV = currTime - execProcess.aT - execProcess.bT;

      calcProcesses.push({
        ...execProcess,
        ft: currTime,
        tat: tatV,
        wt: wtV,
      });

      //accumulate to total
      totalTurnAroundT += tatV;
      totalWaitingT += wtV;
    }
  }

  // Sort the processes arrival time and then by job name
  calcProcesses.sort((ele1, ele2) => {
    if (ele1.aT > ele2.aT) {
      return 1;
    } else if (ele1.aT < ele2.aT) {
      return -1;
    } else if (ele1.pID > ele2.pID) {
        return 1;
      } else if (ele1.pID < ele2.pID) {
        return -1;
      } else {
        return 0;
      }
  
  });

  // Calculating avy by dividing total by array length
  const avgTurnAroundT = totalTurnAroundT / arrivalTime.length;
  const avgWaitingT = totalWaitingT / arrivalTime.length;

  return { calcProcesses, ganttChartInfo, avgTurnAroundT, avgWaitingT };
};
