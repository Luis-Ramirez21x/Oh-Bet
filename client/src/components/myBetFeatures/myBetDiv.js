import './myBetDiv.css'
import { Badge } from 'react-bootstrap';

function MyBetDiv({betData, userId}){
    let {winner, sender, receiver, condition, reward, paidOut} = betData
    let status = winner === userId? 'win':'loss'; 
    
    return(<>
        <div className='log-containers'>
            <a href={`/bet-details/${betData._id}`}>
            {!paidOut && userId == winner? 
            
            <Badge pill bg="danger" className='paid-status' >Unpaid</Badge>:  null
                    
                }
            <div className={`myBets ${status}`}>
                
        
                
                    {winner == userId?
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                    <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                    </svg>: 
                     <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                     <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                     </svg>
                    }
                    
                
                
                <div className='myBet-person'> 
                    <p><strong>{userId == sender._id? receiver.username: sender.username}</strong></p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fclass="bi bi-person-badge" viewBox="0 0 16 16">
                    <path d="M6.5 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                    <path d="M4.5 0A2.5 2.5 0 0 0 2 2.5V14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2.5A2.5 2.5 0 0 0 11.5 0h-7zM3 2.5A1.5 1.5 0 0 1 4.5 1h7A1.5 1.5 0 0 1 13 2.5v10.795a4.2 4.2 0 0 0-.776-.492C11.392 12.387 10.063 12 8 12s-3.392.387-4.224.803a4.2 4.2 0 0 0-.776.492V2.5z"/>
                    </svg>

                </div>
                <div className='myBet-wager'>
                    
                            <p className='p-heads'>Terms:</p>
                            <p>{condition}</p>
                        
                        
                        
                </div>
                <div className='myBet-prize'>
                            <p className='p-heads'>Prize:</p>
                            <p>{reward}</p>
                        </div>
                
            </div>
            </a>
        </div>
    </>)

}

export default MyBetDiv;