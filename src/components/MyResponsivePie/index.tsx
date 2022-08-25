// yarn add @nivo/core @nivo/pie
import React from 'react';
import { ResponsivePie } from '@nivo/pie';

const data = [
  {
    id: 'stylus',
    label: 'stylus',
    value: 312,
    color: 'hsl(251, 70%, 50%)',
  },
  {
    id: 'haskell',
    label: 'haskell',
    value: 261,
    color: 'hsl(130, 70%, 50%)',
  },
  {
    id: 'lisp',
    label: 'lisp',
    value: 581,
    color: 'hsl(44, 70%, 50%)',
  },
  {
    id: 'erlangs',
    label: 'erlangs',
    value: 478,
    color: 'hsl(254, 70%, 50%)',
  },
  {
    id: 'css',
    label: 'css',
    value: 120,
    color: 'hsl(316, 70%, 50%)',
  },
];

export const MyResponsivePie = () => (
  <div style={{ width: 380, height: 380 }}>
    <ResponsivePie
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={2}
      cornerRadius={3}
      activeOuterRadiusOffset={4}
      borderWidth={0.4}
      borderColor={{
        from: 'color',
        modifiers: [['darker', 0.5]],
      }}
      arcLinkLabelsSkipAngle={4}
      arcLinkLabelsTextColor={{ from: 'color' }} //'#333333'
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: 'color' }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: 'color',
        modifiers: [['darker', 2]],
      }}
      onClick={console.log}
      defs={[
        {
          id: 'dots',
          type: 'patternDots',
          background: 'blue',
          color: 'rgba(255, 255, 255, 0.3)',
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: 'lines',
          type: 'patternLines',
          background: 'blue',
          color: 'rgba(255, 255, 255, 0.3)',
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
    />
  </div>
);
