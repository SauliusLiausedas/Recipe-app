import React, { Component } from 'react'
import { Link } from "react-router-dom";

class SearchPage extends Component {

    render() {
        if (!this.props.searchResult) {
            return (
                <div><h1>What are you looking for?</h1></div>
            )
        } else if (Object.keys(this.props.searchResult).length === 0) {
            return (<div><h1>Nothing was found. Try changing search words.</h1></div>)
        } else {
            return (
                this.props.searchResult.map((mealObj, i) => {
                    return (
                        <div key={i} id={i} className="recipe-box">
                            <Link to={'/categories/' + mealObj.data.strCategory + '/' + mealObj.data.id}>
                                <img className="recipe-img" alt={mealObj.data.strMeal}
                                     src={mealObj.data.strMealThumb}/>
                            </Link>
                            <h2 className="mealName" key={i}>{mealObj.data.strMeal}</h2>
                            <em><p>{mealObj.data.strInstructions.slice(0, 250) + "..."}</p></em>
                        </div>
                    )
                })
            )
        }
    }
}

export default SearchPage