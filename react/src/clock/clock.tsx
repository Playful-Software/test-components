import type { ComponentDescription } from '@playful/runtime';
import React, { useEffect, useRef, useState } from 'react';
import Clock from 'react-clock';
import { createUseStyles } from 'react-jss';
import TimezoneSelect, { TimezoneSelectOption } from 'react-timezone-select';

const useStyles = createUseStyles<'react_clock', ClockProps>({
  react_clock: {
    MozBoxSizing: 'border-box',
    WebkitBoxSizing: 'border-box',
    boxSizing: 'border-box',
    '&:before': {
      MozBoxSizing: 'border-box',
      WebkitBoxSizing: 'border-box',
      boxSizing: 'border-box',
    },
    '&:after': {
      MozBoxSizing: 'border-box',
      WebkitBoxSizing: 'border-box',
      boxSizing: 'border-box',
    },
    '& .react-clock__face': {
      position: 'absolute',
      top: '0',
      bottom: '0',
      left: '0',
      right: '0',
      border: (props) => `1px solid ${props.borderColor}`,
      borderRadius: '50%',
    },
    '& .react-clock__hand': {
      position: 'absolute',
      top: '0',
      bottom: '0',
      left: '50%',
      right: '50%',
    },
    '& .react-clock__hand__body': {
      position: 'absolute',
      backgroundColor: (props) => props.handColor,
      transform: 'translateX(-50%)',
    },
    '& .react-clock__mark': {
      position: 'absolute',
      top: '0',
      bottom: '0',
      left: '50%',
      right: '50%',
    },
    '& .react-clock__mark__body': {
      position: 'absolute',
      backgroundColor: (props) => props.faceColor,
      transform: 'translateX(-50%)',
    },
    '& .react-clock__mark__number': {
      position: 'absolute',
      left: '-40px',
      width: '80px',
      textAlign: 'center',
      color: (props) => props.numberColor,
    },
  },
});

type ClockProps = {
  handColor: string;
  faceColor: string;
  numberColor: string;
  borderColor: string;
  timezone: string;
  showNumbers: boolean;
  showMinuteMarks: boolean;
  showHourMarks: boolean;
};

function ClockRenderer(props: ClockProps) {
  const [value, setValue] = useState(new Date());
  const intervalRef = useRef<number | null>(null);
  const classes = useStyles(props);
  console.log();
  const { timezone, showNumbers, showMinuteMarks, showHourMarks } = props;
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      let newDate = new Date();
      if (timezone) {
        newDate = changeTimezone(newDate, timezone);
      }
      setValue(newDate);
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timezone]);

  return (
    <div>
      <Clock
        value={value}
        className={classes.react_clock}
        renderHourMarks={showHourMarks}
        renderMinuteMarks={showMinuteMarks}
        renderNumbers={showNumbers}
      />
    </div>
  );
}

// This is a dubious stack overflow solution.
function changeTimezone(date: Date, ianatz: string) {
  // suppose the date is 12:00 UTC
  const dateString = date.toLocaleString('en-US', {
    timeZone: ianatz,
  });
  const invdate = new Date(dateString);

  // then invdate will be 07:00 in Toronto
  // and the diff is 5 hours
  const diff = date.getTime() - invdate.getTime();

  // so 12:00 in Toronto is 17:00 UTC
  return new Date(date.getTime() - diff); // needs to substract
}

const ClockPrototype = {
  _proportionalSizing: true,
};

export const ClockDescription: ComponentDescription = {
  name: 'Clock',
  title: 'Clock',
  description: 'The Clock Component ...',
  author: 'Playful Software',
  renderer: ClockRenderer,
  extends: 'Play Kit/View',
  prototype: ClockPrototype,
  properties: {
    width: { type: 'number', title: 'Width', default: 100 },
    height: { type: 'number', title: 'Height', default: 100 },
    handColor: { type: 'string', title: 'Hand Color', default: 'black', editor: 'Color' },
    faceColor: { type: 'string', title: 'Face Color', default: 'black', editor: 'Color' },
    numberColor: { type: 'string', title: 'Number Color', default: 'black', editor: 'Color' },
    borderColor: { type: 'string', title: 'Border Color', default: 'black', editor: 'Color' },
    showNumbers: { type: 'boolean', title: 'Show Numbers', default: false },
    showMinuteMarks: { type: 'boolean', title: 'Show Minute Marks', default: true },
    showHourMarks: { type: 'boolean', title: 'Show Hour Marks', default: true },
    timezone: {
      type: 'string',
      title: 'Time Zone',
      editor: {
        type: 'String',
        component: ({ value, onValueChange }) => {
          const handleChange = (timezone: TimezoneSelectOption) => {
            onValueChange(timezone.value);
          };
          return (
            <TimezoneSelect
              value={value}
              onChange={handleChange}
              styles={{
                option: (provided: any) => ({
                  ...provided,
                  color: 'black',
                }),
              }}
            />
          );
        },
      },
    },
  },
};
