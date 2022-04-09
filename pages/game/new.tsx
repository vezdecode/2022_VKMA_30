import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';

const CreateGamePage = (): JSX.Element => {
	const ref = useRef(null);
	const router = useRouter();
	const [currentValue, setCurrentValue] = useState<string>('');

	const createGame = () => {
		localStorage.playersCount = Number(currentValue);

		var _players = new Array(Number(currentValue)).fill(false);
		const agentID = Math.floor(Math.random() * Number(currentValue));
		_players[agentID] = true;

		localStorage.players = JSON.stringify(_players);

		(ref as any).current.style.opacity = 0;

		setTimeout(() => {
			router.push('/game');
		}, 200);
	};

	return(
		<div className='p-8 bg-white h-screen' ref={ref}>
			<h1 className='font-bold text-3xl'>
				Создание игры
			</h1>

			<Input 
				className='mt-4 md:w-2/3'
				value={currentValue}
				onChange={(e) => setCurrentValue(e.target.value)}
				placeholder='Количество игроков' />

			<Button className='w-full md:w-1/2 xl:w-1/3 mt-4' onClick={() => createGame()}>
				Создать игру
			</Button>
		</div>
	);
};

export default CreateGamePage;
