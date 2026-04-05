// Library to interact with excel files.
const xlsx = require('xlsx')
const path = require("path")

const extractData = () => {
    // Reading excel file
    const filePath = path.join(__dirname, '../dummy.xlsx')

    const workbook = xlsx.readFile(filePath)

    // First Phase: Reading the Spatial Data
    const Spatial_sheet = workbook.Sheets['Spatial']
    const Spatial_data = xlsx.utils.sheet_to_json(Spatial_sheet)

    let WSUCData = {}
    Spatial_data.forEach((row) => {
        WSUCData[row.WSUC_ID] = {
            WSUC_ID: row.WSUC_ID,
            WSUC_Name: row.WSUC_Name,

            Location: {
                Province_Name: row.Province_Name,
                District_Name: row.District_Name,
                Municipality_Type: row.Municipality_Type,
                Municipality_Name: row.Municipality_Name,
                Wards_Covered: row.Wards_Covered,
            },
            Service_Coverage_Prerequisite: "",
            Summary_Index: {}
        }
    })

    // Second Phase: Reading the Service Coverage Prerequisite

    const Service_Coverage_Sheet = workbook.Sheets['Service Coverage']
    const Service_Coverage_data = xlsx.utils.sheet_to_json(Service_Coverage_Sheet)

    Service_Coverage_data.map((row) => {
        if (WSUCData[row.WSUC_ID]) {
            WSUCData[row.WSUC_ID].Service_Coverage_Prerequisite = row['Prerequisite: Does Business Plan exist?']
        }
    })


    // Third Phase: Reading the Summary index Data
    const Summary_Index_Sheet = workbook.Sheets['Summary_Index']
    const Summary_Index_Data = xlsx.utils.sheet_to_json(Summary_Index_Sheet)

    Summary_Index_Data.forEach((row) => {
        if (WSUCData[row.WSUC_ID]) {
            WSUCData[row.WSUC_ID].Summary_Index = {
                Service_Coverage_Score: row.Coverage_Score,
                Adequacy_Score: row.Adequacy_Score,
                Water_Quality_Score: row.Water_Quality,
                Reliability_Score: row.Reliability_Score,
                NRW_Score: row.NRW_Score,
                OM_Score: row.O_and_M_Score,
                Metering_Ratio_Score: row.Metering_Score,
                Grievance_Score: row.Grievance_Score,
                SPI: row.SPI,
                OEI: row.OEI,
                CWPI_Percentage: row.CWPI_Percentage,
                CWPI_Interpretation: row.CWPI_Interpretation,
                Type_A_to_D: row.Type_A_to_D,
            }
        }
    })

    return WSUCData;
}

module.exports = { extractData }