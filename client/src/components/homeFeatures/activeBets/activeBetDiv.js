



function ActiveBetDiv({betData,userId}){

    function getOpponent(){
        if(userId === betData.receiver?._id){
            return betData.sender?.username;
        }else return betData.receiver?.username;
    }

    return(
        <div className="activeBets">
                <div className="activeBets-header">
                    
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" className="bi bi-file-earmark-person" viewBox="0 0 16 16">
                <path d="M11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2v9.255S12 12 8 12s-5 1.755-5 1.755V2a1 1 0 0 1 1-1h5.5v2z"/>
                </svg>
                    <p><strong>{getOpponent()}</strong></p>
                </div>

                <div className='wager-container'>
                    <p>Wager{" "}:</p>
                    <p>{betData.condition}</p>
                </div>

                <a href={`/bet-details/${betData._id}`}>
                <button type="button" className="btn btn-light" >
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"  className="bi bi-award" viewBox="0 0 16 16">
                    <path d="M9.669.864 8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68L9.669.864zm1.196 1.193.684 1.365 1.086 1.072L12.387 6l.248 1.506-1.086 1.072-.684 1.365-1.51.229L8 10.874l-1.355-.702-1.51-.229-.684-1.365-1.086-1.072L3.614 6l-.25-1.506 1.087-1.072.684-1.365 1.51-.229L8 1.126l1.356.702 1.509.229z"/>
                    <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1 4 11.794z"/>
                    </svg>
                </button>
                </a>
            </div>
    )

}

export default ActiveBetDiv