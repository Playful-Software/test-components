import type { ComponentDescription } from '@playful/runtime';
import chartXkcd from 'chart.xkcd';
import { Bar, Line, Pie, Radar, XY } from 'chart.xkcd-react';
import React, { useEffect, useRef } from 'react';

enum PositionType {
  upLeft = 1,
  upRight = 2,
  downLeft = 3,
  downRight = 4,
}

//
// Line Chart
//

type LineChartProperties = {
  title?: string;
  xLabel?: string;
  yLabel?: string;
  data: string;
  yTickCount?: number;
  showLegend?: boolean;
  legendPosition?: PositionType;
  unkcdify?: boolean;
  strokeColor?: string;
  backgroundColor?: string;
  fontFamily?: string;
};

function LineChart(props: LineChartProperties) {
  const {
    title,
    xLabel,
    yLabel,
    yTickCount,
    data,
    legendPosition,
    showLegend,
    strokeColor,
    backgroundColor,
    unkcdify,
    fontFamily,
  } = props;
  return (
    <Line
      config={{
        title,
        xLabel,
        yLabel,
        data: eval(`(${data})`) || {},
        options: {
          yTickCount,
          legendPosition,
          showLegend,
          strokeColor,
          backgroundColor,
          unkcdify,
          fontFamily,
        },
      }}
    />
  );
}

export const LineChartDescription: ComponentDescription = {
  name: 'LineChart',
  renderer: LineChart,
  extends: 'Play Kit/View',
  _meta: {
    title: 'Line Chart',
    description: 'The Line Chart Component ...',
    author: 'Playful Software', // TODO: userId or unique username?
    icon: '...', // TODO: local file?
    preview: '...', // TODO: local file?
    collection: 'chart.XKCD Kit',
    properties: {
      data: {
        type: 'string',
        default: `{
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    datasets: [
      {
        label: "Plan",
        data: [30, 70, 200, 300, 500, 800, 1500, 2900, 5000, 8000],
      },
      {
        label: "Reality",
        data: [0, 1, 30, 70, 80, 100, 50, 80, 40, 150],
      },
    ],
}`  ,
        editor: { type: 'MultilineString', fullWidthEditor: true },
      },
      title: { type: 'string', default: 'Title' },
      xLabel: { type: 'string', default: 'X' },
      yLabel: { type: 'string', default: 'Y' },
      /* TODO:
      dataColors: { type: "array", default: [?, ?, ?] },
      */
      yTickCount: {
        type: 'number',
        default: '3',
        editor: { type: 'Number', min: 0, max: 10 },
      },
      strokeColor: { type: 'string', default: 'black', editor: 'Color' },
      backgroundColor: { type: 'string', default: 'white', editor: 'Color' },
      fontFamily: {
        type: 'string',
        editor: 'FontFamily',
      },
      showLegend: { type: 'boolean', default: true },
      legendPosition: {
        type: 'number',
        default: PositionType.upLeft,
        editor: {
          type: 'Option',
          options: [
            PositionType.upLeft,
            PositionType.upRight,
            PositionType.downLeft,
            PositionType.downRight,
          ],
          // TODO: optionTitles: ["Up Left", "Up Right", "Down Left", "Down Right"],
        },
      },
      unxkcdify: { type: 'boolean', default: false },
      width: { type: 'number', default: 400 },
      height: { type: 'number', default: 267 },
    },
  },
};

//
// Bar Chart
//

type BarChartProperties = {
  title?: string;
  xLabel?: string;
  yLabel?: string;
  data: string;
  yTickCount?: number;
  unxkcdify?: boolean;
  strokeColor?: string;
  backgroundColor?: string;
  fontFamily?: string;
  // TODO: dataColors
};

function BarChart(props: BarChartProperties) {
  const {
    title,
    xLabel,
    yLabel,
    yTickCount,
    data,
    unxkcdify,
    strokeColor,
    backgroundColor,
    fontFamily,
  } = props;
  return (
    <Bar
      config={{
        title,
        xLabel,
        yLabel,
        data: eval(`(${data})`) || {},
        options: {
          yTickCount,
          unxkcdify,
          strokeColor,
          backgroundColor,
          fontFamily,
        },
      }}
    />
  );
}

