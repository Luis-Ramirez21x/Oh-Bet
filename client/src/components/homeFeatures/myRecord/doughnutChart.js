
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

function DoughtNutChart({recordData}){

   

    return(
        <>
            <Doughnut data={ 
                {
                    labels: ['Win', 'Loss'],
                    datasets: [
                      {
                        id:1,
                        label: 'Win/Loss',
                        data: [recordData.win, recordData.loss],
                        backgroundColor: [
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 99, 132, 0.2)',
                            
                          ],
                      },
                      
                    ],

                  }
            } 
           
            />
        
        </>
    )

}

export default DoughtNutChart;