import './challengeexcerpt.scss';
import { Marble } from '../../containers/Topnav/imports';

import { useState } from 'react';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

type ChallengeProps = {
    challenge: { name: string, desc: string, level: number }
}

const ChallengeExcerpt = (props: ChallengeProps) => {

    const normalise = (value: number, MIN: number, MAX: number) => ((value - MIN) * 100) / (MAX - MIN);

    const  LinearProgressWithLabel = (props: LinearProgressProps & { value: number }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
              <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
              <Typography variant="body2" color="text.secondary">{`${Math.round(
                props.value,
              )}%`}</Typography>
            </Box>
          </Box>
        );
    }

    const [progress, setProgress] = useState(normalise(1000, 0, 2000));

    const challenge = props.challenge;
    const name = challenge.name;
    const desc = challenge.desc;
    const level = challenge.level;

    
    const reward = level === 1 ? 100 : level === 2 ? 250 : 500; 

    const content = (
        <div className='challenge-excerpt'>
            <div className="challenge-excerpt_level"><p>{level}</p></div>
            <div className="challenge-excerpt_content">
                <p>{name}</p>
                <p>{desc}</p>
                <Box sx={{ width: '100%' }}>
                    <LinearProgressWithLabel value={progress} />
                </Box>
            </div>
            <div className="challenge-excerpt_reward">
                <img src={Marble} alt="Marble" />
                <p>{reward}</p>
            </div>
        </div>
    )

    return content;
}

export default ChallengeExcerpt