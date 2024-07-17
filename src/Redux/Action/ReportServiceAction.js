export const UDPATE_REPORT_GENERATE_TABLE_DATA = "UDPATE_REPORT_GENERATE_TABLE_DATA";

export const updateReportGenerateTableAction = (STATE) => ({
  type: UDPATE_REPORT_GENERATE_TABLE_DATA,
  payload: { value: STATE },
});