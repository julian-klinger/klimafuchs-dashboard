import React from 'react';
import gql from 'graphql-tag'
import { Query } from 'react-apollo';
import { CardTitle, CardText, Jumbotron, Row, Col } from 'reactstrap';
import Time from 'react-time-format';
import { SeasonPlans } from '../season_management/_seasonPlans';

const CURRENT_SEASON = gql`
	query currentSeason {
		currentSeason {
			id
		startDate
		startOffsetDate
		endDate
		title
			seasonPlan {
				id
			}		
		}
	}
 `

const SEASON_PLANS = gql`
	query seasonPlans { 
		seasonPlans {
			id
				themenwoche {
					title
				}
			duration
			position
			season {
				id
			}
		}
	}
`


export class Stats extends React.Component {

	secondsInDays = (seconds) => {
		let result = Math.round(seconds / 86400)
		return ((result === 1) ? result + " day" : result + " days")
	}

	render() {
		return (
			<div>
				<h2>Current Season</h2>
				<Query query={CURRENT_SEASON}>
					{({ loading, error, data, refetch }) => {
						if (loading) return <div>its loading</div>;
						if (error) return <div>${error.message}</div>;
						let CurrentSeasonID = data.currentSeason.id
						return (
							<div>

								<Jumbotron className={`shadow-sm my-3 py-4 px-4 `} key={data.currentSeason.id}>

									<CardTitle>
										{data.currentSeason.title}
										
									</CardTitle>
									<CardText className="small">
										Season starts at: <Time value={data.currentSeason.startDate} format="DD.MM.YYYY"></Time> |
                          First Topicweek starts at: <Time value={data.currentSeason.startOffsetDate} format="DD.MM.YYYY"></Time> |
                          Season ends at: <Time value={data.currentSeason.endDate} format="DD.MM.YYYY"></Time> |
                          ID: {data.currentSeason.id}
									</CardText>
									<SeasonPlans season={data.currentSeason} />
								</Jumbotron>

							</div>
						)
					}}
				</Query>
			</div>
		)
	}
}
