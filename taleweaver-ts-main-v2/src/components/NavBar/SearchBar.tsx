import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import { Row, Col } from 'react-bootstrap';

export default function SearchBar() {
  return (
    <Container>
      <Row className="justify-content-center w-200">
        <Col xs={12} md={6} lg={4}>
          <Form className="d-flex align-items-center">
            <svg width="20" height="20" className="mx-2" viewBox="0 0 20 20">
              <path d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z"
                stroke="currentColor"
                fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
            <FormControl type="search" className="color-dark-red ml-2"
              placeholder="Search" aria-label="Search" style={{ fontSize: 'small' }} />
          </Form>
        </Col>
      </Row>
    </Container>
  )
}
