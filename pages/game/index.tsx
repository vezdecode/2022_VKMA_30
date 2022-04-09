import bridge from '@vkontakte/vk-bridge';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import Button from '../../components/Button';
import { screens } from '../../shared/types/game';

const GamePage = (): JSX.Element => {
	const ref = useRef(null);
	const router = useRouter();
	const [currentPlayer, setCurrentPlayer] = useState<number>(0);
	const [counter, setCounter] = useState<number>(-1);
	const [screen, setScreen] = useState<screens>('common');
	const [playersCount, setPlayersCount] = useState<number>(0);
	const [players, setPlayers] = useState<boolean[]>([]);
	const [location, setLocation] = useState<string>('');
	
	useEffect(() => {
		if (localStorage.getItem('playersCount')) {
			setPlayersCount(Number(localStorage.getItem('playersCount')));
			setCounter(Number(localStorage.getItem('playersCount')) * 60);
		};
		if (localStorage.getItem('players'))
			setPlayers(JSON.parse(localStorage.getItem('players')));
		if (localStorage.getItem('location'))
			setLocation(localStorage.getItem('location'));
	}, []);

	useEffect(() => {
		screen==='playing' && counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);

		if (counter === 0)
			bridge.send('VKWebAppFlashSetLevel', { 'level': 1 });		
	}, [counter, screen]);

	const newPlayer = () => {
		if ((currentPlayer + 1) < playersCount) {
			setCurrentPlayer(currentPlayer+1);
			setScreen('common');
		}
		else {
			setCurrentPlayer(0);
			setScreen('playing');
		}
	};

	const endGame = () => {
		bridge.send('VKWebAppFlashSetLevel', { 'level': 0 });	
		(ref as any).current.style.opacity = 0;

		setTimeout(() => {
			router.push('/');
		}, 200);
	};

	function getContent(){
		switch (screen) {
			case 'common':
				return(
					<div className='mt-8'>
						<p className='font-semibold text-xl'>
							Привет! Настала твоя очередь узнать свою роль. Для этого просто нажми на кнопку
						</p>
						<Button className='px-16 mt-4' onClick={() => setScreen('personal')}>
							Показать мою роль
						</Button>
					</div>
				);
			case 'personal':
				return(
					<div className='mt-8'>
						<p className='font-semibold text-xl'>
							{players[currentPlayer] ? 
								(`Ты шпион. Не раскрой себя! Твоя задача выжить всего 
									${playersCount} минут, ты справишься!`) 
								: (`Ты обычный житель. Твоя задача максимально быстро раскрыть шпиона и выиграть игру. 
								Локация: ${location}`)}
						</p>

						<Button className='px-16 mt-4' onClick={() => newPlayer()}>
							Хорошо, я понял
						</Button>
					</div>
				);
			case 'playing':
				return(
					<div className='mt-8'>
						<p className='font-semibold text-xl'>
							Игра идет. Удачи обеим сторонам! Да победит сильнейший!
						</p>
						
						{counter === 0 ? (
							<div>
								<p className='font-semibold text-xl mt-2'> 
									Игра окончена. Спасибо!
								</p>

								<Button className='px-20 mt-1' onClick={() => endGame()}>
									Выйти
								</Button>
							</div>
						) : (
							<p className='font-semibold text-xl'> 
								До конца: 
								{' '}
								<span className='text-staticPrimary font-bold text-lg'>
									{Math.floor(counter/60)}
									м
									{' '}
									{counter%60}	
									с
								</span>
							</p>
						)}
					</div>
				);
		};
	}

	return(
		<div className='p-8 bg-white h-screen' ref={ref}>
			<header>
				<h1 className='font-semibold text-3xl'>
					Находка для шпиона!
					{' '}
					<span className='text-staticPrimary font-bold'>
						{playersCount}
						{' '}
						{playersCount % 10 === 1 && 'игрок'}
						{playersCount % 10 > 1 && playersCount % 10 <= 4 && 'игрока'}
						{playersCount % 10 > 4 && 'игроков'}
					</span>
				</h1>

				{screen != 'playing' && (
					<h2 className='text-2xl'>
						Игрок
						{' '}
						<span className='text-staticPrimary font-bold'>
							№
							{currentPlayer + 1}	
						</span>
					</h2>
				)}
			</header>

			{getContent()}
		</div>
	);
};

export default GamePage;
