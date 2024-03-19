import DashboardTabsNavigator from '../../../components/dashboard/DashboardTabsNavigator'

const Dashboard = ({ params: { locale } }) => {
  return (
    <DashboardTabsNavigator locale={locale} />
  )
}

export default Dashboard