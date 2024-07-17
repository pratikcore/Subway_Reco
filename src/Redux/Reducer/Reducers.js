// import { Product } from './Reducer.js'
// import { UserInfo } from './UserStore.js'
import { DashboardModal } from './AllModalStateReducer'
import { Dashboard } from './DashboardReducer'
import { DashboardStore } from './DashboardStore'
import { ReconciliationService } from './ReconciliationServiceReducer'
import { ReportService } from './ReportServiceReducer'
import { VoucherService } from './VoucherReducer'
import { combineReducers } from 'redux'

export default combineReducers({
  Dashboard,
  DashboardModal,
  DashboardStore,
  ReconciliationService,
  ReportService,
  VoucherService
})