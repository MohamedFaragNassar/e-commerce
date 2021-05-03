import React from 'react'

const QuestionCard = ({q,a,size}) => {
    return (
        <div className={`q-card  ${size}`}>
            <div className="q">{q}</div>
            <div className="a">{a}</div>
        </div>
    )
}

export default QuestionCard
