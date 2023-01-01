export const GanttChart = ({ ganttChartInfo }) => {
  return (
    <>
      <p style={{color:'#ff1e00'}}className="mb-2 font-bold font-noto text-xl text-500">Gantt Chart:</p>
      <div className="flex flex-wrap">
        {ganttChartInfo.map((ele, i) => (
          <div key={ele+i} style={{backgroundColor:'#59ce8f'}}className="relative px-4 py-2 bg-500 mr-2 mb-6 font-bold  font-noto text-sm text-white">
            {ele.pID}
            <p className="absolute -bottom-5 left-0 text-xs text-black antialiased lining-nums">
              {ele.start}
            </p>
            <p className="absolute -bottom-5 right-0 text-xs text-black antialiased lining-nums">
              {ele.stop}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};
