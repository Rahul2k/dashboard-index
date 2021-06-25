<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <title>@ViewData("Title") - TAB FusionRMS</title>
    <link href="@Url.Content("~/Images/TabFusion.ico")" rel="shortcut icon" type="image/x-icon" />
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,700,400italic,300" rel="stylesheet" type="text/css">
    <link href="@Url.Content("~/Content/themes/TAB/css/custom.css")" rel="stylesheet" />
    <link href="@Url.Content("~/Content/themes/TAB/css/jsTreeThemes/style.min.css")" rel="stylesheet" />
    @Styles.Render("~/Styles/css")
    @Scripts.Render("~/bundles/jQuery")
    @Scripts.Render("~/bundles/masterjs")
    @Scripts.Render("~/bundles/modernizr")

    <script type="text/javascript">
        $(document).ready(function(){
            $('.divMenu #mCSB_1_container .l_drillDownWrapper').each(function(index,value){
                if($(this).children().length==1)
                {
                    $(this).remove();
                }
            });

            $('#hlAboutUs').click(function(){
                $.ajax({
                    type: "POST",
                    url: 'Admin/OpenAboutUs',
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    async: false,
                    success: function (response) {
                        var msg = response;
                        $('#divAboutInfo').html(msg);
                        $('#dialog-form-AboutUs').modal('show');
                        $("#dialog-form-AboutUs .modal-dialog").draggable({ disabled: true });
                    },
                    failure: function(response) {
                        return false;
                    }
                });
            });

        });
        window.onfocus = function () {
            if (getCookie("Islogin") == "False") {
                window.location.href = window.location.origin + "/signin.aspx?out=1"
            }
            if(getCookie("lastUsername").toLowerCase()!=$("#lblLoginUserName").html().toLowerCase().trim()){
                window.location.reload();
            }
        };
        var specialChar = {
            WorkGroupSpecialChar: '~`,><;"?|][{}.\\/',
            VolumeSpecialChar: ';><:?/|*"',
        }
        var urls = {
            Common: {
                GetGridViewSettings: '@Url.Action("GetGridViewSettings", "Common")',
                GetGridViewSettings1: '@Url.Action("GetGridViewSettings1", "Common")',
                ArrangeGridOrder: '@Url.Action("ArrangeGridOrder", "Common")',
                GetGridSelectedRowsIds: '@Url.Action("GetGridSelectedRowsIds", "Common")',
                SetGridOrders: '@Url.Action("SetGridOrders", "Common")',
                SetCulture: '@Url.Action("SetCulture", "Common")',
                GetTableList: '@Url.Action("GetTableList", "Common")',
                GetTrackableTableList: '@Url.Action("GetTrackableTableList", "Common")',
                GetColumnList: '@Url.Action("GetColumnList", "Common")',
                TruncateTrackingHistory: '@Url.Action("TruncateTrackingHistory", "Common")',
                GetRegisteredDatabases: '@Url.Action("GetRegisteredDatabases", "Common")',
                GetCheckSession: '@Url.Action("GetCheckSession", "Common")',
                CheckTabLevelAccessPermission: '@Url.Action("CheckTabLevelAccessPermission", "Common")',
                GetFontFamilies:'@Url.Action("GetFontFamilies", "Common")',
                GetRefereshDetails:'@Url.Action("GetRefereshDetails", "Base")',
                GetTableListLabel: '@Url.Action("GetTableListLabel", "Common")'
            },
            Users: {
                GetUsersList: '@Url.Action("GetUsersList", "User")',
                SetUserDetails: '@Url.Action("SetUserDetails", "User")',
                EditUsers: '@Url.Action("EditUsers", "User")',
            },
            Admin: {
                Application: '@Url.Action("Index", "Application")',
                Database: '@Url.Action("Index", "User")',
                Directories: '@Url.Action("Index", "Directories")',
                Data: '@Url.Action("Index", "Data")',
                Tables: '@Url.Action("Index", "User")',
                Views: '@Url.Action("Index", "User")',
                Reports: '@Url.Action("Index", "User")',
                Security: '@Url.Action("Index", "User")',
                LoadDataView: '@Url.Action("LoadDataView", "Admin")',
                BindAccordian: '@Url.Action("BindAccordian", "Admin")',
                GetDataList: '@Url.Action("GetDataList", "Admin")',
                LoadAttachmentParticalView: '@Url.Action("LoadAttachmentParticalView", "Admin")',
                LoadAuditingView: '@Url.Action("LoadAuditingView", "Admin")',
                LoadMapView: '@Url.Action("LoadMapView", "Admin")',
                DeleteSelectedRows: '@Url.Action("DeleteSelectedRows", "Admin")',
                ProcessRequest: '@Url.Action("ProcessRequest", "Admin")',
                DefaultPage: '@Url.Action("Index", "Admin")',
                ViewTreePartial: '@Url.Action("ViewTreePartial", "Admin")',
                ReportsTreePartial: '@Url.Action("ReportsTreePartial", "Admin")',
                GetSortedColumnList:'@Url.Action("GetSortedColumnList", "Admin")',
                SaveSortedColumnToList: '@Url.Action("SaveSortedColumnToList", "Admin")',
                LoadBackgroundProcessView: '@Url.Action("LoadBackgroundProcessView", "Admin")',
                GetBackgroundProcess: '@Url.Action("GetBackgroundProcess", "Admin")',
                GetBackgroundOptions: '@Url.Action("GetBackgroundOptions", "Admin")',
                SetBackgroundData: '@Url.Action("SetBackgroundData", "Admin")',
                RemoveBackgroundSection: '@Url.Action("RemoveBackgroundSection", "Admin")',
                DeleteBackgroundProcessTasks: '@Url.Action("DeleteBackgroundProcessTasks", "Admin")'
            },

            EmailNotification: {
                LoadEmailNotificationView: '@Url.Action("LoadEmailNotificationView", "Admin")',
                EmailSettingPartialView: '@Url.Action("EmailSettingPartialView", "Admin")',
                SetEmailDetails: '@Url.Action("SetEmailDetails", "Admin")',
                GetSMTPDetails: '@Url.Action("GetSMTPDetails", "Admin")',
            },
            Attachments: {
                GetOutputSettingList: '@Url.Action("GetOutputSettingList", "Admin")',
                SetOutputSettingsEntity: '@Url.Action("SetOutputSettingsEntity", "Admin")',
                EditOutputSettingsEntity: '@Url.Action("EditOutputSettingsEntity", "Admin")',
                SetExampleFileName: '@Url.Action("SetExampleFileName", "Admin")',
                RemoveOutputSettingsEntity: '@Url.Action("RemoveOutputSettingsEntity", "Admin")',
                SetAttachmentSettingsEntity: '@Url.Action("SetAttachmentSettingsEntity", "Admin")',
                EditAttachmentSettingsEntity: '@Url.Action("EditAttachmentSettingsEntity", "Admin")',
            },
            Data: {
                Data: '@Url.Action("Index", "Data")',
            },
            Directories: {
                LoadDirectoriesView: '@Url.Action("LoadDirectoriesView", "Admin")',
                LoadDriveView: '@Url.Action("LoadDriveView", "Admin")',
                GetSystemAddressList: '@Url.Action("GetSystemAddressList", "Admin")',
                SetSystemAddressDetails: '@Url.Action("SetSystemAddressDetails", "Admin")',
                EditSystemAddress: '@Url.Action("EditSystemAddress", "Admin")',
                IsValidFilename: '@Url.Action("IsValidFilename", "Admin")',
                GetVolumesList: '@Url.Action("GetVolumesList", "Admin")',
                SetVolumeDetails: '@Url.Action("SetVolumeDetails", "Admin")',
                EditVolumeDetails: '@Url.Action("EditVolumeDetails", "Admin")',
                LoadVolumeView: '@Url.Action("LoadVolumeView", "Admin")',
                DeleteSystemAddress: '@Url.Action("DeleteSystemAddress", "Admin")',
                DeleteVolumesEntity: '@Url.Action("DeleteVolumesEntity", "Admin")',

            },
            Auditing: {
                GetTablesForLabel: '@Url.Action("GetTablesForLabel", "Admin")',
                GetAuditPropertiesData: '@Url.Action("GetAuditPropertiesData", "Admin")',
                SetAuditPropertiesData: '@Url.Action("SetAuditPropertiesData", "Admin")',
                RemoveTableFromList: '@Url.Action("RemoveTableFromList", "Admin")',
                PurgeAuditData: '@Url.Action("PurgeAuditData", "Admin")',
                CheckChildTableExist: '@Url.Action("CheckChildTableExist", "Admin")',
            },
            Requestor: {
                LoadRequestorView: '@Url.Action("LoadRequestorView", "Admin")',
                RemoveRequestorEntity: '@Url.Action("RemoveRequestorEntity", "Admin")',
                ResetRequestorLabel: '@Url.Action("ResetRequestorLabel", "Admin")',
                SetRequestorSystemEntity: '@Url.Action("SetRequestorSystemEntity", "Admin")',
                GetRequestorSystemEntity: '@Url.Action("GetRequestorSystemEntity", "Admin")',
            },
            BarCodeSearchOrder: {
                LoadBarCodeSearchView: '@Url.Action("LoadBarCodeSearchView", "Admin")',
                GetBarCodeList: '@Url.Action("GetBarCodeList", "Admin")',
                RemoveBarCodeSearchEntity: '@Url.Action("RemoveBarCodeSearchEntity", "Admin")',
                SetbarCodeSearchEntity: '@Url.Action("SetbarCodeSearchEntity", "Admin")',
                SaveScanListEntity: '@Url.Action("SaveScanListEntity", "Admin")',
            },
            Tracking: {
                LoadTrackingView: '@Url.Action("LoadTrackingView", "Admin")',
                TrackingFieldPartialView: '@Url.Action("TrackingFieldPartialView", "Admin")',
                SetTrackingSystemEntity: '@Url.Action("SetTrackingSystemEntity", "Admin")',
                GetTrackingFieldList: '@Url.Action("GetTrackingFieldList", "Admin")',
                GetTrackingSystemEntity: '@Url.Action("GetTrackingSystemEntity", "Admin")',
                GetTrackingField: '@Url.Action("GetTrackingField", "Admin")',
                SetTrackingField: '@Url.Action("SetTrackingField", "Admin")',
                RemoveTrackingField: '@Url.Action("RemoveTrackingField", "Admin")',
                GetReconciliation: '@Url.Action("GetReconciliation", "Admin")',
                @*RemoveReconciliation: '@Url.Action("RemoveReconciliation", "Admin")',*@
                SetTrackingHistoryData: '@Url.Action("SetTrackingHistoryData", "Admin")',
            },
            Appearance: {
                LoadApplicationView: '@Url.Action("LoadApplicationView", "Admin")',
                GetSystemList: '@Url.Action("GetSystemList", "Admin")',
                SetSystemDetails: '@Url.Action("SetSystemDetails", "Admin")'
            },
            Database: {
                LoadTableRegisterView: '@Url.Action("LoadTableRegisterView", "Admin")'
            },
            TableRegister: {
                LoadTableRegisterView: '@Url.Action("LoadTableRegisterView", "Admin")',
                GetAvailableDatabase: '@Url.Action("GetAvailableDatabase", "Admin")',
                GetAvailableTable: '@Url.Action("GetAvailableTable", "Admin")',
                SetRegisterTable: '@Url.Action("SetRegisterTable", "Admin")',
                UnRegisterTable: '@Url.Action("UnRegisterTable", "Admin")',
                DropTable: '@Url.Action("DropTable", "Admin")',
                LoadRegisterList: '@Url.Action("LoadRegisterList", "Admin")',
                GetPrimaryField: '@Url.Action("GetPrimaryField", "Admin")'
            },
            ExternalDB: {
                LoadExternalDBView: '@Url.Action("LoadExternalDBView", "Admin")',
                LoadAddDBView: '@Url.Action("LoadAddDBView", "Admin")',
                GetAllSQLInstance: '@Url.Action("GetAllSQLInstance", "Admin")',
                GetDatabaseList: '@Url.Action("GetDatabaseList", "Admin")',
                AddNewDB: '@Url.Action("AddNewDB", "Admin")',
                GetAllSavedInstances: '@Url.Action("GetAllSavedInstances", "Admin")',
                DisconnectDBCheck: '@Url.Action("DisconnectDBCheck", "Admin")',
                DisconnectDB: '@Url.Action("DisconnectDB", "Admin")',
                CheckIfDateChanged: '@Url.Action("CheckIfDateChanged", "Admin")'
            },
            Retention: {
                AdminRetentionPartial: '@Url.Action("AdminRetentionPartial", "Admin")',
                GetRetentionPeriodTablesList: '@Url.Action("GetRetentionPeriodTablesList", "Admin")',
                SetRetentionParameters: '@Url.Action("SetRetentionParameters", "Admin")',
                LoadRetentionPropView: '@Url.Action("LoadRetentionPropView", "Admin")',
                GetRetentionPropertiesData: '@Url.Action("GetRetentionPropertiesData", "Admin")',
                SetRetentionTblPropData: '@Url.Action("SetRetentionTblPropData", "Admin")',
                RemoveRetentionTableFromList: '@Url.Action("RemoveRetentionTableFromList", "Admin")',
                LoadTablesRetentionView: '@Url.Action("LoadTablesRetentionView", "Admin")',
                ReplicateCitationForRetentionOnSaveAs: '@Url.Action("ReplicateCitationForRetentionOnSaveAs", "Retention")',
                GetRetentionYearEndValue: '@Url.Action("GetRetentionYearEndValue", "Retention")',
                IsRetentionCodeInUse: '@Url.Action("IsRetentionCodeInUse", "Retention")',

                GetRetentionCodes: '@Url.Action("GetRetentionCodes", "Retention")',
                LoadRetentionCodeView: '@Url.Action("LoadRetentionCodeView", "Retention")',
                SetRetentionCode: '@Url.Action("SetRetentionCode", "Retention")',
                EditRetentionCode: '@Url.Action("EditRetentionCode", "Retention")',
                RemoveRetentionCodeEntity: '@Url.Action("RemoveRetentionCodeEntity", "Retention")',
                CheckRetentionCodeExists: '@Url.Action("CheckRetentionCodeExists", "Retention")',
                GetRetentionCodeId: '@Url.Action("GetRetentionCodeId", "Retention")',

                GetCitationCodes: '@Url.Action("GetCitationCodes", "Retention")',
                LoadAddCitationCodeView: '@Url.Action("LoadAddCitationCodeView", "Retention")',
                SetCitationCode: '@Url.Action("SetCitationCode", "Retention")',
                EditCitationCode: '@Url.Action("EditCitationCode", "Retention")',
                RemoveCitationCodeEntity: '@Url.Action("RemoveCitationCodeEntity", "Retention")',
                GetRetentionCodesByCitation: '@Url.Action("GetRetentionCodesByCitation", "Retention")',
                GetCitationCodesByRetenton: '@Url.Action("GetCitationCodesByRetenton", "Retention")',
                DetailedCitationCode: '@Url.Action("DetailedCitationCode", "Retention")',
                RemoveAssignedCitationCode: '@Url.Action("RemoveAssignedCitationCode", "Retention")',
                GetAssignCitationCode: '@Url.Action("GetAssignCitationCode", "Retention")',
                AssignCitationToRetention: '@Url.Action("AssignCitationToRetention", "Retention")',
                GetCitationsCodeToAdd: '@Url.Action("GetCitationsCodeToAdd", "Retention")',
                GetCountOfRetentionCodesForCitation: '@Url.Action("GetCountOfRetentionCodesForCitation", "Retention")',

                ReassignRetentionCode: '@Url.Action("ReassignRetentionCode", "Retention")',
                GetRetentionTablesList: '@Url.Action("GetRetentionTablesList", "Retention")',
                GetRetentionCodeList: '@Url.Action("GetRetentionCodeList", "Retention")',
                ReplaceRetentionCode: '@Url.Action("ReplaceRetentionCode", "Retention")',

                //by hasmukh
                RetentionCodeMaintenance: '@Url.Action("RetentionCodeMaintenance", "Retention")',
                CitationMaintenance: '@Url.Action("CitationMaintenance", "Retention")',
            },

            Map: {
                SetNewWorkgroup: '@Url.Action("SetNewWorkgroup", "Admin")',
                EditNewWorkgroup: '@Url.Action("EditNewWorkgroup", "Admin")',
                RemoveNewWorkgroup: '@Url.Action("RemoveNewWorkgroup", "Admin")',
                SetNewTable: '@Url.Action("SetNewTable", "Admin")',
                RenameTreeNode: '@Url.Action("RenameTreeNode", "Admin")',
                GetAttachTableList: '@Url.Action("GetAttachTableList", "Admin")',
                SetAttachTableDetails: '@Url.Action("SetAttachTableDetails", "Admin")',
                DeleteTable: '@Url.Action("DeleteTable", "Admin")',
                SetAttachExistingTableDetails: '@Url.Action("SetAttachExistingTableDetails", "Admin")',
                LoadAttachExistingTableScreen: '@Url.Action("LoadAttachExistingTableScreen", "Admin")',
                GetAttachTableFieldsList: '@Url.Action("GetAttachTableFieldsList", "Admin")',
                ConfirmationForAlreadyExistColumn: '@Url.Action("ConfirmationForAlreadyExistColumn", "Admin")',
                GetDeleteTableNames: '@Url.Action("GetDeleteTableNames", "Admin")',
                DeleteTableFromTableTab: '@Url.Action("DeleteTableFromTableTab", "Admin")',
                DeleteTableFromRelationship: '@Url.Action("DeleteTableFromRelationship", "Admin")',
                ChangeNodeOrder: '@Url.Action("ChangeNodeOrder", "Admin")'
            },

            TableTracking: {
                LoadTableTab: '@Url.Action("LoadTableTab", "Admin")',
                LoadTableTracking: '@Url.Action("LoadTableTracking", "Admin")',
                LoadAccordianTable: '@Url.Action("LoadAccordianTable", "Admin")',
                GetTableTrackingProperties: '@Url.Action("GetTableTrackingProperties", "Admin")',
                SetTableTrackingDetails: '@Url.Action("SetTableTrackingDetails", "Admin")',
                GetTableEntity: '@Url.Action("GetTableEntity", "Admin")',
                GetTrackingDestination: '@Url.Action("GetTrackingDestination", "Admin")'
            },
            TableFileRoomOrder: {
                LoadTablesFileRoomOrderView: '@Url.Action("LoadTablesFileRoomOrderView", "Admin")',
                GetListOfFileRoomOrders: '@Url.Action("GetListOfFileRoomOrders", "Admin")',
                GetListOfFieldNames: '@Url.Action("GetListOfFieldNames", "Admin")',
                EditFileRoomOrderRecord: '@Url.Action("EditFileRoomOrderRecord", "Admin")',
                SetFileRoomOrderRecord: '@Url.Action("SetFileRoomOrderRecord", "Admin")',
                RemoveFileRoomOrderRecord: '@Url.Action("RemoveFileRoomOrderRecord", "Admin")'
            },
            TableGeneral: {
                LoadGeneralTab: '@Url.Action("LoadGeneralTab", "Admin")',
                GetGeneralDetails: '@Url.Action("GetGeneralDetails", "Admin")',
                SetSearchOrder: '@Url.Action("SetSearchOrder", "Admin")',
                LoadIconWindow: '@Url.Action("LoadIconWindow", "Admin")',
                SetGeneralDetails: '@Url.Action("SetGeneralDetails", "Admin")',
                OfficialRecordWarning:'@Url.Action("OfficialRecordWarning", "Admin")',

            },
            TableFields: {
                LoadFieldsTab: '@Url.Action("LoadFieldsTab", "Admin")',
                LoadFieldData: '@Url.Action("LoadFieldData", "Admin")',
                GetFieldTypeList: '@Url.Action("GetFieldTypeList", "Admin")',
                CheckBeforeRemoveFieldFromTable: '@Url.Action("CheckBeforeRemoveFieldFromTable", "Admin")',
                RemoveFieldFromTable: '@Url.Action("RemoveFieldFromTable", "Admin")',
                AddEditField: '@Url.Action("AddEditField", "Admin")',
                CheckFieldBeforeEdit: '@Url.Action("CheckFieldBeforeEdit", "Admin")',
            },
            TableAdvanced: {
                LoadAdvancedTab: '@Url.Action("LoadAdvancedTab", "Admin")',
                GetAdvanceDetails: '@Url.Action("GetAdvanceDetails", "Admin")',
                SetAdvanceDetails: '@Url.Action("SetAdvanceDetails", "Admin")',
                CheckParentForder: '@Url.Action("CheckParentForder", "Admin")',
            },
            Views: {
                LoadViewsList: '@Url.Action("LoadViewsList", "Admin")',
                LoadViewsSettings: '@Url.Action("LoadViewsSettings", "Admin")',
                UpdateGridSortOrder: '@Url.Action("UpdateGridSortOrder", "Admin")',
                GetViewColumnsList: '@Url.Action("GetViewColumnsList", "Admin")',
                GetViewsRelatedData: '@Url.Action("GetViewsRelatedData", "Admin")',
                SetViewsDetails: '@Url.Action("SetViewsDetails", "Admin")',
                GetOperatorDDLData: '@Url.Action("GetOperatorDDLData", "Admin")',
                RefreshViewColGrid:'@Url.Action("RefreshViewColGrid", "Admin")',
                FillColumnsDDL:'@Url.Action("FillColumnsDDL", "Admin")',
                MoveFilterInSQL:'@Url.Action("MoveFilterInSQL", "Admin")',
                ValidateFilterData:'@Url.Action("ValidateFilterData", "Admin")',
                GetFilterData1:'@Url.Action("GetFilterData1", "Admin")',
                DeleteView:'@Url.Action("DeleteView", "Admin")',
                ViewsOrderChange:'@Url.Action("ViewsOrderChange", "Admin")',
                ValidateSqlStatement:'@Url.Action("ValidateSqlStatement", "Admin")',
                CheckTableExistence:'@Url.Action("CheckTableExistence", "Admin")'
            },
            Reports:{
                LoadReportsView: '@Url.Action("LoadReportsView", "Admin")',
                GetTablesView: '@Url.Action("GetTablesView", "Admin")',
                GetReportInformation: '@Url.Action("GetReportInformation", "Admin")',
                GetColumnsForPrinting: '@Url.Action("GetColumnsForPrinting", "Admin")',
                DeleteReportsPrintingColumn: '@Url.Action("DeleteReportsPrintingColumn", "Admin")',
                ReportListPartial: '@Url.Action("ReportListPartial", "Admin")',
                LoadViewColumn:'@Url.Action("LoadViewColumn", "Admin")',
                FillViewColumnControl:'@Url.Action("FillViewColumnControl", "Admin")',
                SetReportDefinitionValues: '@Url.Action("SetReportDefinitionValues", "Admin")',
                RemoveActiveLevel: '@Url.Action("RemoveActiveLevel", "Admin")',
                DeleteReport:'@Url.Action("DeleteReport", "Admin")',
                FillInternalFieldName:'@Url.Action("FillInternalFieldName", "Admin")',
                FillFieldTypeAndSize:'@Url.Action("FillFieldTypeAndSize", "Admin")',
                ValidateColumnData:'@Url.Action("ValidateColumnData", "Admin")',
                SetColumnInTempViewCol:'@Url.Action("SetColumnInTempViewCol", "Admin") ',
                GetDataFromViewColumn:'@Url.Action("GetDataFromViewColumn", "Admin")',
                ValidateViewColEditSetting:'@Url.Action("ValidateViewColEditSetting", "Admin")',
                DropDownValidation:'@Url.Action("DropDownValidation", "Admin")',
                DeleteViewColumn:'@Url.Action("DeleteViewColumn", "Admin")'
            },
            ReportStyles:{
                LoadReportStyle:'@Url.Action("LoadReportStyle", "Admin")',
                GetReportStyles:'@Url.Action("GetReportStyles", "Admin")',
                LoadAddReportStyle:'@Url.Action("LoadAddReportStyle", "Admin")',
                GetReportStylesData:'@Url.Action("GetReportStylesData", "Admin")',
                RemoveReportStyle:'@Url.Action("RemoveReportStyle", "Admin")',
                SetReportStylesData:'@Url.Action("SetReportStylesData", "Admin")',
                LoadFontModel:'@Url.Action("LoadFontModel", "Admin")'
            },
            Security:{
                CheckModuleLevelAccess: '@Url.Action("CheckModuleLevelAccess", "Admin")',

                LoadSecurityTab: '@Url.Action("LoadSecurityTab", "Admin")',
                LoadSecurityUserGridData: '@Url.Action("LoadSecurityUserGridData", "Admin")',
                LoadSecurityUsersTab: '@Url.Action("LoadSecurityUsersTab", "Admin")',
                LoadSecurityUserProfileView: '@Url.Action("LoadSecurityUserProfileView", "Admin")',
                SetUserDetails:'@Url.Action("SetUserDetails", "Admin")',
                EditUserProfile: '@Url.Action("EditUserProfile", "Admin")',
                DeleteUserProfile: '@Url.Action("DeleteUserProfile", "Admin")',
                SetUserPassword: '@Url.Action("SetUserPassword", "Admin")',
                GetAssignedGroupsForUser: '@Url.Action("GetAssignedGroupsForUser", "Admin")',
                GetAllGroupsList: '@Url.Action("GetAllGroupsList", "Admin")',
                SetGroupsAgainstUser: '@Url.Action("SetGroupsAgainstUser", "Admin")',
                UnlockUserAccount: '@Url.Action("UnlockUserAccount", "Admin")',

                LoadSecurityGroupsTab: '@Url.Action("LoadSecurityGroupsTab", "Admin")',
                LoadSecurityGroupGridData: '@Url.Action("LoadSecurityGroupGridData", "Admin")',
                LoadSecurityGroupProfileView: '@Url.Action("LoadSecurityGroupProfileView", "Admin")',
                SetGroupDetails: '@Url.Action("SetGroupDetails", "Admin")',
                EditGroupProfile: '@Url.Action("EditGroupProfile", "Admin")',
                DeleteGroupProfile: '@Url.Action("DeleteGroupProfile", "Admin")',
                GetAllUsersList: '@Url.Action("GetAllUsersList", "Admin")',
                GetAssignedUsersForGroup: '@Url.Action("GetAssignedUsersForGroup", "Admin")',
                SetUsersAgainstGroup: '@Url.Action("SetUsersAgainstGroup", "Admin")',

                LoadSecuritySecurablesTab: '@Url.Action("LoadSecuritySecurablesTab", "Admin")',
                GetListOfSecurablesType: '@Url.Action("GetListOfSecurablesType", "Admin")',
                GetListOfSecurableObjects: '@Url.Action("GetListOfSecurableObjects", "Admin")',
                GetPermissionsForSecurableObject:'@Url.Action("GetPermissionsForSecurableObject", "Admin")',
                SetPermissionsToSecurableObject:'@Url.Action("SetPermissionsToSecurableObject", "Admin")',

                LoadSecurityPermissionsTab: '@Url.Action("LoadSecurityPermissionsTab", "Admin")',
                GetPermisionsGroupList: '@Url.Action("GetPermisionsGroupList", "Admin")',
                GetListOfSecurableObjForPermissions: '@Url.Action("GetListOfSecurableObjForPermissions", "Admin")',
                GetPermissionsBasedOnGroupId: '@Url.Action("GetPermissionsBasedOnGroupId", "Admin")',
                SetGroupPermissions: '@Url.Action("SetGroupPermissions", "Admin")',
            },
            LabelManager: {
                Index: '@Url.Action("Index", "LabelManager")',
                GetFirstValue: '@Url.Action("GetFirstValue", "LabelManager")',
                AddLabel: '@Url.Action("AddLabel", "LabelManager")',
                SetLableObjects:'@Url.Action("SetLableObjects", "LabelManager")',
                GetAllLabelList:'@Url.Action("GetAllLabelList", "LabelManager")',
                GetLabelDetails:'@Url.Action("GetLabelDetails", "LabelManager")',
                LoadAddEditLabel:'@Url.Action("LoadAddEditLabel", "LabelManager")',
                DeleteLable:'@Url.Action("DeleteLable", "LabelManager")',
                GetFormList : '@Url.Action("GetFormList", "LabelManager")',
                CreateSQLString: '@Url.Action("CreateSQLString", "LabelManager")',
                GetNextRecord: '@Url.Action("GetNextRecord", "LabelManager")',
                SetAsDefault: '@Url.Action("SetAsDefault", "LabelManager")'
            },
            Import:{
                SendFileContent:'@Url.Action("SendFileContent", "Import")',
                GetImportDDL:'@Url.Action("GetImportDDL", "Import")',
                GetGridDataFromFile:'@Url.Action("GetGridDataFromFile", "Import")',
                ConvertDataToGrid:'@Url.Action("ConvertDataToGrid", "Import")',
                GetDestinationDDL:'@Url.Action("GetDestinationDDL", "Import")',
                GetAvailableField:'@Url.Action("GetAvailableField", "Import")',
                ValidateOnMoveClick:'@Url.Action("ValidateOnMoveClick", "Import")',
                RemoveOnClick:'@Url.Action("RemoveOnClick", "Import")',
                ReorderImportField:'@Url.Action("ReorderImportField", "Import")',
                GetPropertyByType:'@Url.Action("GetPropertyByType", "Import")',
                SaveImportProperties:'@Url.Action("SaveImportProperties", "Import")',
                CloseAllObject:'@Url.Action("CloseAllObject", "Import")',
                LoadTabInfoDDL:'@Url.Action("LoadTabInfoDDL", "Import")',
                @*ValidateLoadName:'@Url.Action("ValidateLoadName", "Import")',*@
                GetImportLoadData:'@Url.Action("GetImportLoadData", "Import")',
                ValidateTrackingField:'@Url.Action("ValidateTrackingField", "Import")',
                SubmitImportData:'@Url.Action("SubmitImportData", "Import")',
                CheckIfInUsed:'@Url.Action("CheckIfInUsed", "Import")',
                RemoveImportLoad:'@Url.Action("RemoveImportLoad", "Import")',
                @*GetImportJob:'@Url.Action("GetImportJob", "Import")',*@
                @*GetAllImportLoad:'@Url.Action("GetAllImportLoad", "Import")',*@
                @*AddJobInTempData:'@Url.Action("AddJobInTempData", "Import")',*@
                @*SendJobFileContent:'@Url.Action("SendJobFileContent", "Import")',*@
                SetJobInfo:'@Url.Action("SetJobInfo", "Import")',
                SaveImportLoadOnConfrim:'@Url.Action("SaveImportLoadOnConfrim", "Import")',
                @*DisplayFileNameOnRun:'@Url.Action("DisplayFileNameOnRun", "Import")',*@
                @*ProcessLoad:'@Url.Action("ProcessLoad", "Import")',*@
                ShowLogFiles:'@Url.Action("ShowLogFiles", "Import")',
                @*RemoveLoadFromJobList:'@Url.Action("RemoveLoadFromJobList", "Import")',*@
                @*GetLoadFromJob:'@Url.Action("GetLoadFromJob", "Import")',*@
                FillOutputSetting:'@Url.Action("FillOutputSetting", "Import")',
                AttachImages:'@Url.Action("AttachImages", "Import")',
                SetTrackingInfo:'@Url.Action("SetTrackingInfo", "Import")',
                SetImageInfo:'@Url.Action("SetImageInfo", "Import")',
                ValidateLoadOnEdit:'@Url.Action("ValidateLoadOnEdit", "Import")',
                ProcessLoadForQuietProcessing:'@Url.Action("ProcessLoadForQuietProcessing", "Import")',
                UploadFileAndRunLoad:'@Url.Action("UploadFileAndRunLoad", "Import")',
                UploadSingleFile: '@Url.Action("UploadSingleFile", "Import")'
            },
            Scanner: {
                Index: '@Url.Action("Index", "Scanner")',
                SetScanRule: '@Url.Action("SetScanRule", "Scanner")',
                RenameRule: '@Url.Action("RenameRule", "Scanner")',
                UpdateScanRulesDropDown: '@Url.Action("UpdateScanRulesDropDown", "Scanner")',
                LoadDiskSourceInputSettingPartial: '@Url.Action("LoadDiskSourceInputSettingPartial", "Scanner")',
                AttachDocuments: '@Url.Action("AttachDocuments", "Scanner")',
            },
            Upload: {
                AttachDocument: '@Url.Action("AttachDocument", "Upload")',
            },
            Localize: {
                LoadLocalizePartial: '@Url.Action("LoadLocalizePartial", "Admin")',
                GetAvailableLang: '@Url.Action("GetAvailableLang", "Admin")',
                SetLocalizeData:'@Url.Action("SetLocalizeData", "Admin")',
            },
            TABQUIK: {
                TABQUIKKeyPartial: '@Url.Action("LoadTABQUIKIntegrationKeyView", "Admin")',
                GetTabquikKey:'@Url.Action("GetTabquikKey", "Admin")',
                SetTabquikKey:'@Url.Action("SetTabquikKey", "Admin")',
                LoadTABQUIKFieldMappingPartial:'@Url.Action("LoadTABQUIKFieldMappingPartial", "Admin")',
                TABQUIKFieldMappingPartial:'@Url.Action("TABQUIKFieldMappingPartial", "Admin")',
                GetTABQUIKMappingGrid:'@Url.Action("GetTABQUIKMappingGrid", "Admin")',
				GetOneStripJobs :'@Url.Action("GetOneStripJobs", "Admin")',
                RemoveSelectedJob :'@Url.Action("RemoveSelectedJob", "Admin")',
                UploadColorLabelFiles : '@Url.Action("UploadColorLabelFiles", "Admin")',
                GetTableFieldsListAndParentTableFields: '@Url.Action("GetTableFieldsListAndParentTableFields", "Admin")',
                GetTABQUIKMappingGridWithAutoFill:'@Url.Action("GetTABQUIKMappingGridWithAutoFill", "Admin")',
                ValidateTABQUIKSQLStatments:'@Url.Action("ValidateTABQUIKSQLStatments", "Admin")',
                FormTABQUIKSelectSQLStatement:'@Url.Action("FormTABQUIKSelectSQLStatement", "Admin")',
                SaveTABQUIKFields:'@Url.Action("SaveTABQUIKFields", "Admin")',
                IsFLDNamesExists:'@Url.Action("IsFLDNamesExists", "Admin")',
            },
            BeforeLoginWarning: {
                LoadBeforeLoginWarningPartial: '@Url.Action("LoadWarningMessageView", "Admin")',
                GetWarningMessage:'@Url.Action("GetWarningMessage", "Admin")',
                SetWarningMessage:'@Url.Action("SetWarningMessage", "Admin")',
            }

        } //End of variable diclaration


        $(document).ready(function () {
            setTimezoneCookie();
        });

        function setTimezoneCookie() {
            var timezone_cookie = "timezoneoffset";
            var sessid = $.cookie('sessid');
            // if the timezone cookie not exists create one.
            if (!$.cookie(timezone_cookie)) {
                // check if the browser supports cookie
                var test_cookie = 'test cookie';
                $.cookie(test_cookie, true);

                // browser supports cookie
                if ($.cookie(test_cookie)) {
                    // delete the test cookie
                    $.cookie(test_cookie, null);
                    // create a new cookie
                    $.cookie(timezone_cookie, new Date().getTimezoneOffset());
                    // re-load the page
                    location.reload();
                }
            }
                // if the current timezone and the one stored in cookie are different
                // then store the new timezone in the cookie and refresh the page.
            else {
                var storedOffset = parseInt($.cookie(timezone_cookie));
                var currentOffset = new Date().getTimezoneOffset();
                // user may have changed the timezone
                if (storedOffset !== currentOffset) {
                    $.cookie(timezone_cookie, new Date().getTimezoneOffset());
                    location.reload();
                }
            }
        }
        $(".sidebar-toggle").show();
        var vTimeOutSecounds = @ViewBag.TimeOutSecounds * 1000;
        var vAutoRedirectURL = '@ViewBag.AutoRedirectURL';
        var time = new Date().getTime();
        //Fixed : FUS-4617
        $(document).bind("mousemove keypress",'body', function (e) {
            time = new Date().getTime();
        });
        function refresh() {
            if (new Date().getTime() - time >= vTimeOutSecounds)
                window.location.href=vAutoRedirectURL;
            else
                setTimeout(refresh, 30000);
        }
        setTimeout(refresh, 30000);
    </script>
    <style type="text/css">
        .sidebar-toggle {
            position: absolute;
            z-index: 11;
            /*right: -15px;*/
            height: 100%;
            background: #404040;
            width: 15px;
        }

        #left-panel-arrow {
            vertical-align: middle;
            color: #ffffff;
            position: relative;
            top: 40%;
            bottom: 60%;
            padding-left: 4px;
            font-size: 15px;
        }
    </style>
