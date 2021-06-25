@*@Imports TabFusionRMS.Models*@
@ModelType TabFusionRMS.WebVB.FlyoutModel

<input type="hidden" id="sPageSize" value="@Model.sPageSize" />
<input type="hidden" id="sPageIndex" value="@Model.sPageIndex " />
<input type="hidden" id="totalRecCount" value="@Model.totalRecCount" />
<input type="hidden" id="viewName" value="@Model.viewName" />
<input type="hidden" id="stringQuery" value="@Model.stringQuery" />


<div class="row" id="ThumbnailDetails">
    @Code Dim i = 0 End Code

    @If (Model.FlyOutDetails.Count > 0) Then
        @For Each item In Model.FlyOutDetails
            i = i + 1
            Dim img64 As String = String.Empty
            Dim dockey = item.downloadEncryptAttachment
            If item.sFlyoutImages IsNot Nothing Then img64 = Convert.ToBase64String(item.sFlyoutImages)

            @<div Class="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                 <div Class="Thmbnail-main">
                     <div Class="Thmbnail-header">@item.sAttachmentName</div>
                     @If Not item.sViewerLink = "0" Then
                         @<a href="@item.sViewerLink" target="_blank">
                             <div Class="Thmbnail-body">
                                 <div Class="caption">
                                     <div Class="caption-content">
                                         <i Class="fa fa-eye fa-3x"></i>
                                     </div>
                                 </div>
                                 <img src="@String.Format("data:image/jpg;base64,{0}", img64)" id="@i" Class="img-responsive" width="300px" height="280px" onclick="Demo()">
                             </div>
                         </a>
                     Else
                         @<a disabled="disabled" onclick="InvalidMessage()">
                             <div Class="Thmbnail-body">
                                 <div Class="caption">
                                     <div Class="caption-content">
                                         <i Class="fa fa-eye fa-3x"></i>
                                     </div>
                                 </div>
                                 <img src="@String.Format("data:image/jpg;base64,{0}", img64)" id="@i" Class="img-responsive" width="300px" height="280px" onclick="Demo()">
                             </div>
                         </a>
                     End If
                     <div Class="Thmbnail-footer">
                         <div Class="col-md-12 col-sm-12 col-xs-12">
                             <span Class="fa-stack">
                                 @If (Model.downloadPermission AndAlso Not item.sOrgFilePath = "disabled") Then
                                     @<a href="@Url.Action("DownloadAttachment", "Common", New With {.filePath = item.sOrgFilePath, .fileName = item.sAttachmentName, .docKey = dockey})" Class="a-color " data-toggle="tooltip" title="Download">
                                         <span class="fa-stack">
                                             <i class="fa fa-arrow-down fa-stack-1x" style="top:7"></i>
                                             <i class="fa fa-circle-thin fa-stack-2x"></i>
                                         </span>
                                     </a>
                                 Else
                                     @<a href="#" Class="a-disable" data-toggle="tooltip" title="Download" style="color:gray !important">
                                         <span class="fa-stack">
                                             <i class="fa fa-arrow-down fa-stack-1x"></i>
                                             <i class="fa fa-circle-thin fa-stack-2x"></i>
                                         </span>
                                     </a>
                                 End If

                             </span>
                         </div>
                         <div Class="clearfix"></div>
                     </div>
                 </div>
            </div>
        Next
    Else
        @<div class="col-sm-12">
            <div id="emptydrop" Class="empty-drop-here">
                <span>@Languages.Translation("lblDragandDropFiles")</span>
            </div>
        </div>

    End If

</div>


<script>
    function InvalidMessage(isvalid) {
        var msg = "Attachment cannot be rendered or displayed. The attachment can still be downloaded.!"
        $('#toast-container').fnAlertMessage({ title: '', msgTypeClass: 'toast-warning', message: msg, timeout: 2000 });
    }
</script>


