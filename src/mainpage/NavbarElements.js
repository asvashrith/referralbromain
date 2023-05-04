import { FaBars } from 'react-icons/fa';
import { NavLink as Link } from 'react-router-dom';
import {AppBar, Toolbar} from '@mui/material';
import styled from 'styled-components';

export const Nav = styled.nav`
	background: #ff6666;
	height: 85px;
	display: flex;
	justify-content: center;
	padding: 0.2rem calc((100vw - 1000px) / 2);
	cursor: pointer;
	z-index: 12;
	/* Third Nav */
	/* justify-content: flex-start; */
`;

export const NavLink = styled(Link)`
	color: #808080;
	display: flex;
	align-items: center;
	text-decoration: none;
	padding: 1rem;
	cursor: pointer;
	&.active {
	color: #000000;
	}
	@media (max-width: 600px) {
	padding: 0.5rem;
	font-size: 0.9rem;
	}
`;

export const Bars = styled(FaBars)`
	display: none;
	color: #FFF;
	@media screen and (max-width: 768px) {
		display: block;
		position: absolute;
		top: 0;
		right: 0;
		transform: translate(-100%, 75%);
		font-size: 1.8rem;
		cursor: pointer;
	}
`;

export const NavMenu = styled.div`
	display: flex;
	align-items: center;
	margin-right: -24px;
	/* Second Nav */
	/* margin-right: 24px; */
	/* Third Nav */
	/* width: 100vw;
	white-space: nowrap; */
	@media screen and (max-width: 768px) {
		display: none;
	}
`;

export const NavBtn = styled.nav`
	display: flex;
	align-items: center;
	margin-right: 24px;
	cursor: pointer;

	/* Third Nav */
	/* justify-content: flex-end;
	width: 100vw; */
	@media screen and (max-width: 768px) {
		display: none;
	}
`;

export const NavBtnLink = styled(Link)`
	border-radius: 4px;
	background: #808080;
	padding: 10px 22px;
	color: #000000;
	outline: none;
	border: none;
	cursor: pointer;
	transition: all 0.2s ease-in-out;
	text-decoration: none;
	/* Second Nav */
	margin-left: 24px;
	&:hover {
		transition: all 0.2s ease-in-out;
		background: #fff;
		color: #808080;
	}
`;

export const StyledAppBar = styled(AppBar)`
	background-color: #2e466e;
`;

export const StyledToolbar = styled(Toolbar)`
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
`;