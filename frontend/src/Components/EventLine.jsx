const EventLine = ({timestamp, time, contents, url_endpoint, onClick, deleteEvent}) => {

  return (
    <div className='card' onClick={onClick}>
      <p className='card-time'>{time}</p>
      <p className='card-method'>{contents.method}</p>
      <p className='card-path'>{contents.path}</p>
      {/* <div onClick={() => deleteEvent(timestamp)}><p className='delete'><span className="material-symbols-outlined">delete</span></p></div> */}
    </div>
  )
}

export default EventLine;
