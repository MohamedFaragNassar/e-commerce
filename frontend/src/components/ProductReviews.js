import React, { useState } from 'react'
import Review from './Review'
import {addReview, deleteComment, getProductReviews} from '../Actions/productActions'
import Spinner from './Spinner'
import Status from './Status'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import StarRating from './StarRating'



const ProductReviews = ({id}) => {
    
    const {userData} = useSelector(state => state.userSignIn)
    const dispatch = useDispatch()
    const {reviews} = useSelector(state => state.getReviews)
    const {loading,error,review} = useSelector(state => state.addReview)
    const [rating, setRating] = useState(1)
    const [comment, setComment] = useState()
    
    const commentsNum = reviews?.filter(e => e.comment != null).length 

   
   
    const calcRating = () =>{
        if(reviews?.length > 0){
            const sum = reviews?.reduce((a,b)=>a+b.rating,0)
            return (sum/reviews?.length).toFixed(2)
        }else{
            return 0
        }
    }

    const handleAddReview = (e)=>{
        e.preventDefault()
        dispatch(addReview({
         rating:Number(rating),
         comment,
         id,
        }))
        const reviewForm = document.getElementById("review-form")
        reviewForm.reset()
       
    }

    const handleDelComment = (id) =>{
        dispatch(deleteComment(id))
    }

    const handleStarRating = (val) => {
        setRating(val)
    }

    const checkUserReview = () => {
        return reviews?.filter(e => e.user._id == userData?.userID).length < 1 || false
    }

    useEffect(() => {
       dispatch(getProductReviews(id))
    }, [])
    return <>
        <div className="review-product">
           {userData && checkUserReview()?<div className="add-review">
                <div className="product-discr-header review-header">Rate this product</div>
                <form id="review-form">
                    <div>
                       <StarRating handler={handleStarRating} value={0} />      
                    </div>
                    <textarea onChange={(e)=>setComment(e.target.value)} 
                    placeholder="write your comment here"></textarea>
                    {loading? <Spinner/>:<div><button onClick={(e)=>handleAddReview(e)} className="clear-wishlist">Add Review</button></div> }
                    {error?<Status isOpen="true" size="small" status="fail" message={error} />:
                    review?<Status isOpen="true" size="small" status="success" message="thank you for reviewing this product" />:null}
                </form>
            </div>:null}
            <div className="customers-rating">
                <div className="customers-rating-header" >Other customers rating</div>
                <div className="total-rating">{calcRating()}</div>
                <div className="review-stars">
                    <Review value={calcRating()} color="#ffe05d"/>
                    <span>{(reviews?.length > 0) ? checkUserReview() ?
                        <>({reviews.length} Reviews)</>:
                        <span>{reviews.length > 1 ? `(you & ${reviews.length - 1 } 
                        others Reviewed this product)`:`only you reviewed this product`}</span>: null}
                    </span>
                </div>
            </div>
            
        </div>
        {reviews?.length > 0 && commentsNum > 0 ? <div className="comments review-products">
            <div className="product-discr-header review-header">What customrs Said about this product</div>
             {reviews?.map(review => 
                review.comment?<div key={review.user._id} className="comment">
                    <img src={review.user.image?`../${review.user.image}`:"../account.png"} />
                    <div className="comment-body">
                        <div className="comment-owner" >{`${review.user.firstName} ${review.user.lastName}`}</div>
                        <div className="comment-content">{review.comment}</div>
                    </div>
                {userData?.userID === review.user._id &&<button onClick={()=>handleDelComment(review._id)}><i className="fas fa-trash-alt"></i></button>}
               </div>
                :null)}   
        </div>:null}
    </>
}

export default ProductReviews
