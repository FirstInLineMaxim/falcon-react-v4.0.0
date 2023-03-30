import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge, Card } from 'react-bootstrap';
import Flex from 'components/common/Flex';
import { getColor, rgbaColor } from 'helpers/utils';
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';

import {
  GridComponent,
  TooltipComponent,
  TitleComponent
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import BasicECharts from 'components/common/BasicEChart';

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LineChart,
  CanvasRenderer
]);

const getOptions = (data, latestPercent) => ({
  tooltip: {
    trigger: 'axis',
    formatter: '<strong>{b0}</strong> : {c0}'
  },
  xAxis: {
    data: ['90Days', '60Days', '30Days', '7Days', '24Hours', '1Hour', 'Current']
  },
  series: [
    {
      type: 'line',
      data,
      smooth: true,
      lineStyle: {
        color: getLineStyle(latestPercent).line,
        width: 3
      },

      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: rgbaColor(getColor(getLineStyle(latestPercent).area), 0.25)
            },
            {
              offset: 1,
              color: rgbaColor(getColor(getLineStyle(latestPercent).area), 0)
            }
          ]
        }
      }
    }
  ],
  grid: {
    bottom: '2%',
    top: '2%',
    right: '10px',
    left: '10px'
  }
});
const getStyle = data => {
  const isPositive = Math.sign(data);
  if (isPositive === 1) {
    return { icon: 'caret-up', text: 'text-primary' };
  } else {
    return { icon: 'caret-down', text: 'text-danger' };
  }
};
const getLineStyle = data => {
  const isPositive = Math.sign(data);
  if (isPositive === 1) {
    return { line: '#3988f7', area: 'primary' };
  } else {
    return { line: '#f17300', area: 'danger' };
  }
};
const TotalOrder = ({ data }) => {
  const { price, name, percent_change_1h } = data;
  return (
    <Card className="h-md-100">
      <Card.Header className="pb-0">
        <h6 className="mb-0 mt-2">{name}</h6>
      </Card.Header>

      <Card.Body
        as={Flex}
        alignItems="end"
        justifyContent="between"
        className="pt-0"
      >
        <div>
          <h2 className="fw-normal text-700 mb-1 lh-1">
            {parseFloat(price[price.length - 1]).toFixed(2)}$
          </h2>
          <span> Last 24h </span>
          <Badge
            pill
            bg="200"
            className={getStyle(percent_change_1h).text + ' fs--2'}
          >
            <FontAwesomeIcon
              icon={getStyle(percent_change_1h).icon}
              className="me-1"
            />
            {parseFloat(percent_change_1h).toFixed(2)}%
          </Badge>
        </div>
        <div className="ps-0">
          <BasicECharts
            echarts={echarts}
            options={getOptions(data.price, percent_change_1h)}
            style={{ width: '8.5rem', height: 90 }}
          />
        </div>
      </Card.Body>
    </Card>
  );
};

TotalOrder.propTypes = { data: PropTypes.object.isRequired };

export default TotalOrder;
