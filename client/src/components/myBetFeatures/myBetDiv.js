import './myBetDiv.css'
import { Badge } from 'react-bootstrap';

function MyBetDiv({betData, userId}){
    let {winner, sender, receiver, condition, reward, paidOut} = betData
    let status = winner == userId? 'green':'red'; 
    
    return(<>
        <a href={`/bet-details/${betData._id}`}>
        {!paidOut && userId == winner? 
        
        <Badge pill bg="danger">Unpaid</Badge>:  null
                
            }
        <div className={`myBets ${status}`}>
            
       
            <div>
                <h3>{winner == userId? 'W' : 'L' }</h3>
                <h3>vs.</h3>
            </div>
            
            <div> 
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                </svg>
                <h3>{userId == sender._id? receiver.username: sender.username}</h3>
                
            </div>
            <div className='text'>
                    <p>{condition}</p>
                    <p>Stake: {reward}</p>
            </div>
            
        </div>
        </a>
    </>)

}

export default MyBetDiv;