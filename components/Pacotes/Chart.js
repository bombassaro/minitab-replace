import React from 'react';
import {
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip} from 'recharts'

import {map} from 'lodash'

// const colorMatchedLine = `rgba(0,0,0,0.4)`
// const colorMatched = `rgba(200,230,210, 1)`
// const colorBack = `rgba(166, 216, 255, 1)`
const colorGreen = `#008000`
const colorBlue = `#198CFF`
const colorRed = `#781C2E`
const colorAlert = `#FF0000`
// const colorLine = `rgba(0,0,0,0.4)`

const Chart = ({CONTENT, RESUME}) => {
  const width = 600
  const height = 400
  if(!CONTENT || !RESUME) return false
  if(!RESUME.desvios) return false
  let CHART_DATA = []
  let MEDIA_GERAL = RESUME.desvios.MEDIA_GERAL
  let DESVIO_PADRAO = RESUME.desvios.DESVIO_PADRAO
  let SPECS_MIN = RESUME.specs.MIN
  let SPECS_MAX = RESUME.specs.MAX
  let SPECS_ALVO = RESUME.specs.ALVO
  let LIMITEC_INICIO = MEDIA_GERAL - (3 * DESVIO_PADRAO)
  let LIMITEC_FINAL = MEDIA_GERAL + (3 * DESVIO_PADRAO)
  map(CONTENT, (ITEM) => {
    const NEW_ITEM = {
      ...ITEM, 
      MEDIA_GERAL, 
      SPECS_MIN, 
      SPECS_MAX, 
      SPECS_ALVO,
      LIMITEC_INICIO,
      LIMITEC_FINAL
    }
    CHART_DATA.push(NEW_ITEM)
  })
  let DOMINIO_INICIO = MEDIA_GERAL - (4 * DESVIO_PADRAO)
  let DOMINIO_FINAL = MEDIA_GERAL + (4 * DESVIO_PADRAO)
  let DOMINIO = [DOMINIO_INICIO, DOMINIO_FINAL]
  let CORTE_MENOR = MEDIA_GERAL - (2 * DESVIO_PADRAO)
  let CORTE_MAIOR = MEDIA_GERAL + (2 * DESVIO_PADRAO)
  const CHART_MEDIA_DOT = (props) => {
    const {cx, cy, stroke, payload, value} = props
    if(value > CORTE_MAIOR || value < CORTE_MENOR) {
      return <circle r="3" stroke={colorAlert} fill={colorAlert} stroke-width="1" width="530" height="260" class="recharts-dot recharts-line-dot" cx={cx} cy={cy}></circle>
    }
    return <circle r="3" stroke={colorBlue} fill={colorBlue} stroke-width="1" width="530" height="260" class="recharts-dot recharts-line-dot" cx={cx} cy={cy}></circle>
  }

  return (
    <LineChart width={width} height={height} data={CHART_DATA}>
      <CartesianGrid strokeDasharray="3 3"/>
      <XAxis dataKey="ITEM"/>
      <YAxis orientation={`right`} domain={DOMINIO} />
      <Tooltip/>
      <Line 
        dot={null}
        type="linear"
        dataKey="MEDIA_GERAL" 
        stroke={colorGreen} 
        fill={colorGreen} 
        isAnimationActive={false} 
      />
      <Line 
        dot={null}
        type="linear"
        dataKey="SPECS_MIN" 
        strokeDasharray="5 5"
        stroke={colorRed} 
        fill={colorRed} 
        isAnimationActive={false} 
      />
      <Line 
        dot={null}
        type="linear"
        dataKey="SPECS_MAX" 
        strokeDasharray="5 5"
        stroke={colorRed} 
        fill={colorRed} 
        isAnimationActive={false} 
      />
      <Line 
        dot={null}
        type="linear"
        dataKey="SPECS_ALVO" 
        strokeDasharray="5 5"
        stroke={colorRed} 
        fill={colorRed} 
        isAnimationActive={false} 
      />
      <Line 
        dot={null}
        type="linear"
        dataKey="LIMITEC_INICIO" 
        stroke={colorRed} 
        fill={colorRed} 
        isAnimationActive={false} 
      />
      <Line 
        dot={null}
        type="linear"
        dataKey="LIMITEC_FINAL" 
        stroke={colorRed} 
        fill={colorRed} 
        isAnimationActive={false} 
      />
      <Line 
        type="linear"
        dataKey="MEDIA" 
        stroke={colorBlue} 
        fill={colorBlue} 
        isAnimationActive={false} 
        dot={<CHART_MEDIA_DOT />}
      />
    </LineChart>
  );
}

export default Chart