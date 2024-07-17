const CustomDashboardCard = ({ title, value, color }) => {
  return (
    <div className="custom-dashboard-card w-full">
      <div className={`box-title-view`}>
        <strong className="text-lg">{title}</strong>
      </div>
      <div className="number-box">₹{value}</div>
    </div>
  );
};

export default CustomDashboardCard;
