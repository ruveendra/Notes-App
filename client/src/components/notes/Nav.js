import React from 'react'
import {Link} from 'react-router-dom'

 function Nav({setIsLogin}) {

    const logoutSubmit = () =>{
        localStorage.clear()
        
        setIsLogin(false)
    }

    return (
      //   <header class="navbar navbar-expand-lg bg-light">
      //   <nav class="navbar navbar-expand-lg bg-light">
      //   <div class="container-fluid">
      //     {/* <a class="navbar-brand " href="#">Navbar</a> */}
      //     <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      //       <span class="navbar-toggler-icon"></span>
      //     </button>
      //     <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      //       <div class="navbar-nav">
      //         {/* <a class="nav-link active" aria-current="page" href="#">Home</a> */}
      //         <ul>
      //           {/* <li><Link class="navbar-brand " to="/">Home</Link></li> */}
      //           <li><Link class="navbar-brand " to="/">Home</Link></li>
      //           <li><Link class="navbar-brand " to="/create">Create Note</Link></li>
      //           <li onClick={logoutSubmit}><Link class="navbar-brand "to="/">Logout</Link></li>
      //       </ul>
      //       </div>
      //     </div>
      //   </div>
      // </nav>
      // </header>




        <header>
            <div className="logo1">
                <h1><Link class = "navbar" to="/">Notes </Link></h1>
            </div>
            <ul>
                <li><Link class = "navbar"to="/">Home</Link></li>
                <li><Link to="/create" class = "navbar">Create Note</Link></li>
                <li onClick={logoutSubmit}  ><Link  class = "navbar" to="/">Logout</Link></li>
            </ul>
        </header>
    )
}

export default Nav