import React from 'react'
import KPI from './kpi/KPI';

export default function GraphDashboard() {
    return (
        <div>
          <KPI value={500} label="Total Revenue" />
          <KPI value={80} label="Conversion Rate" />
        </div>
      );
}
