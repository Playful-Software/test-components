import type { ComponentDescription } from '@playful/runtime';
import React, { useEffect, useRef, useState } from 'react';
import Clock from 'react-clock';
import { createUseStyles } from 'react-jss';
import TimezoneSelect, { TimezoneSelectOption } from 'react-timezone-select';
import spacetime from 'spacetime';

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
  showSecondHand: boolean;
  showMinuteHand: boolean;
};

function ClockRenderer(props: ClockProps) {
  const [value, setValue] = useState(new Date());
  const intervalRef = useRef<number | null>(null);
  const classes = useStyles(props);

  const {
    timezone,
    showNumbers,
    showMinuteMarks,
    showHourMarks,
    showSecondHand,
    showMinuteHand,
  } = props;

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
        renderSecondHand={showSecondHand}
        renderMinuteHand={showMinuteHand}
      />
    </div>
  );
}

function changeTimezone(date: Date, ianatz: string) {
  let st = spacetime(date);
  st = st.goto(ianatz);
  return new Date(
    st.year(),
    st.month(),
    st.day(),
    st.hour(),
    st.minute(),
    st.second(),
    st.millisecond()
  );
}

const ClockPrototype = {
  _proportionalSizing: true,
};

export const ClockDescription: ComponentDescription = {
  name: 'Clock',
  renderer: ClockRenderer,
  extends: 'Play Kit/View',
  prototype: ClockPrototype,
  _meta: {
    title: 'Clock',
    description: 'The Clock Component ...',
    author: 'Playful Software',
    properties: {
      width: { type: 'number', title: 'Width', default: 100 },
      height: { type: 'number', title: 'Height', default: 100 },
      handColor: { type: 'string', title: 'Hand Color', default: 'white', editor: 'Color' },
      faceColor: { type: 'string', title: 'Face Color', default: 'white', editor: 'Color' },
      numberColor: { type: 'string', title: 'Number Color', default: 'white', editor: 'Color' },
      borderColor: { type: 'string', title: 'Border Color', default: 'white', editor: 'Color' },
      showNumbers: { type: 'boolean', title: 'Show Numbers', default: false },
      showMinuteMarks: { type: 'boolean', title: 'Show Minute Marks', default: true },
      showHourMarks: { type: 'boolean', title: 'Show Hour Marks', default: true },
      showSecondHand: { type: 'boolean', title: 'Show Second Hand', default: true },
      showMinuteHand: { type: 'boolean', title: 'Show Minute Hand', default: true },
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
  },
};
