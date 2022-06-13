import { useTranslation } from 'react-i18next'
import Page from './Page'

const Home = () => {
	const { t, i18n } = useTranslation()
	
	return (
		<div className="flex align-center justify-center flex-col w-2/4 mx-auto">
			<div className='mt-3'>
				<button className='px-2 py-1  mr-2 border border-transparent text-base font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700' onClick={() => i18n.changeLanguage('sk')}>sk</button>
				<button className='px-2 py-1 border border-transparent text-base font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700' onClick={() => i18n.changeLanguage('en')}>en</button>
			</div>
			<h2 className='text-4xl my-3'>{t('title')}</h2>
			<Page />
		</div>
	)
}

export default Home
