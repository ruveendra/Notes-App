
import React, {useState} from 'react'
import axios from 'axios'
import {useNavigate } from 'react-router-dom'

function CreateNote({setIsLogin}) {

    const [note, setNote] = useState({
        title: '',
        content: '',
        date: ''
    })
    const history = useNavigate()

    const onChangeInput = e => {
        const {name, value} = e.target;
        setNote({...note, [name]:value})
    }


    const createNote = async e => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('tokenStore')
            if(token){
                setIsLogin(true)
                const {title, content, date} = note;
                const newNote = {
                    title, content, date
                }

                await axios.post('/api/notes', newNote, {
                    headers: {Authorization: token}
                })
                
                return history.push('/')
            }
        } catch (err) {
            window.location.href = "/";
        }
    }
    

    return (
    //     <div class="center">
    //   <h2>Create Note</h2>
    //   <form onSubmit={createNote} autoComplete="off">
    //     <div class="txt_field"  >
    //        {/* <label htmlFor="title">Title</label> */}
    //       <input type="text" required name="title" id="title"  value={note.title} onChange={onChangeInput}/>
    //       <span></span>
    //       <label>Title</label>
    //     </div>
        
        
    //     <div class="txt_field">
    //     {/* <label htmlFor="title">Content</label> */}
    //       <input type="text"  name="content" id="content" required value={note.content} autoComplete="true" onChange={onChangeInput} rows="10"/>
    //       <span></span>
    //       <label>Content</label>
    //     </div>

    //     <div class="txt_field"  >
    //        {/* <label htmlFor="title">Date</label> */}
    //       <input type="date" id="date" name="date" onChange={onChangeInput} value={note.date} />
    //       <span></span>
    //       <label>Date</label>
    //     </div>

    //     {/* <div class="pass">Forgot Password?</div> */}
    //     <input type="submit" value="Save"/>
    //     {/* <div class="signup_link">
    //       Not a member? <a href="#">Signup</a>
    //     </div> */}
    //   </form>
    // </div>

        <div className="center">
            <h2>Create Note</h2>
            <form onSubmit={createNote} autoComplete="off">
                <div className="txt_field">
                    
                    <input type="text" value={note.title} id="title"
                    name="title" required onChange={onChangeInput} />
                    <label >Title</label>
                </div>

                <div className="row">
                    <div className="txt_field1"><label >Content</label></div>
                    
                    <textarea type="text" value={note.content} id="content" /////////////
                    name="content" required rows="10" onChange={onChangeInput} />
                </div>

                
                <div className="txt_field" >
                    <input type="date" id="date"
                    name="date" onChange={onChangeInput} />
                    <label >Date: {note.date} </label>
                </div>

                <input type="submit" value="Save"/>
            </form>
        </div>
    )
}

export default CreateNote