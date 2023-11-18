import Footer from '../component/Footer';
import Header from '../component/Header';
import { NavLink } from 'react-router-dom';
import { Container, Image, Row, Col, Card, Button, Stack } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';

export default function WelcomePage() {
	const isMobile = useMediaQuery({
		query: '(max-width: 576px)',
	});

	return (
		<>
			<Header />
			<Container className='px-5' style={{ height: '600px', paddingTop: '180px' }}>
				<Row xs={1} sm={1} md={2}>
					<Col className='mb-5'>
						<Stack gap={3}>
							<h1>Security-first diagramming for teams.</h1>
							<p>Bring your storage to our online tool, or save locally with the desktop app.</p>
						</Stack>
						<Stack direction={isMobile ? 'vertical' : 'horizontal'} id='target' gap={5} className='mt-5'>
							<Button as={NavLink} to={'/home'} variant='success' size='lg'>
								시작하기
							</Button>
							<Button variant='outline-success' size='lg'>
								<label>
									불러오기
									<input type='file' style={{ display: 'none' }} />
								</label>
							</Button>
						</Stack>
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
