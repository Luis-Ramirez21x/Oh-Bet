import { Button } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';



function BetAccordion({title, bets}){

    
    
    
    if(bets.length === 0){
        return (
        <Accordion>
            <Accordion.Item eventKey="0">
                <Accordion.Header>{title}</Accordion.Header>

                        <Accordion.Body >
                            <p>No Toss Ups at the moment</p>
                        </Accordion.Body>
            </Accordion.Item>
        </Accordion>
        )
    }


    return(
    <Accordion>
        <Accordion.Item eventKey="0">
            <Accordion.Header>{title}</Accordion.Header>
            {bets.map((bet, index) =>{
                return (
                    <Accordion.Body key={index}>
                        <div className='accordion-names'>
                            
                                <p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="bi bi-person-badge" viewBox="0 0 16 16"><path d="M6.5 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"></path><path d="M4.5 0A2.5 2.5 0 0 0 2 2.5V14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2.5A2.5 2.5 0 0 0 11.5 0h-7zM3 2.5A1.5 1.5 0 0 1 4.5 1h7A1.5 1.5 0 0 1 13 2.5v10.795a4.2 4.2 0 0 0-.776-.492C11.392 12.387 10.063 12 8 12s-3.392.387-4.224.803a4.2 4.2 0 0 0-.776.492V2.5z"></path></svg>
                                <strong>{" "}{bet.sender.username}</strong></p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="50"  className="bi bi-arrow-down-short" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"/>
                                </svg>
                                <p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="bi bi-person-badge" viewBox="0 0 16 16"><path d="M6.5 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"></path><path d="M4.5 0A2.5 2.5 0 0 0 2 2.5V14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2.5A2.5 2.5 0 0 0 11.5 0h-7zM3 2.5A1.5 1.5 0 0 1 4.5 1h7A1.5 1.5 0 0 1 13 2.5v10.795a4.2 4.2 0 0 0-.776-.492C11.392 12.387 10.063 12 8 12s-3.392.387-4.224.803a4.2 4.2 0 0 0-.776.492V2.5z"></path></svg>
                                <strong>{" "} {bet?.receiver?.username ? bet?.receiver.username : 'TBA'}</strong></p>
                            
                        </div>
                        <div className='accordion-terms'>
                            
                            <p>"{bet.condition}"</p>
                            
                        </div>
                        <a href={`/bet-details/${bet._id}`} className='accordion-btn'>
                        
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" className="bi bi-arrow-bar-right" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M6 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L12.293 7.5H6.5A.5.5 0 0 0 6 8zm-2.5 7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5z"/>
                            </svg>
                        </a>
                        
                        
                    </Accordion.Body>
                )
            })}
            
        </Accordion.Item>
      
    </Accordion>
    )
}
export default BetAccordion;