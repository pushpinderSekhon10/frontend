import './styles/VCard.css';
import {useEffect, useState} from 'react';
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import LineChart from './charts/LineChart.js';

Chart.register(CategoryScale);

function VCard({onClose, url}){
    const [chartData, setChartData] = useState({
        lables: [],
        datasets: []
    })
    useEffect( () => {
        console.log("VCARD useEffect called ")

        async function getData() {

            const response =  await fetch(`http://localhost:3000/proxy?url=${encodeURIComponent(url)}`);
            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                console.log(message);
                return;
              }
            const urlData = await response.json();
            //console.log(urlData)
            console.log(urlData.observations)
            console.log(Array.isArray(urlData.observations))

            setChartData(prev  => ({
                ...prev,

                labels: urlData.observations.map(observation => observation.date ),
                datasets:[{
                    data: urlData.observations.map(observation => observation.value),
                    borderWidth: 2
                }]
            }))
        }
        getData()
    },[url])
    
    return (
        <section className="Card">
            <h2 className="country">CANADA</h2>
            <div className="cline"></div>

            
            <LineChart cData={chartData}/>
            

            <section className="infoTab">
                <div>
                <h3 className="infoTitle">Real GDP</h3>
                <p>1.907 </p>
                <p>1.907</p>
                <p>1.907</p>
                </div>

                <div>
                <h3 className="infoTitle">Real GDP</h3>
                <p>1.907 </p>
                <p>1.907</p>
                <p>1.907</p>
                </div>

                <div>
                <h3 className="infoTitle">Real GDP</h3>
                <p>1.907 </p>
                <p>1.907</p>
                <p>1.907</p>
                </div>
            </section>

            <div className="btnRow">
                <button className="graphBtn">Annual</button>
                <button className="graphBtn">$US</button>
                <button className="graphBtn">Inflation</button>
            </div>

        </section>
    )
} 

export default VCard;