import axios from "axios";
import { useContext, useEffect, useState } from "react";
import RankingsDiv from "../../components/leaderboardFeatures/rankingsDiv";
import Table from 'react-bootstrap/Table';
import './leaderBoard.css'
import { ThemeContext } from "../../util/themeContext/themeContext";


function LeaderBoard(){
    let [usersRanked, setRankings] = useState([]);
    const [loading, setLoading] = useState(true);
    const {darkMode} = useContext(ThemeContext)

    useEffect(() =>{

        axios.get(process.env.REACT_APP_API_URL + 'users/userRankings')
                .then((rankings) => setRankings(rankings.data))
                .catch(error => console.log(error))
                .finally(() => setLoading(false))

    },[])

    if(loading) return <h1>Loading...</h1>

   

    return (
        <>  
            <div className="leaderboard-container" id={darkMode ? "dark" : ''}>
                <h1>Rankings</h1>

                <Table striped>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Win</th>
                        <th>Loss</th>
                        <th>Live</th>
                        
                        </tr>
                        {usersRanked.map((user, index) =>{
                            return <RankingsDiv key={index} user={user} rank={index + 1}/>
                        })}
                    </thead>
                </Table>
            </div>
                    
        </>
    )
}

export default LeaderBoard;