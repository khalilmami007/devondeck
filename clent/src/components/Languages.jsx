import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, Link ,useParams} from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import SubHeader from './SubHeader';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



const Languages = (props) => {
    
    
    console.log("dans languages developer number  "+props.devId)
    
const [languages, setLanguages] = useState([]); 
const [frameworks, setFrameworks] = useState([]); 
const [bio, setBio] = useState(""); 
const [lang1, setLang1] = useState(""); 
const [lang2, setLang2] = useState(""); 
const [lang3, setLang3] = useState(""); 
const [lang4, setLang4] = useState(""); 
const [lang5, setLang5] = useState(""); 
const [count, setCount] = useState(1); 
const [now, setNow] = useState(0); 
const [errors, setErrors] = useState([]);
const navigate = useNavigate();
const [dev, setDev] = useState({})
console.log(lang1)
   const AddSkills = (e) => {
       e.preventDefault();
       axios.post('http://localhost:5000/api/skills/languages', {devId:props.devId,languages:languages,bio:bio})
                .then(res=>{console.log(res)
                    console.log(res.data)
                    navigate("/devs/skills/frameworks/"+res.data.Skill._id)
                })
                .catch(err=>{
                    const errorResponse = err.response.data.errors; 
                    const errorArr = []; 
                    for (const key of Object.keys(errorResponse)) { 
                        errorArr.push(errorResponse[key].message)
                    }
                    setErrors(errorArr);
                })       
   }
   const AddLang = (url,lang) => {
         setNow(now+20)
         setCount(count+1)
         if(count===1){setLang1(url)}
         if(count===2){setLang2(url)}
         if(count===3){setLang3(url)}
         if(count===4){setLang4(url)}
         if(count===5){setLang5(url)}
        setLanguages([...languages,lang])
        console.log("les langages sont  "+languages)
        console.log("selected language is", lang)
}
   

    return (
        <div>
            <SubHeader/>
            <Card style={{ width: '900px', height: '600px' }} border='secondary' >
               
                <div className='subheader'><h2>Add your Skills</h2>
                <div className='divbar'><ProgressBar now={now} label={`${now}%`} visuallyHidden /></div> 
                </div>              
            <Container className='contStyle'>
            <Row>
                <Col className='ColStyle'><h3>Pick Your Top 5 Languages</h3></Col>
                 <Col className='ColStyle'> <div className='langContainer'> 
                 <div>
                    {lang1 ?<img src={require(`${lang1}`)} id="css" alt="css icon" className='iconStyle2'/> :''}</div>
                    <div>
                    {(lang2)?<img src={require(`${lang2}`)} id="css" alt="css icon" className='iconStyle2'/> :''}
                    </div>
                    <div>
                    {(lang3) ?<img src={require(`${lang3}`)} id="css" alt="css icon" className='iconStyle2'/> :''}
                    </div>
                    <div>
                    {(lang4) ?<img src={require(`${lang4}`)} id="css" alt="css icon" className='iconStyle2'/> :''}
                    </div>
                    <div>
                    {(lang5) ?<img src={require(`${lang5}`)} id="css" alt="css icon" className='iconStyle2'/> :''}
                </div>
                </div></Col>
            </Row>
      <Row>
        <Col className='ColStyle'>
            <div  className='iconcontainer'>
        <table>
            <tr>
                <td> <img src={require("./icons/csharp.jpg")} id="csharp" alt="csharp" className='iconStyle'
                onClick={() => AddLang("./icons/csharp.jpg","csharp")}/></td>
                <td><img src={require("./icons/css.png")}id="css" alt="css" className='iconStyle'
                onClick={() => AddLang("./icons/css.png","css")}/></td>
                <td><img src={require("./icons/go.jpg")} id="go" alt="go" className='iconStyle'
                onClick={() => AddLang("./icons/go.jpg","go")}/></td>
                <td><img src={require("./icons/html.jpg")}id="html" alt="html" className='iconStyle'
                onClick={() => AddLang("./icons/html.jpg","html")} /></td>
            </tr>
            <tr>
            <td> <img src={require("./icons/java.png")} id="java" alt="java" className='iconStyle'
            onClick={() => AddLang("./icons/java.png","java")}/></td>
                <td><img src={require("./icons/js.png")}id="js" alt="js" className='iconStyle'
                onClick={() => AddLang("./icons/js.png","js")}/></td>
                <td><img src={require("./icons/pyth.jpg")} id="pyth" alt="pyth" className='iconStyle'
                onClick={() => AddLang("./icons/pyth.jpg","python")}/></td>
                <td><img src={require("./icons/ruby.jpg")}id="ruby" alt="ruby" className='iconStyle'
                onClick={() => AddLang("./icons/ruby.jpg","ruby")} /></td>
        
            </tr>
            <tr>
            <td><img src={require("./icons/sql.png")} id="sql" alt="sql" className='iconStyle'
            onClick={() => AddLang("./icons/sql.png","sql")}/></td>
                <td><img src={require("./icons/swift.png")}id="swift" alt="swift" className='iconStyle'
                onClick={() => AddLang("./icons/swift.png","swift")}/></td>
                <td><img src={require("./icons/php.png")} id="php" alt="php" className='iconStyle'
                onClick={() => AddLang("./icons/php.png","php")}/></td>
                <td><img src={require("./icons/c++.png")} id="c++" alt="c++" className='iconStyle'
                onClick={() => AddLang("./icons/c++.png","c++")} /></td>
        
            </tr>
        </table>
        </div>
        






        </Col >
        <Col ><Row><h4>Short Bio</h4></Row>
        <Row><Form.Control as="textarea" rows={8} style={{ width: '400px' }} onChange = {(e)=>setBio(e.target.value)}/></Row>
        </Col>
        
      </Row>
      <div className='btncont'>
      <button className='skipbtn' onClick={(e)=>{navigate("/devs/jobs")}}>Skip This Step</button>
    <button onClick={AddSkills}>NEXT STEP Frameworks & Librairies</button>
      </div>

    </Container>
  

           </Card>

        </div>
    )
}

export default Languages