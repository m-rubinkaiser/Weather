import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

function chart(data){
    const weather = data.data;
    return(
      <>
        <ResponsiveContainer className={chart} width="100%" height={300}>
      <AreaChart
        data={weather}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="hour" axisLine={false} tickLine={false}/>
        {/* <YAxis /> */}
        <Tooltip />
        <Area type="monotone" dataKey="temp_f" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
        <Area type="monotone" dataKey="wind" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
      </AreaChart>
      </ResponsiveContainer>
      </>
    )

}

export default chart;