export const BarChartDescription: ComponentDescription = {
  name: 'BarChart',
  title: 'Bar Chart',
  description: 'The Bar Chart Component ...',
  author: 'Playful Software', // TODO: userId or unique username?
  icon: '...', // TODO: local file?
  preview: '...', // TODO: local file?
  collection: 'chart.XKCD Kit',
  renderer: BarChart,
  extends: 'Play Kit/View',
  properties: {
    data: {
      type: 'string',
      default: `{
  labels: ["github stars", "patrons"],
  datasets: [
    {
      data: [100, 2],
    },
  ],
}`,
      editor: { type: 'MultilineString', fullWidthEditor: true },
    },
    title: { type: 'string', default: 'github stars VS patron number' },
    xLabel: { type: 'string', default: 'X' },
    yLabel: { type: 'string', default: 'Y' },
    yTickCount: {
      type: 'number',
      default: '2',
      editor: { type: 'Number', min: 0, max: 10 },
    },
    strokeColor: { type: 'string', default: 'black', editor: 'Color' },
    backgroundColor: { type: 'string', default: 'white', editor: 'Color' },
    fontFamily: {
      type: 'string',
      editor: 'FontFamily',
    },
    unxkcdify: { type: 'boolean', default: false },
    width: { type: 'number', default: 400 },
    height: { type: 'number', default: 267 },
  },
};

//
// Stacked Bar Chart
//

type StackedBarChartProperties = {
  title?: string;
  xLabel?: string;
  yLabel?: string;
  data: string;
  yTickCount?: number;
  unxkcdify?: boolean;
  strokeColor?: string;
  backgroundColor?: string;
  fontFamily?: string;
  showLegend?: boolean;
  legendPosition?: PositionType;
  // TODO: dataColors
};

function StackedBarChart(props: StackedBarChartProperties) {
  const {
    title,
    xLabel,
    yLabel,
    yTickCount,
    data,
    unxkcdify,
    strokeColor,
    backgroundColor,
    fontFamily,
    showLegend,
    legendPosition,
  } = props;
  return (
    <StackedBar
      config={{
        title,
        xLabel,
        yLabel,
        data: eval(`(${data})`) || {},
        options: {
          yTickCount,
          unxkcdify,
          strokeColor,
          backgroundColor,
          fontFamily,
          showLegend,
          legendPosition,
        },
      }}
    />
  );
}

export const StackedBarChartDescription: ComponentDescription = {
  name: 'StackedBarChart',
  title: 'Stacked Bar Chart',
  description: 'The Stacked Bar Chart Component ...',
  author: 'Playful Software', // TODO: userId or unique username?
  icon: '...', // TODO: local file?
  preview: '...', // TODO: local file?
  collection: 'chart.XKCD Kit',
  renderer: StackedBarChart,
  extends: 'Play Kit/View',
  properties: {
    data: {
      type: 'string',
      default: `{
  labels: ['Jan', 'Feb', 'Mar', 'April', 'May'],
  datasets: [{
    label: 'Issues',
    data: [12, 19, 11, 29, 17],
  }, {
    label: 'PRs',
    data: [3, 5, 2, 4, 1],
  }, {
    label: 'Merges',
    data: [2, 3, 0, 1, 1],
  }],
}`,
      editor: { type: 'MultilineString', fullWidthEditor: true },
    },
    title: { type: 'string', default: 'Issues and PR Submissions' },
    xLabel: { type: 'string', default: 'Month' },
    yLabel: { type: 'string', default: 'Count' },
    yTickCount: {
      type: 'number',
      default: '2',
      editor: { type: 'Number', min: 0, max: 10 },
    },
    strokeColor: { type: 'string', default: 'black', editor: 'Color' },
    backgroundColor: { type: 'string', default: 'white', editor: 'Color' },
    fontFamily: {
      type: 'string',
      editor: 'FontFamily',
    },
    showLegend: { type: 'boolean', default: true },
    legendPosition: {
      type: 'number',
      default: PositionType.upLeft,
      editor: {
        type: 'Option',
        options: [
          PositionType.upLeft,
          PositionType.upRight,
          PositionType.downLeft,
          PositionType.downRight,
        ],
        // TODO: optionTitles: ["Up Left", "Up Right", "Down Left", "Down Right"],
      },
    },
    unxkcdify: { type: 'boolean', default: false },
    width: { type: 'number', default: 400 },
    height: { type: 'number', default: 267 },
  },
};

//
// Pie Chart
//

type PieChartProperties = {
  title?: string;
  data: string;
  innerRadius?: number;
};

