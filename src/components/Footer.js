import React from 'react';
import { Nav } from 'react-bootstrap';

const Footer = ({ onNavClick, activeNavItem }) => {
	return (
		<footer className="footer">
			<div className="row mt-2">
				<div className="col-md-12 text-center">
					<p className="mb-0 d-flex justify-content-center">
						&copy; Copyright 2024 | All Rights Reserved | Powered by TitleFixer |{' '}
						<Nav className="mx-1">
							<Nav.Link
								className="privacy-nav-item"
								onClick={() => onNavClick('PrivacyPolicy')}
								active={activeNavItem === 'PrivacyPolicy'}
							>
								Privacy Policy
							</Nav.Link>
						</Nav>
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
