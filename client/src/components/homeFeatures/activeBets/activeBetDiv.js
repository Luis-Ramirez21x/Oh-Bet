



function ActiveBetDiv({betData,userId}){

    function getOpponent(){
        if(userId == betData.receiver?._id){
            return betData.sender?.username;
        }else return betData.receiver?.username;
    }

    return(
        <div className="activeBets">
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fillRule="currentColor" className="bi bi-arrow-right-short" viewBox="0 0 16 16"><path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"></path></svg>
                <h6>{getOpponent()}</h6>
                <div>
                    <p>On The Line</p>
                    <p>{betData.reward}</p>
                </div>
            </div>
    )

}

export default ActiveBetDiv