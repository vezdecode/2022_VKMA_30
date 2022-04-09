import { AppProps } from 'next/app';
import bridge from '@vkontakte/vk-bridge';
import Head from 'next/head';

import '../styles/globals.css';
import '../styles/font.css';

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
	bridge.send('VKWebAppInit', {});

	return (
		<html>
			<Head>
				<title>
					VKMA30
				</title>
			</Head>
			<Component {...pageProps} />
		</html>
	);
};

export default App;
