import React from 'react';
import { View } from 'react-native';
import JobServiceActionClient from './actions/JobServiceActionClient';
import JobServiceActionBusiness from './actions/JobServiceActionBusiness';
import { IJobData } from './../../redux/interfaces/job';

interface IJobServiceScreenActionsProps {
    job: IJobData
}

const JobServiceScreenActions = ({job}: IJobServiceScreenActionsProps) => {
	return (
		<View
			style={{
				flex: 1,
				flexDirection: 'row',
				alignItems: 'flex-end',
				justifyContent: 'space-evenly',
				paddingBottom: 10
			}}
		>
			<View
				style={{
					width: '45%',
					marginBottom: 10
				}}
			>
				<JobServiceActionClient job={job} />
			</View>

			<View
				style={{
					width: '45%',
					marginBottom: 10
				}}
			>
				<JobServiceActionBusiness job={job} />
			</View>

		</View>
	);
};

export default JobServiceScreenActions;
