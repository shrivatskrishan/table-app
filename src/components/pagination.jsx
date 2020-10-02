import React, { Component } from "react";
import Pagination from '@material-ui/lab/Pagination';

export default class PaginateComponent extends Component {
    constructor(props){
        super();
        this.state={
            offset: 0,
            perPage: 5,
            currentPage: 0,
            pageCount:0
        }
    }
    componentDidMount =()=>{
        let {totalData}=this.props
        console.log(totalData )
        this.setState({
           pageCount: Math.ceil(totalData.length / this.state.perPage),
        },() => {
           this.props.paginateData(this.state.offset, this.state.offset + this.state.perPage)
        })
    }
    handleChange =(event,value)=>{
        //let {totalData}=this.props
        const selectedPage = value;
        const offset = (selectedPage-1) * this.state.perPage;
        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.props.paginateData(this.state.offset, this.state.offset + this.state.perPage)
        })
        
    }

    render(){
        const {pageCount}=this.state
        return(
            <div>
                 <Pagination onChange={this.handleChange} count={pageCount} variant="outlined" color="secondary" />
            </div>
        )
    }

}