import React from 'react'

export default function KPI(props) {
    const { value, label } = props;

    return (
      <div className="kpi">
        <div className="value">{value}</div>
        <div className="label">{label}</div>
      </div>
    );
}
