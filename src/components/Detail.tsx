import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import Video from './Video'

const Detail = (props: any) => {
	const { t } = useTranslation()
	const {state: {launch} } = useLocation<{launch: any}>()

	return (
		<div className="flex align-center justify-center flex-col w-2/4 mx-auto mt-5">
			<h2>{t('title')}</h2>
			<h2 className="text-4xl my-5">{launch.mission_name}</h2>
			<Video url={launch.links.video_link}/>
		</div>
	)
}

export default Detail
