import React from 'react';
import WeeklyCostChart from '../components/charts/WeeklyCostChart.tsx';
import BudgetComparisonChart from '../components/charts/BudgetComparisonChart.tsx';
import CostBreakdownChart from '../components/charts/CostBreakdownChart.tsx';
import OperationalCostChart from '../components/charts/OperationalCostChart.tsx';
import PhaseCostChart from '../components/charts/PhaseCostChart.tsx';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <WeeklyCostChart />
        <BudgetComparisonChart />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CostBreakdownChart />
        <OperationalCostChart />
        <PhaseCostChart />
      </div>
    </div>
  );
};

export default Dashboard;