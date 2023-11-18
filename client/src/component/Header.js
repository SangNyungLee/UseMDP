import { useState } from 'react';
import { Nav, Navbar, Container, Button, Modal } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

export default function Header() {
	// 모달창 보여주기, 숨기기 상태
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	// 반응형으로 모바일 화면일때 헤더 버튼 크기 줄이기
	const isMobile = useMediaQuery({
		query: '(max-width: 576px)',
	});

	return (
		<>
			<Navbar bg='light' data-bs-theme='light' fixed='top' className='py-3'>
				<Container className='px-3 px-sm-5'>
					<Navbar.Brand className='text-success fw-bold'>
						<img src='https://picsum.photos/40/40' className='d-inline-block rounded' alt='useMPD logo' />{' '}
						useMDP
					</Navbar.Brand>
					<Nav>
						<Button
							onClick={handleShow}
							className='mx-2'
							variant='outline-success'
							size={isMobile ? 'sm' : 'md'}>
							Log In
						</Button>
						<Button
							as={NavLink}
							to={'/roadmap'}
							className='mx-2'
							variant='success'
							size={isMobile ? 'sm' : 'md'}>
							My Roadmap
						</Button>
					</Nav>
				</Container>
			</Navbar>

			<Modal show={show} onHide={handleClose} backdrop='static' keyboard={false} centered>
				<Modal.Header closeButton>
					<Modal.Title>Modal title</Modal.Title>
				</Modal.Header>
				<Modal.Body>I will not close if you click outside me. Don not even try to press escape key.</Modal.Body>
				<Modal.Footer>
					<Button variant='primary'>Understood</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
