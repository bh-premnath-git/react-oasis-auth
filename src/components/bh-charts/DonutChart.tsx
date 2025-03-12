import React, { useMemo } from "react"
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Sector,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { colorPalettes } from "@/components/bh-charts"

interface DonutChartData {
  name: string;
  value: number | string;
  color?: string;
  [key: string]: string | number | undefined;  // Index signature for dynamic access
}

interface DonutChartProps {
  data: DonutChartData[];
  dataKey?: string;
  nameKey?: string;
  colors?: string[];
  config?: Record<string, any>;
}

export const DonutChart: React.FC<DonutChartProps> = ({ 
  data, 
  dataKey = "value",
  nameKey = "name",
  colors = colorPalettes.supersetColors,
  config = {}
}) => {
  // Process data for the chart
  const processedData = useMemo(() => {
    if (!data || data.length === 0) return [];
    
    return data.map((item, index) => {
      const newItem = { ...item };
      const value = newItem[dataKey];
      
      // Ensure value is a number
      if (typeof value === 'string') {
        newItem[dataKey] = Number(value.replace(/[$,]/g, ''));
      }
      
      // If still not a number, default to 0
      if (typeof newItem[dataKey] !== 'number' || isNaN(newItem[dataKey] as number)) {
        newItem[dataKey] = 0;
      }
      
      // Add color if not present
      if (!newItem.color) {
        newItem.color = colors[index % colors.length];
      }
      
      return newItem;
    });
  }, [data, dataKey, colors]);

  // Calculate total for percentage display
  const total = useMemo(() => {
    if (!processedData.length) return 0;
    return processedData.reduce((sum, item) => sum + (Number(item[dataKey]) || 0), 0);
  }, [processedData, dataKey]);

  if (!processedData.length) {
    return (
      <div className="flex items-center justify-center h-[300px] text-muted-foreground">
        No data available for donut chart
      </div>
    );
  }

  // Inner and outer radius configuration
  const innerRadius = config.innerRadius !== undefined ? config.innerRadius : 60;
  const outerRadius = config.outerRadius !== undefined ? config.outerRadius : 80;

  // Active shape for hover effect
  const renderActiveShape = (props: any) => {
    const {
      cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, name, value
    } = props;
    
    const percentage = ((value / total) * 100).toFixed(1);
    const displayValue = config.valueFormatter ? config.valueFormatter(value) : value.toLocaleString();
    
    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 5}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        {config.showActiveLabels !== false && (
          <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central">
            <tspan x={cx} y={cy - 10} textAnchor="middle" fill="#333" fontSize={14} fontWeight="bold">
              {name}
            </tspan>
            <tspan x={cx} y={cy + 10} textAnchor="middle" fill="#666" fontSize={12}>
              {displayValue} ({percentage}%)
            </tspan>
          </text>
        )}
      </g>
    );
  };

  // Handle formatter based on config
  const formatter = (value: any, name: string, _props: any) => {
    // Calculate percentage
    const percentage = ((value / total) * 100).toFixed(1);
    
    // Use custom formatter if provided
    if (config.valueFormatter) {
      return [`${config.valueFormatter(value)} (${percentage}%)`, name];
    }
    
    // Default formatter
    return [`${value.toLocaleString()} (${percentage}%)`, name];
  };

  // State for active index
  const [activeIndex, setActiveIndex] = React.useState(-1);
  
  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };
  
  const onPieLeave = () => {
    setActiveIndex(-1);
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsPieChart>
        <Pie
          data={processedData}
          cx="50%"
          cy="50%"
          labelLine={config.labelLine !== false}
          activeIndex={config.activeShape !== false ? activeIndex : undefined}
          activeShape={config.activeShape !== false ? renderActiveShape : undefined}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          fill="#8884d8"
          dataKey={dataKey}
          nameKey={nameKey}
          onMouseEnter={onPieEnter}
          onMouseLeave={onPieLeave}
          paddingAngle={config.paddingAngle || 2}
        >
          {processedData.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={entry.color || colors[index % colors.length]} 
              stroke={config.cellStroke || "#fff"}
              strokeWidth={config.cellStrokeWidth || 1}
            />
          ))}
        </Pie>
        {config.showLegend !== false && (
          <Legend
            layout={config.legendLayout || "horizontal"}
            verticalAlign={config.legendVerticalAlign || "bottom"}
            align={config.legendAlign || "center"}
            iconType={config.legendIconType || "circle"}
          />
        )}
        <Tooltip 
          formatter={formatter}
          contentStyle={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.9)', 
            border: '1px solid #f0f0f0',
            borderRadius: '6px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
          }}
        />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
};

export default DonutChart;
