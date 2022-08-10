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
                        <div className='accordVs'>
                            <div>
                                <p>{bet.sender.username}</p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                </svg>
                            </div>
                            <p>vs.</p>
                            <div>
                                <p>{bet?.receiver?.username ? bet?.receiver.username : 'TBA'}</p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                </svg>
                            </div>
                        </div>
                        <div>
                            <p>On The Line</p>
                            <p>{bet.reward}</p>
                        </div>
                        <Button href={`/bet-details/${bet._id}`}>{(title === 'Toss Up Bets') ? 'Wager':'Bet Details'}</Button>
                        
                    </Accordion.Body>
                )
            })}
            
        </Accordion.Item>
      
    </Accordion>
    )
}
export default BetAccordion;