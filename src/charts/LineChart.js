import { Line } from "react-chartjs-2";
import "../styles/LineChart.css";

function LineChart ({cData}) {


    return (
        <div className="chart-container">
        <Line
            data={cData}

            options={{
                plugins: {

                    title: {
                        display: true,
                        text: "GDP in US Dollars"
                    },

                    legend: {
                        display: false
                    }
                },

                scales: {
                    y: {
                        beginAtZero: false
                    }
                },

                maintainAspectRatio: false
            }}
      />    
    </div>
    )
}

export default LineChart;