import styled from '@emotion/styled';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;


export const FavContainer = styled.div`
	width: 95vw;
	display: grid;
	grid-template-columns: repeat(1, minmax(0, 1fr));
	@media (min-width: 768px) {
		width: 700px;
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}
`;

export const TitleContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 10px;
`;
