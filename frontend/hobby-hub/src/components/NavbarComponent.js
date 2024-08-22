import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//import logo1 from "../Images/treklogo.png";
import "../CSS/NavBar.css"
export default function NavbarComponent() 
{
    const bb = localStorage.getItem("loggedstatus");
    console.log("logged status starting code "+bb)
    if (bb==null)
     {
     var b=0;
      localStorage.setItem("loggedstatus",0)    
      }
      else{
        b=parseInt(bb);
      }
   
    console.log("logged status after if code "+b)
    const [user , setUser] = useState(null);

    useEffect(() => {
      console.log("logged status after if  effect "+b)
      if(b===1)
      {
       // saving in login component , and fetch here
        const loginid = JSON.parse(localStorage.getItem("loggedinfo")).login_id;
        console.log("loginid : "+ loginid);

        fetch("http://localhost:8080/touristgetbyid?tid="+loginid)
        .then(resp => 
          { if(resp.ok)
            { 
             return resp.text();
            }
            else
            {
              throw  new Error("Server error")  
            }
      })
      .then(text => text.length ? JSON.parse(text):{})
      .then(obj =>  {
        console.log(JSON.stringify(obj))
        localStorage.setItem("loggeduser",JSON.stringify(obj))
        setUser(obj);
       })
       .catch(error => {
        console.error("Error fetching data:", error);
    });
    }
  },[b]);



      return (

        <div >
          <div style={{height:"70px",backgroundColor:"transparent"}}>
             {console.log("in nav")}
            <nav className="navbar navbar-expand-sm mb-3 c-navcolor" >
              <div className="container-fluid ">  
    
                <div className="c-webname fw-bold">
                  {/* <img src={logo1} height="50px" alt="" width="50px"></img>&ensp;&ensp;&ensp; */}
                 HOBBYHUB
                </div>
    
                <ul className="navbar-nav navbar-right "> 
                  {/* <li className="nav-item ">
                    <Link to="/" style={{textDecoration:"none"}} className="c-navlink px-3">HOME</Link>
                  </li> */}
    
                  <li className="nav-item" >
                    <Link to="/registration" style={{textDecoration:"none"}} className="c-navlink px-3 ">REGISTER</Link>
                  </li>
    
                  <li className="nav-item" >
                    <Link to="/login" style={{textDecoration:"none"}} className="c-navlink px-3">LOGIN</Link>
                  </li>
                </ul>
              </div>
    
            </nav>
          </div>
          </div>
      )
}