


function RankingsDiv({user, rank}){
    const {name, username, record} = user
    const {win,loss,live} = record

    return(
        <tr>
            <td>{rank}</td>
            <td>{name}</td>
            <td>{username}</td>
            <td>{win}</td>
            <td>{loss}</td>
            <td>{live}</td>
            {/*<td>{Number(win / (win + loss)).toFixed(2).toString() }</td>*/}
        </tr>
    )

}

export default RankingsDiv;