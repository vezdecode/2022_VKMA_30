import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';
import Button from '../components/Button';
import LOCATIONS from '../shared/consts/locations';

const MainPage = (): JSX.Element => {
	const ref = useRef(null);
	const router = useRouter();

	useEffect(() => {
		localStorage.clear();
	}, []);

	function routeToNewGame() {
		(ref as any).current.style.opacity = 0;

		setTimeout(() => {
			router.push('/game/new');
		}, 200);
	}

	return(
		<div className='p-8 bg-white' ref={ref}>
			<h1 className='font-bold text-3xl'>
				Находка для шпиона / Локации
			</h1>
			<ul className='mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
				{LOCATIONS.map((item, i) => (
					<h2 key={i} className='font-semibold'>
						{item}
					</h2>
				))}
			</ul>
			
			<div className='w-full flex justify-center mt-8'>
				<Button className='w-full md:w-1/2 xl:w-1/3' onClick={() => routeToNewGame()}>
					Начать играть!
				</Button>
			</div>
		</div>
	);
};

export default MainPage;

export const getStaticProps: GetStaticProps = async () => {
	return {
		props: {},
	};
};
