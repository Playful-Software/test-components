import type { KitDescription } from "@playful/runtime";
import { ThreeDescription } from "./r3f";
import { XKCDDescription } from "./xkcd";
import {
  LineChartDescription,
  BarChartDescription,
  PieChartDescription,
  XYChartDescription,
  StackedBarChartDescription,
  RadarChartDescription,
} from "./chart.xkcd/chart-xkcd";

export {
  ThreeDescription,
  XKCDDescription,
  LineChartDescription,
  BarChartDescription,
  PieChartDescription,
  XYChartDescription,
  StackedBarChartDescription,
  RadarChartDescription,
};

export const kit: KitDescription = {
  title: "React Test Kit",
  description: "React Test Kit contains React components used to test Play.",
  author: "Playful Software",
  components: [
    ThreeDescription,
    XKCDDescription,
    LineChartDescription,
    BarChartDescription,
    PieChartDescription,
    XYChartDescription,
    StackedBarChartDescription,
    RadarChartDescription,
  ],
};
