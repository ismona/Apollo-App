import Launch from './Launch'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ApolloClient, gql, InMemoryCache, useQuery, NetworkStatus } from '@apollo/client'
import { offsetLimitPagination } from '@apollo/client/utilities'
import { InView } from 'react-intersection-observer'

const cache = new InMemoryCache({
	typePolicies: {
		Query: {
			fields: {
				launchesPast: offsetLimitPagination(),
			},
		},
	},
})

const client = new ApolloClient({
	uri: 'https://api.spacex.land/graphql/',
	cache,
})

const LAUNCHES = gql`
	query Launches($offset: Int!, $limit: Int!) {
		launches: launchesPast(offset: $offset, limit: $limit, sort: "launch_date_local", order: "desc") {
			mission_name
			launch_date_local
			links {
				article_link
				video_link
			}
			rocket {
				rocket_name
				first_stage {
					cores {
						flight
						core {
							reuse_count
							status
						}
					}
				}
			}
			ships {
				name
				image
			}
			launch_success
		}
	}
`

const Page = () => {
	const { t } = useTranslation()

	const [fullyLoaded, setFullyLoaded] = useState(false)
	const { data, networkStatus, error, fetchMore, variables } = useQuery(LAUNCHES, {
		client,
		notifyOnNetworkStatusChange: true,
		variables: {
			offset: 0,
			limit: 10,
		},
	})

	// After checkbox is checks tableAttributes stores the selected value of the checkboxes.
	// I am not sure if this is the correct way of writing it down.
	// Attributes are then taken to launch.ts as props in "launch function"
	const [tableAttributes, setTableAttributes] = useState<{ attributes: any }>({
		attributes: ['mission','date','rocket','launch'],
	})
	
	
	const handleChange = (e: any) => {
		const { value, checked } = e.target
		const { attributes } = tableAttributes

	

		// Case 1 : The user checks the box
		if (checked) {
			setTableAttributes({
				attributes: [...attributes, value],
			})
		}

		// Case 2  : The user unchecks the box
		else {
			setTableAttributes({
				attributes: attributes.filter((e:any) => e !== value),
			})
		}
	}

	if (networkStatus === NetworkStatus.loading) {
		return <div>Loading...</div>
	}

	if (error) {
		return <div>{error.message}</div>
	}
	
	return (
		<>
			<div>
				<div className="inline-block mr-3 border-2 rounded-md py-2 px-3">
					<label htmlFor="mission" className="pr-2">
						{t('missionName')}
					</label>
					<input type="checkbox" id="mission" defaultChecked={tableAttributes.attributes} value="mission" name="mission" onChange={handleChange} />
				</div>
				<div className="inline-block mr-3 border-2 rounded-md py-2 px-3">
					<label htmlFor="date" className="pr-2">
						{t('launchDate')}
					</label>
					<input type="checkbox" id="date" defaultChecked={tableAttributes.attributes} value="date" onChange={handleChange} />
				</div>
				<div className="inline-block mr-3 border-2 rounded-md py-2 px-3">
					<label htmlFor="rocket" className="pr-2">
						{t('rocketName')}
					</label>
					<input type="checkbox" id="rocket" defaultChecked={tableAttributes.attributes} value="rocket" onChange={handleChange} />
				</div>

				<div className="inline-block border-2 rounded-md py-2 px-3">
					<label htmlFor="launch" className="pr-2">
						{t('launchSuccess')}
					</label>
					<input type="checkbox" id="launch" defaultChecked={tableAttributes.attributes} value="launch" onChange={handleChange} />
				</div>
			</div>

			<table className="shadow-md rounded-lg border-gray-200 my-5 overflow-hidden">
				<thead className="rounded-lg">
					<tr className="text-center">
						{tableAttributes.attributes.includes('mission') ? (
							<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
								{t('missionName')}
							</th>
						) : (
							''
						)}
						{tableAttributes.attributes.includes('date') ? (
							<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
								{t('launchDate')}
							</th>
						) : (
							''
						)}
						{tableAttributes.attributes.includes('rocket') ? (
							<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
								{t('rocketName')}
							</th>
						) : (
							''
						)}
						{tableAttributes.attributes.includes('launch') ? (
							<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
								{t('launchSuccess')}
							</th>
						) : (
							''
						)}
					</tr>
				</thead>
				<tbody>
					{data.launches.map((launch: any) => {
						return (
							<tr key={launch.mission_name}>
								<Launch launch={launch} attributes={tableAttributes} />
							</tr>
						)
					})}
				</tbody>
			</table>

			{variables && networkStatus !== NetworkStatus.fetchMore && data.launches.length % variables.limit === 0 && !fullyLoaded && (
				<InView
					onChange={async (inView) => {
						if (inView) {
							const result = await fetchMore({
								variables: {
									offset: data.launches.length,
								},
							})
							setFullyLoaded(!result.data.launches.length)
						}
					}}
				/>
			)}
		</>
	)
}

export default Page
