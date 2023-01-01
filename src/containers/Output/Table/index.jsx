import { Row } from "./Row";



export const Table = ({ data , algorithm}) => {
  const header = {
    pID: "Process ID",
    aT: "Arrival Time",
    bT: "Burst Time",
    ft: "Completion Time",
    tat: "Turn around Time",
    wt: "Waiting Time",
  };
  return (

    <div className="mt-4 overflow-auto">
      <p  style={{color:'#ff1e00'}}className="mb-2 font-bold font-noto text-lg ">
        {(()=>
        { 
          if (algorithm === "First Come First Serve, FCFS") 
            { return (<span>FCFS</span> )}
          else if (algorithm === "Shortest Job First, SJF")
           { return (<span>SJF</span> )}
          else if (algorithm ==="Shortest Job First, SJF (P)")
          { return (<span>SJF-Preemptive</span> )}
          else if (algorithm === "Priority Scheduling")
          { return (<span>Priority</span> )}
            else
            { return (<span>RR</span> )}
        }
       ) ()} Table: 
      </p>
      <div className="mb-2">
        <Row data={header} />
      </div>
      {data.map((row, i) => (
        <Row key={row.pID+i} data={row} />
      ))}
    </div>
  );
};