function PieChart(props: PieChartProperties) {
  const { title, innerRadius, data } = props;
  return (
    <Pie
      config={{
        title,
        data: eval(`(${data})`) || {},
        options: {
          // optional
          innerRadius,
          legendPosition: chartXkcd.config.positionType.upRight,
        },
      }}
    />
  );
}

export const PieChartDescription: ComponentDescription = {
  name: 'PieChart',
  title: 'Pie Chart',
  description: 'The Pie Chart Component ...',
  author: 'Playful Software', // TODO: userId or unique username?
  icon: '...', // TODO: local file?
  preview: '...', // TODO: local file?
  collection: 'chart.XKCD Kit',
  renderer: PieChart,
  extends: 'Play Kit/View',
  properties: {
    data: {
      type: 'string',
      default: `{
  labels: ["a", "b", "e", "f", "g"],
  datasets: [
    {
      data: [500, 200, 80, 90, 100],
    },
  ],
}`,
      editor: { type: 'MultilineString', fullWidthEditor: true },
    },
    title: { type: 'string', default: 'What Tim made of' },
    innerRadius: { type: 'number', default: 0.5 },
    strokeColor: { type: 'string', default: 'black', editor: 'Color' },
    backgroundColor: { type: 'string', default: 'white', editor: 'Color' },
    fontFamily: {
      type: 'string',
      editor: 'FontFamily',
    },
    showLegend: { type: 'boolean', default: true },
    legendPosition: {
      type: 'number',
      default: PositionType.upLeft,
      editor: {
        type: 'Option',
        options: [
          PositionType.upLeft,
          PositionType.upRight,
          PositionType.downLeft,
          PositionType.downRight,
        ],
        // TODO: optionTitles: ["Up Left", "Up Right", "Down Left", "Down Right"],
      },
    },
    unxkcdify: { type: 'boolean', default: false },
    width: { type: 'number', default: 400 },
    height: { type: 'number', default: 267 },
  },
};

//
// XY Chart
//

type XYChartProperties = {
  title?: string;
  data: string;
  xLabel?: string;
  yLabel?: string;
  xTickCount?: number;
  yTickCount?: number;
  showLine?: boolean;
  dotSize?: number;
  showLegend?: boolean;
  legendPosition?: PositionType;
  // TODO: timeFormat
  // TODO: dataColors
  unkcdify?: boolean;
  strokeColor?: string;
  backgroundColor?: string;
  fontFamily?: string;
};

function XYChart(props: XYChartProperties) {
  const {
    title,
    xLabel,
    yLabel,
    xTickCount,
    yTickCount,
    showLine,
    dotSize,
    data,
    showLegend,
    legendPosition,
    unkcdify,
    strokeColor,
    backgroundColor,
    fontFamily,
  } = props;
  return (
    <XY
      config={{
        title,
        xLabel,
        yLabel,
        data: eval(`(${data})`) || {},
        options: {
          //optional
          xTickCount,
          yTickCount,
          legendPosition,
          showLine,
          timeFormat: undefined,
          dotSize,
          showLegend,
          unkcdify,
          strokeColor,
          backgroundColor,
          fontFamily,
        },
      }}
    />
  );
}

export const XYChartDescription: ComponentDescription = {
  name: 'XYChart',
  title: 'XY Chart',
  description: 'The XY Chart Component ...',
  author: 'Playful Software', // TODO: userId or unique username?
  icon: '...', // TODO: local file?
  preview: '...', // TODO: local file?
  collection: 'chart.XKCD Kit',
  renderer: XYChart,
  extends: 'Play Kit/View',
  properties: {
    data: {
      type: 'string',
      default: `{
  datasets: [
    {
      label: "Pikachu",
      data: [
        { x: 3, y: 10 },
        { x: 4, y: 122 },
        { x: 10, y: 100 },
        { x: 1, y: 2 },
        { x: 2, y: 4 },
      ],
    },
    {
      label: "Squirtle",
      data: [
        { x: 3, y: 122 },
        { x: 4, y: 212 },
        { x: -3, y: 100 },
        { x: 1, y: 1 },
        { x: 1.5, y: 12 },
      ],
    },
  ],
}`,
      editor: { type: 'MultilineString', fullWidthEditor: true },
    },
    title: { type: 'string', default: 'Pokemon farms' },
    xLabel: { type: 'string', default: 'Coordinate' },
    yLabel: { type: 'string', default: 'Count' },
    showLine: { type: 'boolean', default: false },
    dotSize: { type: 'number', default: 1 },
    xTickCount: {
      type: 'number',
      default: '5',
      editor: { type: 'Number', min: 0, max: 8 },
    },
    yTickCount: {
      type: 'number',
      default: '5',
      editor: { type: 'Number', min: 0, max: 8 },
    },
    strokeColor: { type: 'string', default: 'black', editor: 'Color' },
    backgroundColor: { type: 'string', default: 'white', editor: 'Color' },
    fontFamily: {
      type: 'string',
      editor: 'FontFamily',
    },
    showLegend: { type: 'boolean', default: true },
    legendPosition: {
      type: 'number',
      default: PositionType.upRight,
      editor: {
        type: 'Option',
        options: [
          PositionType.upLeft,
          PositionType.upRight,
          PositionType.downLeft,
          PositionType.downRight,
        ],
        // TODO: optionTitles: ["Up Left", "Up Right", "Down Left", "Down Right"],
      },
    },
    unxkcdify: { type: 'boolean', default: false },
    width: { type: 'number', default: 400 },
    height: { type: 'number', default: 267 },
  },
};

