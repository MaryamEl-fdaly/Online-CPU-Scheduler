// First Come First Serve Algorithm
export const FCFS = (arrivalTime, burstTime) => {
  let completeTime = []; 
  let ganttChartInfo = []; 
  let totalTurnAroundT = 0;
  let totalWaitingT = 0; 
  const calcProcesses = [];

//array that has processID, arrival time, and burst time for each process sorted by arrival time
  const processes = arrivalTime
    .map((ele, i) => ({
      pID: "P" + i,
      aT: ele,
      bT: burstTime[i],
    }))
    .sort((ele1, ele2) => ele1.aTime - ele2.aTime);


 //loop over processes
  let i=0;
  while(i < processes.length)
  {
    const process = processes[i];
    let startTime;
    // if first process or the arrival time is after the last process finish,then the start time is the arrival time
    if (i === 0 || process.aT > completeTime[i - 1]) {
      startTime = process.aT;
      completeTime[i] = process.aT + process.bT;
    } else {
      startTime = completeTime[i - 1];
      completeTime[i] = completeTime[i - 1] + process.bT;
    }


    // draw Gantt chart for calcProcesses process
    ganttChartInfo.push({
      pID: process.pID,
      start: startTime,
      stop: completeTime[i],
    });

    const ft = completeTime[i];//finish time
    const tat = ft - process.aT;//turn around time
    const wt = ft - process.aT - process.bT;//waiting time

    // accumulate new calcProcesses value to total
    totalTurnAroundT += tat;
    totalWaitingT += wt;

    calcProcesses.push({
      ...process,
      ft,
      tat,
      wt,
    });

    i++; //incrementing index
  }

  // calculating avg by dividing total by array length
  const avgTurnAroundT = totalTurnAroundT / processes.length;
  const avgWaitingT = totalWaitingT / processes.length;

  return { calcProcesses, ganttChartInfo, avgTurnAroundT, avgWaitingT };
};

