import React,{useState} from 'react'

const StarRating = ({handler,value}) => {
    const [stars,setStars] = useState([1,2,3,4,5])
    const [rating,setRating] = useState(value)
    const [hovered,setHovered] = useState(value)
    const [selectedIcon] = useState("★")
    const [deselectedIcon] = useState("☆")
   
    
    const changeRating = (newRating) => {
       handler(newRating)
       setHovered(newRating)
       setRating(newRating)
    }

    const hoverRating = (rating) => {
        setRating(rating)
    }

    return (
        <div>
            <div className="star-rating">

                {stars.map(star => {
                    return (
                        <span
                            style={{ cursor: 'pointer' }}
                            onClick={() => { changeRating(star); }}
                            onMouseEnter={() => { hoverRating(star); }}
                            onMouseLeave={() => { hoverRating(hovered); }}
                            key={star}
                        >
                            {rating < star ?
                                deselectedIcon : selectedIcon
                            }
                            {/* {rating < star ?
                                hovered < star ? deselectedIcon : selectedIcon
                                :
                                selectedIcon
                            } */}
                        </span>
                    );
                })}

            </div>
        </div>
    );
    }


    export default StarRating;
