import { Fragment } from 'react'
import { Link } from 'react-router-dom'

// attributes are from page.ts checkboxes
// data are passed to Detail page using Link - where we can pass an object with pathname and state

const Launch = (props: any) => {
	return (
		<Fragment>
			{props.attributes.attributes.includes('mission') ? (
				<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
					<Link to={{pathname: '/detail', state: {launch: props.launch}}}>{props.launch.mission_name}</Link>
				</td>
			) : (
				''
			)}
			{props.attributes.attributes.includes('date') ? (
				<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{props.launch.launch_date_local}</td>
			) : (
				''
			)}
			{props.attributes.attributes.includes('rocket') ? (
				<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{props.launch.rocket.rocket_name}</td>
			) : (
				''
			)}
			{props.attributes.attributes.includes('launch') ? (
				<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{props.launch.launch_success === true ? 'true' : 'false'}</td>
			) : (
				''
			)}
		</Fragment>
	)
}

export default Launch
