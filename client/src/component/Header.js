import { Nav, Navbar, Container, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export default function Header() {
	return (
		<Navbar bg='light' data-bs-theme='light' fixed='top' className='py-3'>
			<Container className='px-5'>
				<Navbar.Brand className='text-success fw-bold'>
					<img src='https://picsum.photos/40/40' className='d-inline-block rounded' alt='useMPD logo' />{' '}
					useMDP
				</Navbar.Brand>
				<Nav>
					<Button as={NavLink} to={'/login'} className='mx-2' variant='outline-success'>
						Log In
					</Button>
					<Button as={NavLink} to={'/roadmap'} className='mx-2' variant='success'>
						My Roadmap
					</Button>
				</Nav>
			</Container>
		</Navbar>
	);
}