</head>

<body>
    <input type="hidden" id="hdnHomeVal" value="@Languages.Translation("mnuAdminHome")" />
    <div id="ajaxloading" class="loaderMain-wrapper">
        <div class="loaderMain-admin"></div>
    </div>
    <div id="divmenuloader" class="loaderMain-wrapper">
        <div class="loaderMain-admin" style="left: 6.5% !important"></div>
    </div>
    <input id="hdnRefInfo" type="hidden" />
    <div class="wrapper">
        <header class="main-header" style="z-index:999;">
            <nav class="navbar navbar-default navbar-fixed-top tab-nave" role="navigation">
                <div class="container-fluid">

                    <a id="aLogo" class="logo navbar-brand" href="/"><img src="@Url.Content("~/Images/logo.png")" class="img-responsive" /></a>
                    <div class="navbar-custom-menu pull-left" id="importSetup"></div>
                    <div class="navbar-custom-menu pull-left scanmenu"></div>
                    <span style="visibility:hidden" id="lblLoginUserName">@TabFusionRMS.WebVB.Keys.CurrentUserName</span>
                    @*<div class="pull-right">
                            <div class="admin_dropdown">
                                <a class="btn btn-inv dropdown-toggle theme_color" href="/logout.aspx">
                                    <i class="fa fa-sign-out"></i>
                                    @Languages.Translation("mnuSignOut")
                                </a>
                            </div>
                        </div>*@
                    <div class="collapse navbar-collapse navbar-right tab-menu" id="bs-example-navbar-collapse-1">
                        <ul class="nav navbar-nav">
                            <li>
                                <a id="hlHome" href="~/Data.aspx">@Languages.Translation("Home")</a>
                            </li>
                            <li>
                                <a id="hlHelp" href="help/Default.htm" target="Help">@Languages.Translation("Help")</a>
                            </li>
                            <li>
                                <a id="hlAboutUs">@Languages.Translation("About")</a>
                            </li>
                            <li>
                                <a id="hlSignout" href="/logout.aspx">@Languages.Translation("SignOut")</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>

        <aside class="main-sidebar" style="position:fixed;">
            <a href="#menu-toggle" class="sidebar-toggle" id="menu-toggle" data-toggle="offcanvas" role="button">
                <span class="sr-only">@Languages.Translation("ToggleNavigation")</span>
                <i class="fa fa-caret-left" id="left-panel-arrow"></i>
            </a>
            <section class="sidebar divMenu" style="visibility:hidden;">
                <ul class="drillDownMenu" id="liApplication">
                    <li>
                        <a href="#" id="RALADM0" onclick="setFirstMenuSelected(this)"><i class="font_icon theme_color fa fa-database"></i>@Languages.Translation("mnuApplication")</a>
                        <ul class="admindrill">
                            <li><a id="Attachments" onclick="staticMenus(this)">@Languages.Translation("Attachments")</a></li>
                            <li><a id="Auditing" onclick="staticMenus(this)">@Languages.Translation("mnuAuditing")</a></li>
                            <li><a id="Bar_code_view" onclick="staticMenus(this)">@Languages.Translation("mnuBarCodeSOrder")</a></li>
                            <li><a id="BackgroundProcess" onclick="staticMenus(this)">@Languages.Translation("mnuBackGroundProcess")</a></li>
                            <li><a id="email_notify" onclick="staticMenus(this)">@Languages.Translation("mnuEmailNotification")</a></li>
                            <li><a id="requestor" onclick="staticMenus(this)">@Languages.Translation("mnuRequestor")</a></li>
                            <li><a id="retention" onclick="staticMenus(this)">@Languages.Translation("mnuRetention")</a></li>
                            <li><a id="login_warning_msg" onclick="staticMenus(this)">@Languages.Translation("mnuLoginWarningMsg")</a></li>
                            <li>
                                <a id="tabquik" href="#">@Languages.Translation("lblTABQUIK")</a>
                                <ul id="ulTabquik">
                                    <li><a id="tabquikKey" onclick="staticMenus(this)">@Languages.Translation("lblTABQUIKKey")</a></li>
                                    <li><a id="tabquikfieldmapping" onclick="staticMenus(this)">@Languages.Translation("lblTABQUIKFieldMapping")</a></li>
                                </ul>
                            </li>
                            <li style="text-decoration-color:white !important;"><a id="tracking" onclick="staticMenus(this)">@Languages.Translation("mnuTracking")</a></li>
                        </ul>
                    </li>
                </ul>
                <ul class="drillDownMenu" id="liDatabase">
                    <li>
                        <a href="#" id="RALADM1" onclick="setFirstMenuSelected(this)"><i class="font_icon theme_color fa fa-database"></i>@Languages.Translation("mnuDatabase")</a>
                        <ul class="admindrill">
                            <li style="cursor:pointer"><a id="External_DB" onclick="staticMenus(this)">@Languages.Translation("mnuExternalDatabase")</a></li>
                            <li style="cursor:pointer"><a id="Map" onclick="staticMenus(this)">@Languages.Translation("mnuMap")</a></li>
                            <li style="cursor:pointer"><a id="table_register" onclick="staticMenus(this)">@Languages.Translation("mnuTableRegistration")</a></li>
                        </ul>
                    </li>
                </ul>
                <ul class="drillDownMenu" id="liDirectories">
                    <li>
                        <a href="#" id="Directories" onclick="setFirstMenuSelected(this)"><i class="font_icon theme_color fa fa-database"></i>@Languages.Translation("mnuDirectories")</a>
                        <ul class="admindrill">
                            <li><a id="Storage" onclick="staticMenus(this)">@Languages.Translation("mnuStorage")</a></li>
                        </ul>
                    </li>
                </ul>
                <ul class="drillDownMenu" id="liData">
                    <li>
                        <a href="#" id="Data" onclick="bindDynamicMenus(this)"><i class="font_icon theme_color fa fa-database"></i>@Languages.Translation("mnuData")</a>
                        <ul class="admindrill">
                            <div style="height:250px;margin-right:10px;overflow:auto;" id="ulData"></div>
                        </ul>
                    </li>
                </ul>
                <ul class="drillDownMenu" id="liTables">
                    <li>
                        <a id="TablesMain" href="#" onclick="bindDynamicMenus(this)"><i class="font_icon theme_color fa fa-database"></i>@Languages.Translation("mnuTables")</a>
                        <ul class="admindrill">
                            <div style="height:250px;margin-right:10px;overflow:auto;" id="ulTable"></div>
                        </ul>
                    </li>
                </ul>
                <ul class="drillDownMenu" id="liViews">
                    <li>
                        @*<a id="treeViews" href="#" onclick="setFirstMenuSelected(this)"><i class="font_icon theme_color fa fa-database"></i>@Languages.Translation("mnuViews")</a>*@
                        <a id="treeViews" href="#"><i class="font_icon theme_color fa fa-database"></i>@Languages.Translation("mnuViews")</a>
                        <ul id="ulViews"></ul>
                    </li>
                </ul>
                <ul class="drillDownMenu" id="liReports">
                    <li>
                        @*<a id="treeReports" href="#" onclick="setFirstMenuSelected(this)"><i class="font_icon theme_color fa fa-database"></i>@Languages.Translation("mnuReports")</a>*@
                        <a id="treeReports" href="#"><i class="font_icon theme_color fa fa-database"></i>@Languages.Translation("mnuReports")</a>
                        <ul id="ulReports"></ul>
                    </li>
                </ul>
                <ul class="drillDownMenu" id="liSecurity">
                    <li>
                        <a id="Security" href="#" onclick="setFirstMenuSelected(this)"><i class="font_icon theme_color fa fa-database"></i>@Languages.Translation("mnuSecurity")</a>
                        <ul class="admindrill">
                            <li><a id="Configuration" onclick="staticMenus(this)">@Languages.Translation("mnuConfiguration")</a></li>
                        </ul>
                    </li>
                </ul>
                @*<ul class="drillDownMenu" id="liLocalize">
                    <li>
                        <a id="Localization" href="#" onclick="setFirstMenuSelected(this)"><i class="font_icon theme_color fa fa-database"></i>@Languages.Translation("mnuLocalize")</a>
                        <ul class="admindrill">
                            <li><a id="ulLocalize" onclick="staticMenus(this)">@Languages.Translation("mnuLocalize")</a></li>
                        </ul>
                    </li>
                </ul>*@
            </section>
        </aside>

        <div class="content-wrapper" style="padding-left: 20px; margin-top: 70px; margin-bottom: 43px;">
            <div class="container-fluid">
                @RenderBody()
            </div>
        </div>
        <footer class="main-footer visible-md visible-lg" style="position: fixed; bottom: 0px;">
            <div class="col-lg-12">
                <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 no_padding">
                    <span class="pull-left footer-text footer-box-gap"><i class="fa fa-server" style="width: 15px"></i>@Languages.Translation("lblMainSERVER") <br> @TabFusionRMS.WebVB.Keys.ServerName</span>
                    <span class="pull-left footer-text footer-box-gap"><i class="fa fa-database" style="width: 15px"></i>@Languages.Translation("lblMainDATABASE") <br> @TabFusionRMS.WebVB.Keys.DatabaseName</span>
                    <span class="pull-left footer-text footer-box-gap"><i class="fa fa-user" style="width: 15px"></i>@Languages.Translation("lblMainUser")  <br> @TabFusionRMS.WebVB.Keys.CurrentUserName </span>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 footer-copyright-text text-right">
                    @String.Format(Languages.Translation("Copyright"), DateTime.Now.ToUniversalTime.Year, ViewContext.Controller.GetType().Assembly.GetName().Version.ToString())
                </div>
            </div>
        </footer>
    </div>
    <div class="form-horizontal" id="divAboutInfo">
    </div>
</body>
</html>
