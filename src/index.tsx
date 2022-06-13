import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

import { I18nextProvider } from 'react-i18next'
import i18next from 'i18next'

import { BrowserRouter } from 'react-router-dom'

i18next.init({
	interpolation: { escapeValue: false },
	lng: 'en',
	resources: {
		en: {
			translation: {
				title: 'List of SpaceX Missions',
				missionName: 'Mission Name',
				launchDate: 'Launch Date',
				rocketName: 'Rocket Name',
				launchSuccess: 'Launch Success',
			},
		},
		sk: {
			translation: {
				title: 'Zoznam SpaceX misií',
				missionName: 'Názov misie',
				launchDate: 'Dátum vzletu',
				rocketName: 'Meno rakety',
				launchSuccess: 'Úspešnosť vzletu',
			},
		},
	},
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<React.StrictMode>
		<I18nextProvider i18n={i18next}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</I18nextProvider>
	</React.StrictMode>
)

reportWebVitals()
