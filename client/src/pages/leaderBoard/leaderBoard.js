import axios from "axios";
import { useEffect, useState } from "react";
import RankingsDiv from "../../components/leaderboardFeatures/rankingsDiv";
import { Table } from "react-bootstrap";


function LeaderBoard(){
    let [usersRanked, setRankings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() =>{

        axios.get('http://localhost:3001/api/users/userRankings')
                .then((rankings) => setRankings(rankings.data))
                .catch(error => console.log(error))
                .finally(() => setLoading(false))

    },[])

    if(loading) return <h1>Loading...</h1>

    console.log(usersRanked)

    return (
        <>
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
                    <th>PCT</th>
                    </tr>
                    {usersRanked.map((user, index) =>{
                        return <RankingsDiv key={index} user={user} rank={index + 1}/>
                    })}
                </thead>
            </Table>
            
        
        </>
    )
}

export default LeaderBoard;