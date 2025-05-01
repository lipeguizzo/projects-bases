import { Box, Tabs as MuiTabs, Tab } from '@mui/material';
import { ReactNode, SyntheticEvent } from 'react';

interface Props {
  tabs: string[];
  value: number;
  children: ReactNode;
  handleChange: (event: SyntheticEvent, newValue: number) => void;
}

export function Tabs({ tabs, value, handleChange, children }: Props) {
  return (
    <Box>
      <MuiTabs
        variant="fullWidth"
        textColor="secondary"
        indicatorColor="secondary"
        value={value}
        onChange={handleChange}
      >
        {tabs.map((tab) => (
          <Tab label={tab} key={tab} />
        ))}
      </MuiTabs>
      {children}
    </Box>
  );
}
