import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../App.css';
import Axios from 'axios';


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            data: [],
            showUpdate : false,
            titleUpdate: "",
            selectedId: "",
            show: false
        }
    }

    insertData = async() => {
        try {
            //Consum API
            const token = localStorage.getItem('token')
            const result = await Axios({
                method: "POST",
                data: {
                    title : this.state.title
                },
                url: 'http://localhost:5000/api/v1/todo',
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            })
            //Cleat Title
            this.setState({title:""})
            this.getData()

        } catch (err) {
            console.log(err.message)
        }
    }

//Get Data
    getData = async() => {
        try{
            //Consum API
            const token = localStorage.getItem('token')
            const result = await Axios({
                method: "GET",
                url: 'http://localhost:5000/api/v1/todos',
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            })
            //Cleat Title
            this.setState({data:result.data})

        } catch (err) {
            console.log(err.message)
        }
    }

    updateData = async() => {
        try {
            //Consum API
            const token = localStorage.getItem('token')
            const result = await Axios({
                method: "PATCH",
                data: {
                    title : this.state.titleUpdate
                },
                url: 'http://localhost:5000/api/v1/todo/' + this.state.selectedId,
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            })
            //Cleat Title
            this.setState({titleUpdate: "", showUpdate:false,selectedId:""})
            this.getData()
        } catch (err) {
            console.log(err.message)
        }
    }

    deleteData = async(id) => {
        try{
            //Consum API
            const token = localStorage.getItem('token')
            const result = await Axios({
                method: "DELETE",
                data: {
                    title: this.state.titleUpdate
                },
                url: 'http://localhost:5000/api/v1/todo/' + id,
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            })
            //Cleat Title
            this.getData()
        } catch (err) {
            console.log(err.message)
        }
    }

    handleShow = (isShowed) => {
        this.setState({show: isShowed})
    }

    componentDidMount(){
        this.getData()
    }

    render() {
        console.log(this.state.data)
        return (
            <div className="App">
                <header className="App-header">

                    <h1 style={{fontWeight:"bold"}}>Todo</h1> <br></br>

                    <table border="2" >
                        <tbody>
                        <tr>
                            <th>No</th>
                            <th>Title</th>
                            <th>Action</th>
                        </tr>
                        {this.state.data.map( (value,index) => (
                        <tr>
                            <td style={{ width: 100, height: 100 }}>{index+1}</td>
                            <td style={{ width: 100, height: 100 }}>{value.title}</td>
                            <td style={{ width: 300, height: 100 }}>
                                <button style={{ backgroundColor: "#2ecc71", color: "white" }} onClick={() => {this.setState({showUpdate:true, selectedId:value.id, titleUpdate: value.title})}}>Update</button> || <button style={{ backgroundColor: "#e74c3c", color: "white" }} onClick={() => {this.deleteData(value.id)}}>Delete</button>
                            </td>
                        </tr>))}
                        </tbody>
                    </table>

                    <br></br>

                    <button style={{ backgroundColor: "#0984e3", color: "white" }} onClick={() => this.handleShow(true)} >Add Data</button>


                    {/* Modal Add Data */}
                    <Modal show={this.state.show} onHide={() => this.handleShow(false)} animation={false}>

                        <Modal.Header closeButton>
                            <Modal.Title>Add Data</Modal.Title>
                        </Modal.Header>
                        
                        <Modal.Body>
                            <form>
                                <input type="text" style={{width: "100%", marginBottom: 10}} placeholder="Title" value={this.state.title} onChange={(e) => {this.setState({title:e.target.value})}}></input>

                                <Button variant="primary" style={{marginLeft: "73%"}} onClick={this.insertData}>
                                Save Changes
                                </Button>
                            </form>
                        </Modal.Body>

                    </Modal>

                    {/* Modal Update Data */}
                    <Modal show={this.state.showUpdate} onHide={() => {this.setState({showUpdate:false})}} animation={false}>

                        <Modal.Header closeButton>
                            <Modal.Title>Add Data</Modal.Title>
                        </Modal.Header>
                        
                        <Modal.Body>
                            <form>
                            <input type="text" style={{width: "100%", marginBottom: 10}} placeholder="Title" value={this.state.titleUpdate} onChange={(e) => {this.setState({titleUpdate:e.target.value})}}></input>

                                <Button variant="primary" style={{marginLeft: "73%"}} onClick={this.updateData}>
                                Save Changes
                                </Button>
                            </form>
                        </Modal.Body>

                    </Modal>

                </header>
            </div>
        )
    }
}

export default Home;


