import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import bnr from '../../assets/bnr.jpg';

function SCard() {
  return (
    <Card style={{ width: '20rem' , height: '28rem'}}>
      <Card.Img variant="top" src={bnr} />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default SCard;