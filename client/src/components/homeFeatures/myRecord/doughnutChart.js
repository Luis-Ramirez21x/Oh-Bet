
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip);


function DoughtNutChart({recordData}){
    
   if(recordData.win == 0 && recordData.loss == 0){
        return(
            <>
                <Doughnut data={ 
                    {
                        labels: ['W/L'],
                        datasets: [
                        {
                            id:1,
                            label: 'Win/Loss',
                            data: [1],
                            backgroundColor: [
                                
                                'rgba(189, 195, 199)',
                                
                            ],
                        },
                        
                        ],

                    }
                } 
            
                />
            
            </>
        )
   }

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
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(255, 99, 132, 0.2)',
                            
                          ],
                          borderColor:[
                            'rgba(75, 192, 192, 1)',
                            'rgba(255, 99, 132, 1)',
                          ]
                      },
                      
                    ],

                  }
            } 
           
            />
        
        </>
    )

}

export default DoughtNutChart;