import Accordion from 'react-bootstrap/Accordion';
import axios from 'axios';

function DeclareWinner({betData}){

    async function declareWinner(event){
        event.preventDefault();
        const userId = event.target.value;

        try{

            let data = await axios.post(process.env.REACT_APP_API_URL + 'bets/declareWinner',{
                "_id": betData._id,
                "sender" : betData.sender._id,
	            "receiver": betData.receiver._id, 
                "winner": userId
        })
            
            window.location.reload();
        }catch(err){
            console.log(err);
        }
            
    }


    return (<>
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Has The Winner Been Decided?</Accordion.Header>
        <Accordion.Body className='declare-winner-accordion'>
        <h5>Who Was The Winner?</h5>
        <div>
            <button type="button" className="btn btn-secondary" value={betData.sender._id} onClick={declareWinner}>
                    {betData.sender.username + " "} 
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-badge" viewBox="0 0 16 16">
                    <path d="M6.5 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"></path>
                    <path d="M4.5 0A2.5 2.5 0 0 0 2 2.5V14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2.5A2.5 2.5 0 0 0 11.5 0h-7zM3 2.5A1.5 1.5 0 0 1 4.5 1h7A1.5 1.5 0 0 1 13 2.5v10.795a4.2 4.2 0 0 0-.776-.492C11.392 12.387 10.063 12 8 12s-3.392.387-4.224.803a4.2 4.2 0 0 0-.776.492V2.5z"></path>
                    </svg>
            </button>
            <button type="button" className="btn btn-secondary" value={betData.receiver._id} onClick={declareWinner}>
                    {betData.receiver.username + " "}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-badge" viewBox="0 0 16 16">
                    <path d="M6.5 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"></path>
                    <path d="M4.5 0A2.5 2.5 0 0 0 2 2.5V14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2.5A2.5 2.5 0 0 0 11.5 0h-7zM3 2.5A1.5 1.5 0 0 1 4.5 1h7A1.5 1.5 0 0 1 13 2.5v10.795a4.2 4.2 0 0 0-.776-.492C11.392 12.387 10.063 12 8 12s-3.392.387-4.224.803a4.2 4.2 0 0 0-.776.492V2.5z"></path>
                    </svg>
            </button>
        </div>

        </Accordion.Body>
      </Accordion.Item>
      
    </Accordion>
    
    </>)
}

export default DeclareWinner;