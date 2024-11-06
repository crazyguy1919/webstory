import React from 'react';
import { Icon } from '@iconify/react';
import '../styles/dashboard.css';

const StatCard = ({ title, count, icon, bgColor, trendText, trendIcon, trendColor, iconBgColor }) => {
  return (
    <div className="col p-4 ">
      <div className={`card shadow-none border ${bgColor} h-100`}>
        <div className="card-body card-body-section p-20">
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
            <div>
              <p className="fw-medium text-primary-light mb-1">{title}</p>
              <h6 className="mb-0 count-heading">{count}</h6>
            </div>
            <div className={`dashboard-cards-icons rounded-circle d-flex justify-content-center align-items-center ${iconBgColor}`}>
              <Icon icon={icon} className="text-white text-2xl mb-0" />
            </div>
          </div>
          <p className="fw-medium text-sm text-primary-light mt-12 mb-0 d-flex align-items-center gap-2">
            <span className={`d-inline-flex align-items-center gap-1 ${trendColor}`}>
              <Icon icon={trendIcon} className="text-xs" /> {trendText}
            </span>
            Yesterday Views
          </p>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const statsData = [
    {
      title: "Total Stories",
      count: "40,689",
      icon: "ri-file-image-line",
      bgColor: "bg-gradient-start-1",
      trendText: "135",
      trendIcon: "bxs:up-arrow",
      trendColor: "text-success-main"
    },
    {
      title: "Published Stories",
      count: "28,293",
      icon: "ri-book-2-line",
      bgColor: "bg-gradient-start-2",
      trendText: "50",
      trendIcon: "bxs:down-arrow",
      trendColor: "text-danger-main"
    },
    {
      title: "Un-Published Stories",
      count: "12,780",
      icon: "ri-route-line",
      bgColor: "bg-gradient-start-3",
      trendText: "85",
      trendIcon: "bxs:up-arrow",
      trendColor: "text-success-main"
    },
    {
      title: "Categories",
      count: "24",
      icon: "ri-list-ordered-2",
      bgColor: "bg-gradient-start-4",
      trendText: "5",
      trendIcon: "bxs:up-arrow",
      trendColor: "text-success-main"
    },
    {
      title: "Liked Stories",
      count: "40,689",
      icon: "ri-thumb-up-line",
      bgColor: "bg-gradient-start-5",
      trendText: "8.5%",
      trendIcon: "bxs:up-arrow",
      trendColor: "text-success-main"
    },
    {
      title: "Shares Count",
      count: "10,293",
      icon: "ri-share-forward-line",
      bgColor: "bg-gradient-start-6",
      trendText: "1.3%",
      trendIcon: "bxs:up-arrow",
      trendColor: "text-success-main"
    },
    {
      title: "Total Views",
      count: "2,040",
      icon: "ri-eye-line",
      bgColor: "bg-gradient-start-7",
      trendText: "1.3%",
      trendIcon: "bxs:up-arrow",
      trendColor: "text-success-main"
    },
    {
      title: "Total Saved",
      count: "205",
      icon: "ri-price-tag-2-line",
      bgColor: "bg-gradient-start-8",
      trendText: "300",
      trendIcon: "bxs:up-arrow",
      trendColor: "text-success-main"
    },
  ];

  // Define an array of colors for the icon backgrounds
  const iconBackgroundColors = [
    'bg-icon-color-1',
    'bg-icon-color-2',
    'bg-icon-color-3',
    'bg-icon-color-4',
    'bg-icon-color-5',
    'bg-icon-color-6',
    'bg-icon-color-7',
    'bg-icon-color-8',
  ];

  return (
    <div className="col-xxl-12">
      <h3>Dashboard</h3>
      <div className="row row-cols-xxxl-4 row-cols-lg-4 row-cols-sm-2 row-cols-1 gy-4">
        {statsData.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            count={stat.count}
            icon={stat.icon}
            bgColor={stat.bgColor}
            trendText={stat.trendText}
            trendIcon={stat.trendIcon}
            trendColor={stat.trendColor}
            iconBgColor={iconBackgroundColors[index % iconBackgroundColors.length]} // Use modulo to loop through icon colors
          />
        ))}
      </div>
    </div>
  );
};
export default Dashboard;