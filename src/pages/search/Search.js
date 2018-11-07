import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import '../../stylesheets/search.css';
import AllRecipes from "../all/allrecipes";
import fs from "../../firestoreservice"
import mongo from "../../mongoservice"

class Search extends Component {


    constructor(props) {
        super(props);

        this.state = {
            searchReq: '',
            searchResult: '',
            noData: '',
            cssClass: '',
            searchWord: '',
            page: 0
        };

    }

    componentWillMount() {
        let searchWord = (this.props && this.props.match && this.props.match.params && this.props.match.params.searchWord) || ''
        let page = (this.props && this.props.match && this.props.match.params && this.props.match.params.page) || ''
        if(searchWord && page) {
            this.props.history.push('/search')
        }
    }

    onKeyTyped(e) {
        //save input to a variable
        this.setState({searchReq: e.target.value});
    }

    onSubmit() {
        this.setState({searchWord: this.state.searchReq, page: 1})
        // fs.searchRecipesByName(this.state.searchReq, this.state.page).then(data => {
        //     if (data) {
        //         this.setState({searchResult: data});
        //     } else {
        //        console.log("error")
        //     }
        // })
        mongo.getSearchValue(this.state.searchReq).then((data)=>{
            console.log(data);
           this.setState({searchResult: data});

        });
    }

    generateSidePageRecipes(name, page, dir) {
        this.setState({loading: true})
        fs.searchRecipesByName(name, page, dir).then(data => {
            if (data) {
                this.setState({loading: false, searchResult: data});
            } else {
                console.log("error")
            }
        })
    }

    changePage(e) {
        if(e.target.id === 'forward') {
            this.setState({page: (this.state.page + 1)})
            this.generateSidePageRecipes(this.state.searchWord, (this.state.page+1), 'right')
        } else {
            this.setState({page: (this.state.page - 1)})
            this.generateSidePageRecipes(this.state.searchWord, (this.state.page-1), 'left')
        }
    }

    pagination() {
        if(this.state.searchResult.length > 0) {
            return (
                <ul>
                    {this.state.page > 1 ? <Link className="pageNumbers" to={{pathname: '/search/'+this.state.searchReq+'/'+(this.state.page-1)}}><li id={'back'} onClick={(e) => this.changePage(e)} className={'pageNumbers'}> &#8810; </li></Link> : ''}
                    <li className={'pageNumbers'}>{this.state.page}</li>
                    {this.state.searchResult.length < 9 ? '' : <Link className="pageNumbers" to={{pathname: '/search/'+this.state.searchReq+'/'+(this.state.page+1)}} ><li id='forward' onClick={(e) => this.changePage(e)} className={'pageNumbers'}> &#8811; </li></Link>}
                </ul>
            )
        }
    }

    getButtonElement() {
        if(Object.keys(this.state.searchReq).length !== 0) {
            return (
                <Link to={{pathname: "/search/" + this.state.searchReq + '/1'}}>
                    <button className="recipeButton searchBtn" autoFocus onClick={() => this.onSubmit()}>Search</button>
                </Link>
            )
        } else {
            return (
                <Link to={{pathname: "/search/"}}>
                    <button className="recipeButton searchBtn" autoFocus onClick={() => this.onSubmit()}>Search</button>
                </Link>
            )
        }
    }

    renderRecipes() {
        return (
            <div style={{"textAlign": "center"}} className={'content' + this.state.cssClass}>
                <input className="searchInput" placeholder="Search Phrase" type="text" onChange={(e) => this.onKeyTyped(e)}/><br/>
                {this.getButtonElement()}
                <div className="allRecipes">
                    <AllRecipes search={true} searchResult={this.state.searchResult}/>
                </div>
                {this.pagination()}
            </div>
        )
    }

    render() {
        if (!this.state.loading) {
            return this.renderRecipes()
        } else {
            return(
                <div className="preloader-div">
                    <img alt="Preloader" className="preloader" src="https://cdn.dribbble.com/users/645440/screenshots/3266490/loader-2_food.gif"/>
                </div>
            )
        }
    }
}

export default Search;