//
// Radar Chart
//

type RadarChartProperties = {
  title?: string;
  xLabel?: string;
  yLabel?: string;
  data: string;
  showLabels?: boolean;
  ticksCount?: number;
  dotSize?: number;
  showLegend?: boolean;
  legendPosition?: PositionType;
  unkcdify?: boolean;
  strokeColor?: string;
  backgroundColor?: string;
  fontFamily?: string;
};

function RadarChart(props: RadarChartProperties) {
  const {
    title,
    data,
    ticksCount,
    dotSize,
    legendPosition,
    showLegend,
    strokeColor,
    backgroundColor,
    unkcdify,
    fontFamily,
    showLabels,
  } = props;
  return (
    <Radar
      config={{
        title,
        data: eval(`(${data})`) || {},
        options: {
          ticksCount,
          dotSize,
          legendPosition,
          showLegend,
          strokeColor,
          backgroundColor,
          unkcdify,
          fontFamily,
          showLabels,
        },
      }}
    />
  );
}

export const RadarChartDescription: ComponentDescription = {
  name: 'RadarChart',
  title: 'Radar Chart',
  description: 'The Radar Chart Component ...',
  author: 'Playful Software', // TODO: userId or unique username?
  icon: '...', // TODO: local file?
  preview: '...', // TODO: local file?
  collection: 'chart.XKCD Kit',
  renderer: RadarChart,
  extends: 'Play Kit/View',
  properties: {
    data: {
      type: 'string',
      default: `{
  labels: ['c', 'h', 'a', 'r', 't'],
  datasets: [{
    label: 'ccharrrt',
    data: [2, 1, 1, 3, 1],
  }, {
    label: 'chhaart',
    data: [1, 2, 2, 1, 1],
  }],
}`,
      editor: { type: 'MultilineString', fullWidthEditor: true },
    },
    title: { type: 'string', default: 'Letters in random words' },
    /* TODO:
    dataColors: { type: "array", default: [?, ?, ?] },
    */
    dotSize: { type: 'number', default: 1 },
    ticksCount: {
      type: 'number',
      default: '3',
      editor: { type: 'Number', min: 0, max: 10 },
    },
    strokeColor: { type: 'string', default: 'black', editor: 'Color' },
    backgroundColor: { type: 'string', default: 'white', editor: 'Color' },
    fontFamily: {
      type: 'string',
      editor: 'FontFamily',
    },
    showLabels: { type: 'boolean', default: false },
    showLegend: { type: 'boolean', default: true },
    legendPosition: {
      type: 'number',
      default: PositionType.upRight,
      editor: {
        type: 'Option',
        options: [
          PositionType.upLeft,
          PositionType.upRight,
          PositionType.downLeft,
          PositionType.downRight,
        ],
        // TODO: optionTitles: ["Up Left", "Up Right", "Down Left", "Down Right"],
      },
    },
    unxkcdify: { type: 'boolean', default: false },
    width: { type: 'number', default: 400 },
    height: { type: 'number', default: 267 },
  },
};

// TODO: Somehow the NPM package of chart.xkcd-react is out of date and doesn't export StackedBar.
// From https://github.com/obiwankenoobi/chart.xkcd-react
const StackedBar = ({ config }: { config: any }) => {
  const ref = useRef<any>();
  useEffect(() => {
    if (ref.current) {
      const myChart = new chartXkcd.StackedBar(ref.current, config);
    }
  });

  return <svg ref={ref} />;
};
