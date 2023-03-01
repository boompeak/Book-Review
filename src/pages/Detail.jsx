<<<<<<< HEAD
import axios from "axios";
import { Card } from "react-bootstrap";
import { useQuery } from "react-query";
import '../App.css'
import {Button, Delbutton} from "../style/signinOrUp/Button";
import LoadingSpinner from "../style/LoadingSpinner";
const Detail = () => {

  let result = useQuery('상세조회', ()=>
    axios.get('http://13.113.67.140:8080//api/reveiws/{id}').then((a)=>{
     return a.data
    })
  )

    console.log(result)

    return(<div className="layout">
       {result.isLoading ? <LoadingSpinner/> : 
         
       <Card
        key={result.data.id}
        bg="dark"
        text="white"
        style={{ width: "30rem", height: "20rem", borderRadius: "20px" }}
        className="my-2"
      >
        <button>👍</button>
        <Card.Header>{result.data.title}</Card.Header>
        <Card.Body>
          <Card.Title>{result.data.contents}</Card.Title>
          <Card.Text>{result.data.nickname}</Card.Text>
          <Card.Text>{result.data.createdAT}</Card.Text>
        </Card.Body>
        <div className="detail-btn">
        <Button>수정</Button>
        <Delbutton>삭제</Delbutton>
        </div>
      </Card> }
       </div>
    )

=======
const Detail = () => {
  return <h4>상세 페이지</h4>;
>>>>>>> 6e529022d88ac58a1ba59f9d69ef60e6adba710e
};

export default Detail;
