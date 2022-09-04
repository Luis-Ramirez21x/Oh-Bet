import axios from "axios";

function BetReqDiv({betData}){

    const deleteBet = async (event) =>{
        event.preventDefault();
          event.stopPropagation();
          
        try{
            
            let data = await axios.post('http://localhost:3001/api/bets/deleteBet',{
                "betId": betData._id

        })
        
    
        window.location.reload();
    }catch(err){
            console.log(err);
        }
    }


    
        
    if(betData.approved === null){
        return(
            <div className="betRequest">
                <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-right-circle-fill" viewBox="0 0 16 16">
                <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm5.904-2.803a.5.5 0 1 0-.707.707L9.293 10H6.525a.5.5 0 0 0 0 1H10.5a.5.5 0 0 0 .5-.5V6.525a.5.5 0 0 0-1 0v2.768L5.904 5.197z"/>
                </svg>
                    <p><strong>{betData.receiver.username}</strong> Rejected your offer</p>
                </div>
                <div>
                    <p>{betData.condition} </p>
                </div>
                <button type="button" className="btn btn-danger" onClick={deleteBet}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-backspace-reverse" viewBox="0 0 16 16">
                    <path d="M9.854 5.146a.5.5 0 0 1 0 .708L7.707 8l2.147 2.146a.5.5 0 0 1-.708.708L7 8.707l-2.146 2.147a.5.5 0 0 1-.708-.708L6.293 8 4.146 5.854a.5.5 0 1 1 .708-.708L7 7.293l2.146-2.147a.5.5 0 0 1 .708 0z"></path>
                    <path d="M2 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7.08a2 2 0 0 0 1.519-.698l4.843-5.651a1 1 0 0 0 0-1.302L10.6 1.7A2 2 0 0 0 9.08 1H2zm7.08 1a1 1 0 0 1 .76.35L14.682 8l-4.844 5.65a1 1 0 0 1-.759.35H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h7.08z"></path>
                    </svg>
              </button>
                
            </div>
        )
    }

    return(
        <div className="betRequest">
                <div className="betReq-logo-name">
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35"  className="bi bi-arrow-down-right-square" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm5.854 3.146a.5.5 0 1 0-.708.708L9.243 9.95H6.475a.5.5 0 1 0 0 1h3.975a.5.5 0 0 0 .5-.5V6.475a.5.5 0 1 0-1 0v2.768L5.854 5.146z"/>
                </svg>
                <div className="betReq-header">
                    <p>Request</p>
                <p><strong>{betData.sender.username}</strong> </p>

                </div>
                </div>
            <div className="betReq-body">
                <p>Premium:</p>
                <p>{betData.condition} </p>
            </div>


            <a href={`/bet-details/${betData._id}`} className="details-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"  className="bi bi-arrow-bar-right" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M6 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L12.293 7.5H6.5A.5.5 0 0 0 6 8zm-2.5 7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5z"/>
                </svg>
            </a>
            
        </div>
    )
    

}

export default BetReqDiv;