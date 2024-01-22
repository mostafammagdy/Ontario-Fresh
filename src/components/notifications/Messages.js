import React from 'react'
import { PropTypes } from 'prop-types'

let messageStyle = {
  backgroundColor: '#27ae60',
  color: 'white',
  borderRadius: 2,
}

let ulStyle = {
  marginLeft: 0,
  marginBottom: 0,
}

let liStyle = {
  listStyleType: 'none',
  marginBottom: '1rem',
  padding: '0.8rem 0.2rem'
}

// unordered list of messages
const Messages = (props) => {
  const { messages } = props
  return (
    <div style={messageStyle}>
      <ul style={ulStyle}>
        {messages.map(message => (
          <li style={liStyle} key={message.time}>{message.body}</li>
        ))}
      </ul>
    </div>
  )
}

Messages.propTypes = {
  messages: PropTypes.arrayOf(
      PropTypes.shape({
        body: PropTypes.string,
        time: PropTypes.date,
      })),
}

export default Messages
