import YouTube, { YouTubeProps } from 'react-youtube'

const Video = (props: any) => {
	// getting Id from url, this should be better done with regex probably
	let link: string = props.url
	let id = link.substring(link.length -11)

	const onPlayerReady: YouTubeProps['onReady'] = (event) => {
		// access to player in all event handlers via event.target
		event.target.playVideo()
	}

	const opts: YouTubeProps['opts'] = {
		height: '390',
		width: '640',
		playerVars: {
			autoplay: 1,
			src: props.url,
		},
	}

	return <YouTube videoId={id} opts={opts} onReady={onPlayerReady} />
}

export default Video
