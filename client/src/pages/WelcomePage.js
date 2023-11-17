import Footer from '../component/Footer';
import Header from '../component/Header';
import { Container, Image, Row, Col, Card } from 'react-bootstrap';

export default function WelcomePage() {
	return (
		<>
			<Header />
			<Container className='px-5' style={{ height: '600px', paddingTop: '180px' }}>
				<Row xs={1} md={2}>
					<Col>
						<Card>
							<Card.Title>Security-first diagramming for teams.</Card.Title>
							<Card.Body>
								Bring your storage to our online tool, or save locally with the desktop app.
							</Card.Body>
						</Card>
					</Col>
					<Col>
						<Image src='https://picsum.photos/600/400' rounded fluid></Image>
					</Col>
				</Row>
			</Container>
			<Footer />
		</>
	);
}
