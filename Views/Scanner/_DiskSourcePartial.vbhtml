


@Using Html.BeginForm(Nothing, Nothing, FormMethod.Post, New With {.id = "frmDiskSource", .class = "form-horizontal", .role = "form", .ReturnUrl = ViewData("ReturnUrl")})

    @<div class="modal fade" id="mdlDiskSource" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="myModalLabel">@Languages.Translation("tiDiskSourcePartialSelDiskSIpSett")</h4>
                </div>
                <div class="modal-body">
                    <fieldset>
                        <legend>@Languages.Translation("tiDiskSourcePartialFolderSel")</legend>
                        <div class="form-group row">
                            <div class="col-sm-12 col-md-12">
                                
                            </div>
                        </div>
                    </fieldset>


                    <fieldset>
                        <legend>@Languages.Translation("tiDiskSourcePartialIncExcFiles")</legend>
                        <div class="form-group row">
                        </div>
                    </fieldset>

                </div>
                <div class="modal-footer">
                    <button id="btnOk" type="button" class="btn btn-primary">@Languages.Translation("Ok")</button>
                    <button id="btnCancel" type="button" class="btn btn-primary" data-dismiss="modal" aria-hidden="true">@Languages.Translation("Cancel")</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>

                    End Using

<script src="@Url.Content("~/Scripts/AppJs/Scanner.js")"></script>
