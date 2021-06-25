var stage;
var layer;

var i = 1;
var myobject;


function printLabel() {
    //$('#printPreview').removeAttr("src").hide();
    var hgud = stage.find("#image1")[0];
    var inMemoryCanvas;
    if (document.getElementsByTagName('canvas').length != 1) {
        inMemoryCanvas = document.getElementsByTagName('canvas')[1];
    } else {
        inMemoryCanvas = document.getElementsByTagName('canvas')[0];
    }
    
    inMemoryCanvas.toBlob(function (blob) {
        var container = document.getElementById('previewContainer');
        //$('#printPreview').attr("src", "").show();
        var img = document.getElementById('printPreview');
        img.setAttribute('src', (window.URL || window.URL).createObjectURL(blob));
    });
    
}

function drawExistingLabel(jsonObject, jsonData, labelData, formData,outline,preview,start,lblCount,printClick) {
    var multiple = false;

    if (jsonData.length > 1) {
        multiple = true;
    }
    $('#totalLabels').text(lblCount);
    var pageCount = $('#pageCount').text();
    $('#totalPages').text(pageCount);
    var pageWidth = formData.PageWidth;
    var pageHeight = formData.PageHeight;
    initialize(pageHeight, pageWidth, multiple);

    var labelAcross = formData.LabelsAcross;
    var labelDown = formData.LabelsDown;

    if (jsonData.length > labelAcross * labelDown) {

    }

    var array;
    var flag = jsonObject.length;
    var lSize;

    if (formData.Name.indexOf('1 Up') >= 0) {
        lSize = 0;
    } else {
        lSize = 1;
    }

    //var pageWidth = formData.PageWidth;
    //var pageHeight = formData.PageHeight;
    var labelOffsetX = formData.LabelOffsetX;
    var labelOffsetY = formData.LabelOffsetY;
    var labelWidth = formData.LabelWidth;
    var labelHeight = formData.LabelHeight;
    var labelWidthEdgeToEdge = formData.LabelWidthEdgeToEdge;
    var labelHeightEdgeToEdge = formData.LabelHeightEdgeToEdge;
    
    var labelAcrossGap, labelDownGap;

    //find the gap between labels across and down
    if (labelWidthEdgeToEdge != labelWidth) {
        labelAcrossGap = labelWidthEdgeToEdge - labelWidth;
    }

    if (labelHeightEdgeToEdge != labelHeight) {
        labelDownGap = labelHeightEdgeToEdge - labelHeight;
    }
    //finish the gap calculations.

    //convert to pixel.
    var pixPageWidth = (pageWidth / 15) * 2;
    var pixPageHeight = (pageHeight / 15) * 2;
    var pixLabelOffsetX = (labelOffsetX / 15) * 2;
    var pixLabelOffsetY = (labelOffsetY / 15) * 2;
    var pixLabelWidth = ((labelWidth / 15) + 8) * 2;
    var pixLabelHeight = ((labelHeight / 15) + 3) * 2;
    var pixLabelWidthEdgeToEdge = ((labelWidthEdgeToEdge / 15) + 8) * 2;
    var pixLabelHeightEdgeToEdge = ((labelHeightEdgeToEdge / 15) + 3) * 2;
    
    //initialize(pageHeight, pageWidth, multiple,pixLabelOffsetX,pixLabelOffsetY,pixLabelWidthEdgeToEdge,pixLabelHeightEdgeToEdge);
    //var pixLabelAcrossGap = labelAcrossGap / 15;
    //var pixLabelDownGap = labelDownGap / 15;
    //finsh conversion.
    if (outline) {
        drawOutline(labelAcross, labelDown, pixLabelOffsetX, pixLabelOffsetY, pixLabelWidthEdgeToEdge, pixLabelHeightEdgeToEdge, pixLabelWidth, pixLabelHeight);
    } else {
        printLabel();
    }

    if (preview) {
        var xOffsetForLabel, yOffsetForLabel;
        $(jsonData).each(function (j, w) {


            //if (j == 0) {
            //    xOffsetForLabel = 0;
            //    yOffsetForLabel = 0
            //} else {
            //    xOffsetForLabel = xOffsetForLabel + pixLabelOffsetX;
            //    if (j > (labelAcross - 1)) {

            //    }
            //    yOffsetForLabel = yOffsetForLabel + pixLabelOffsetY;
            //}

            $(jsonObject).each(function (i, v) {
                var dRatio = 2;
                if ((pixPageWidth / pixPageHeight) < (pixPageHeight / pixPageWidth)) {
                    fRatio = pixLabelHeight / pixPageHeight;
                } else {
                    fRatio = pixLabelWidth / pixPageWidth;
                }

                var type = v.Type;
                var tableName = $('#tableForLabel').text().split(":")[1].toString();
                var fieldName = v.FieldName;
                if (fieldName != null) {
                    fieldName = RemoveTableNameFromField(fieldName);
                }
                var width = v.BCWidth;
                var height = v.BCHeight;
                var xpos = v.XPos;
                var ypos = v.YPos;
                var id = v.Id;
                var foreColor = v.ForeColor;
                var backColor = v.BackColor;
                var fontSize = v.FontSize;
                var fontName = v.FontName;
                var fontStyle;
                var fontBold = v.FontBold;
                var fontItalic = v.FontItalic;
                var UPC = v.BCUPCNotches;
                var direc = v.BCDirection;
                var barWidth = v.BCBarWidth;
                var align = v.Alignment;
                var xposPixel = (xpos / 15);
                var yposPixel = (ypos / 15);

                //xposPixel = xposPixel / dRatio;
                //yposPixel = yposPixel / dRatio;

                var widthPixel = (width / 15);
                var heightPixel = (height / 15);

                if (type == 'B' || type == 'Q') {
                    switch (align) {
                        case 1:
                            xposPixel = xposPixel - widthPixel;
                            break;
                        case 2:
                            xposPixel = xposPixel - (widthPixel / 2);
                            break;
                        case 0:
                            xposPixel = xposPixel;
                            break;
                    }
                }

                var barXPos = xposPixel * dRatio;
                var barYPos = yposPixel * dRatio;

                widthPixel = widthPixel * dRatio;
                heightPixel = heightPixel * dRatio;
                
                var x = j % labelAcross;
                var y = 0;
                var z;
                if (j < labelAcross) {
                    y = 0;
                } else {
                    for (z = 2; z <= labelDown ; z++) {
                        if (labelAcross <= j && j < (labelAcross * z)) {
                            y = z - 1;
                            break;
                        }
                    }
                }

                var cnt = start - 1;
                var x1 = 0;
                var y1 = 0;
                var z1 = 0;
                //if ((x * y) != cnt) {
                    x1 = cnt % labelAcross;
                    if (cnt < labelAcross) {
                        y1 = 0;
                    } else {
                        for (z1 = 2; z1 <= labelDown ; z1++) {
                            if (labelAcross <= cnt && cnt < (labelAcross * z1)) {
                                y1 = z1 - 1;
                                break;
                            }
                        }
                    }
                //}
                    var fX, fY;
                    fX = x + x1;
                    fY = y + y1;
                    if (fX > (labelAcross - 1)) {
                        fX = (fX - (labelAcross - 1)) - 1;
                        fY = fY + 1;
                    }
                    
                //var y = j % labelDown;
                var xDiff = pixLabelOffsetX + pixLabelWidthEdgeToEdge * fX ;
                var yDiff = pixLabelOffsetY + pixLabelHeightEdgeToEdge * fY ;
                barXPos = barXPos + xDiff - 10;
                barYPos = barYPos + yDiff - 3;



                if (fontBold) {
                    fontStyle = "bold";
                }

                if (fontItalic) {
                    if (fontStyle) {
                        fontStyle = fontStyle + " italic";
                    } else {
                        fontStyle = "italic";
                    }
                } else {
                    if (!fontStyle) {
                        fontStyle = "normal";
                    }
                }

                var fontUnderline = v.FontUnderline;
                var fontStrike = v.FontStrikeThru;
                var fontTrans = v.FontTransparent;
                var fontOri = v.FontOrientation;

                var alignment;
                switch (align) {
                    case 0:
                        alignment = "Left";
                        break;
                    case 1:
                        alignment = "Right";
                        break;
                    case 2:
                        alignment = "Center";
                        break;
                }

                var startChar = v.StartChar;
                var maxLen = v.MaxLen;
                var spcFunction = v.SpecialFunctions;

                var values;
                var txtColor;

                txtColor = _AccessToHex(foreColor);
                if (txtColor.length != 7) {
                    while (txtColor.length != 7) {
                        txtColor = txtColor + "0";
                    }
                }

                var bgColor;

                bgColor = _AccessToHex(backColor);
                if (bgColor.length != 7) {
                    while (bgColor.length != 7) {
                        bgColor = bgColor + "0";
                    }
                }

                var print = false;
                if (type != 'S') {
                    //var fieldName = v.FieldName;
                    var format = v.Format;
                    if (fieldName) {
                        var fName;
                        if (fieldName.indexOf(':') === -1) {
                            fName = fieldName;
                        } else {
                            var fieldNames = fieldName.split(".");
                            fName = fieldNames[1].toString();
                        }

                        values = jsonData[j][fName];
                        if (!values) {
                            var keys = Object.keys(jsonData[j]);
                            $(keys).each(function (k, l) {
                                if (l.toLowerCase().trim().toString() == fName.toLowerCase().trim().toString()) {
                                    fName = l;
                                }
                            });
                            values = jsonData[j][fName];
                        }

                        if (!values) {
                            values = 0;
                        }

                        values = values.toString();
                    }
                    if (values != 0) {
                        if (startChar != 0) {
                            if (maxLen != 0) {
                                values = values.substring(startChar, maxLen);
                            } else {
                                values = values.substring(startChar);
                            }
                        } else {
                            if (maxLen != 0) {
                                values = values.substring(maxLen, startChar);
                            }
                        }
                    }
                    if (values != 0) {
                        if (format) {
                            if (fieldName.toLowerCase().indexOf("date") >= 0) {
                                //var tempDate = Date.parse(fValue);
                                //var dhoom = Date.parseExact('01/13/2013', 'd/M/yyyy');
                                var date = new Date(values);
                                values = date.toLocaleDateString();

                                //fValue = tempDate.toString(format);
                            } else {
                                var tempFValue, tFormat;
                                tempFormat = format.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
                                var fLength = tempFormat.length;
                                tFormat = tempFormat.substring(0, fLength - 1);
                                tempFValue = tFormat + values;
                                values = tempFValue;
                            }
                        }
                    }

                    if (fieldName.toLowerCase().indexOf("date") >= 0) {
                        if (values.indexOf('T') >= 0) {
                            values = values.replace('T', ' ');
                        }
                        //Changed by Hasmukh on 06/15/2016 for date format changes
                        if (values.length > 9) {
                            //values = moment(values).format(getDatePreferenceCookieForMoment().toUpperCase());
                            var dateFormated = new Date(values);
                            values = moment(dateFormated).format(getDatePreferenceCookieForMoment().toUpperCase());
                        }
                    }

                    switch (type) {
                        case "B":
                        case "Q":
                            var barcodestyle = v.BCStyle;
                            barWidth = v.BCBarWidth;
                            var bcDirection = v.BCDirection;
                            var UPCNotches = v.BCUPCNotches;
                            var imageObj = new Image();
                            var bcstyle;
                            if (type == 'B') {
                                switch (barcodestyle) {
                                    case 1:
                                        bcstyle = "CODE128";
                                        break;
                                    case 2:
                                        bcstyle = "EAN";
                                        break;
                                    case 3:
                                        bcstyle = "CODE39";
                                        break;
                                    case 4:
                                        bcstyle = "CODE39";
                                        break;
                                    case 5:
                                        bcstyle = "ITF14";
                                        break;
                                    case 6:
                                        bcstyle = "ITF";
                                        break;
                                    default:
                                        bcstyle = "CODE39";
                                        break;
                                }
                                imageObj.id = values;
                                imageObj.height = heightPixel;
                                imageObj.width = widthPixel;
                                var imgID = imageObj.getAttribute('id');
                                if (barWidth != 0) {
                                    $('#tempimg').JsBarcode(values, { height: heightPixel, format: bcstyle, lineColor: txtColor, width: barWidth, backgroundColor: bgColor });
                                } else {
                                    $('#tempimg').JsBarcode(values, { height: heightPixel, format: bcstyle, lineColor: txtColor, backgroundColor: bgColor });
                                }
                                var loc = $('#tempimg').attr("src");
                                print = false;
                                if (flag - 1 == i) {
                                    print = true;
                                }
                                imageObj.onload = function () {
                                    //drawImage(this, widthPixel, heightPixel, fieldName, type, barcodestyle, barXPos, barYPos, id,foreColor,backColor,alignment,startChar,maxLen,v.Format,UPCNotches,bcDirection,barWidth);
                                };
                                imageObj.src = loc;
                                drawImage(imageObj, widthPixel, heightPixel, fieldName, type, barcodestyle, barXPos, barYPos, id, foreColor, backColor, alignment, startChar, maxLen, v.Format, UPCNotches, bcDirection, barWidth);
                            } else {
                                switch (barcodestyle) {
                                    case 1:
                                        bcstyle = "L";
                                        break;
                                    case 2:
                                        bcstyle = "M";
                                        break;
                                    case 3:
                                        bcstyle = "Q";
                                        break;
                                    case 4:
                                        bcstyle = "H";
                                        break;
                                    default:
                                        bcstyle = "L";
                                        break;
                                }
                                imageObj.id = "qrcodes";
                                print = false;
                                if (flag - 1 == i) {
                                    print = true;
                                }
                                imageObj.onload = function () {
                                    //drawImage(this, widthPixel, heightPixel, fieldName, type, barcodestyle, barXPos, barYPos, id,foreColor,backColor,alignment,startChar,maxLen,v.Format,UPCNotches,bcDirection.toString(),"");
                                };

                                var options = {
                                    ecLevel: bcstyle,
                                    fill: txtColor,
                                    background: bgColor,
                                    text: values,
                                    quiet: UPCNotches,
                                    size: widthPixel
                                };


                                $('#output').qrcode(options);

                                print = false;
                                if (flag - 1 == i) {
                                    print = true;
                                }
                                var canvas = $('#output canvas');

                                imageObj.src = canvas.get(0).toDataURL("image/png");
                                drawImage(imageObj, widthPixel, heightPixel, fieldName, type, barcodestyle, barXPos, barYPos, id, foreColor, backColor, alignment, startChar, maxLen, v.Format, UPCNotches, bcDirection.toString(), "");
                                $('#output').empty();
                            }

                            break;
                        case "T":
                            print = false;
                            if (flag - 1 == i) {
                                print = true;
                            }
                            drawText(values.toString(), type, barXPos, barYPos, fieldName, id, foreColor, backColor, fontName, fontSize, alignment, fontOri, fontStyle, fontTrans, fontUnderline, fontStrike, startChar, maxLen, height, width, v.Format);
                            break;
                    }

                } else {
                    print = false;
                    if (flag - 1 == i) {
                        print = true;
                    }
                    drawText(v.Format, type, barXPos, barYPos, fieldName, id, foreColor, backColor, fontName, fontSize, alignment, fontOri, fontStyle, fontTrans, fontUnderline, fontStrike, "", "", height, width, "");
                }

            });
        });
        if (printClick) {
            setTimeout(
            function () {
                $("#bPrint").trigger("click");
            },
            (3000)
            );
            
        }
    } else {
        printLabel();
    }

}

function drawOutline(labelAcross, labelDown, pixLabelOffsetX, pixLabelOffsetY, pixLabelWidthEdgeToEdge, pixLabelHeightEdgeToEdge, pixLabelWidth, pixLabelHeight) {
    
    for (k = 0 ; k < labelAcross * labelDown ; k++) {
        
        var x = k % labelAcross;
        var y = 0;
        var z;
        if (k < labelAcross) {
            y = 0;
        } else {
            for (z = 2; z <= labelDown ; z++) {
                if (labelAcross <= k && k < (labelAcross * z)) {
                    y = z - 1;
                    break;
                }
            }
        }

        var xPos = pixLabelOffsetX + (x * pixLabelWidthEdgeToEdge);
        var yPos = pixLabelOffsetY + (y * pixLabelHeightEdgeToEdge);
        
        var box = new Kinetic.Rect({
            //x: finalX,
            //y: finalY,
            x: xPos - 10,
            y: yPos - 3,
            width: pixLabelWidth,
            height: pixLabelHeight,
            stroke: 'black',
            strokeWidth: 1,
            dash: [3,3]
        });

        layer.add(box);
        stage.add(layer);
    }
}

function initialize(height, width, multiple) {
    var displayWidth = (parseFloat(width.toString())) / 15;
    var displayHeight = (parseFloat(height.toString())) / 15;
    //var containerHeight = $(".navbar-default").height();
    //var containerWidth = $(".navbar-default").width();
    //var pageViewerHeight = $("#abcd").height();
    //var pageViewerWidth = $("#abcd").width();

    //var labelLeft = containerWidth - pageViewerWidth;
    //var dRatio = (containerWidth - 60) / width;

    //var displayHeight = height * dRatio;
    //var displayWidth = width * dRatio;

    //displayHeight = 1056;
    //displayWidth = 816;

    
    if (displayHeight < 1000 && displayWidth < 800) {
                    displayHeight = 1056;
                    displayWidth = 816;
    }
    
    displayHeight = displayHeight * 2;
    displayWidth = displayWidth * 2;

    $('#abcd').css('width', displayWidth);
    $('#abcd').css('height', displayHeight);

    stage = new Kinetic.Stage({
        container: "abcd",
        width: parseFloat(displayWidth),
        height: parseFloat(displayHeight)
    });

    

    layer = new Kinetic.Layer({
        name: 'layer'
    });

    stage.add(layer);
    

}

function drawImage(imageObj, width, height, fieldName, type, bcstyle, xpos, ypos, id, color, bgColor, align,startChar, maxLen, format,upcNocthes,direction,barWidth) {
    var containerHeight = $(".navbar-default").height();
    if (ypos) {
        containerWidth = $(".navbar-default").width() - 17;
    } else {
        containerWidth = $(".navbar-default").width();
    }


    var pageViewerHeight = $("#abcd").height() + 2;
    var pageViewerWidth = $("#abcd").width() + 2;

    var labelWidth = parseFloat($('#labelWidth').text()) / 15;
    var labelHeight = parseFloat($('#labelHeight').text()) / 15;

    var displayHeight, displayWidth, displayTop, displayLeft, barXPos, barYPos;;

    var labelLeft = $('#abcd').css('left').replace(/[^-\d\.]/g, '');
    labelLeft = parseFloat(labelLeft);

    dRatio = 2;

    if (labelWidth != 0) {
        dRatio = (containerWidth - 4 - (labelLeft * 2)) / labelWidth;
    }
    dRatio = 2;
    var ID;
    if (id) {
        ID = id;
    } else {
        ID = null;
    }

    var oXPos;
    var oYPos;


    //if (type == 'B') {
    //    displayWidth = width * dRatio / 2;// width * dRatio / 2;
    //    displayHeight = height * dRatio / 5;//height * dRatio / 2;
    //} else {
    //    displayHeight = 108;
    //    displayWidth = 108;
    //}
    //if (!xpos && !id) {
    //  xpos = oXPos = 100;
    //}else if(xpos && !id){
    oXPos = xpos;
    //}else {
    //  oXPos = xpos / 15; //displayWidth / 2;
    //}

    //if (!ypos && !id) {
    //  ypos = oYPos = 100;
    //} else if (ypos && !id) {
    oYPos = ypos;
    //} else {
    //  if (pageViewerHeight > ypos) {
    //      oYPos = ((pageViewerHeight - ypos) / 2) / dRatio;
    //                } else {
    //                  oYPos = ((ypos - pageViewerHeight) / 2) / dRatio;
    //            }
                
    //////        //oYPos = ypos / 20; //((containerHeight - displayHeight) / 2) / dRatio;
    //      }

    if (color && !id) {
        txtColor = _HexToAccess(color);
    } else {
        if (!id) {
            txtColor = "0";
        } else {
            color = _AccessToHex(color);
            if (color.length != 7) {
                while (color.length != 7) {
                    color = color + "0";
                }
            }
            txtColor = _HexToAccess(color);
        }
    }

    if (bgColor && !id) {
        backColor = _HexToAccess(bgColor);
    } else {
        if (!id) {
            backColor = "0";
        } else {
            bgColor = _AccessToHex(bgColor);
            if (bgColor.length != 7) {
                while (bgColor.length != 7) {
                    bgColor = bgColor + "0";
                }
            }
            backColor = _HexToAccess(bgColor);
        }
    }

    var offsetX = 0;
    var offsetY = 0;
    if (type == 'Q') {
        //offsetX = 50;
        //offsetY = 50;
    }

    var CanvasImage = new Kinetic.Image({
        image: imageObj,
        x: parseFloat(oXPos.toString()),
        y: parseFloat(oYPos.toString()),
        oX: parseFloat(xpos.toString()),
        oY: parseFloat(ypos.toString()),
        oWidth: width,
        oHeight: height,
        //draggable: true,
        resizable: true,
        id: ID,
        field: fieldName,
        type: type,
        bcstyle: bcstyle,
        align: align,
        startChar: startChar,
        maxLen: maxLen,
        backColor: backColor,
        boxHeight: height,
        boxWidth: width,
        format: format,
        upc: upcNocthes,
        direc: direction,
        barWidth: barWidth,
        textColor: txtColor,
        textHexColor: color,
        backHexColor: bgColor,
        offsetX: offsetX,
        offsetY:offsetY
    });

    if (direction && type == 'Q') {
        var orie;
        switch (direction) {
            case "0":
                orie = 0;
                break;
            case "1":
                orie = 90;
                CanvasImage.rotate(orie);
                break;
            case "2":
                orie = 180;
                CanvasImage.rotate(orie);
                break;
            case "3":
                orie = 270;
                CanvasImage.rotate(orie);
                break;
        }
    }

    layer.add(CanvasImage);
    //stage.add(layer);
    //layer.draw();
    //printLabel();
    window.setTimeout(function () {
        stage.add(layer);
        layer.draw();
        printLabel();
    }, 250);
    
}

function ConvertToBCType(barcodestyle) {
    var bcstyle;
    switch (barcodestyle) {
        case 1:
            bcstyle = "CODE128";
            break;
        case 2:
            bcstyle = "EAN";
            break;
        case 3:
            bcstyle = "UPC";
            break;
        case 4:
            bcstyle = "CODE39";
            break;
        case 5:
            bcstyle = "ITF14";
            break;
        case 6:
            bcstyle = "ITF";
            break;
        default:
            bcstyle = "CODE39";
            break;
    }
    return bcstyle;
}

function ConvertToQRType(barcodestyle) {
    var bcstyle;
    switch (barcodestyle) {
        case 1:
            bcstyle = "L";
            break;
        case 2:
            bcstyle = "M";
            break;
        case 3:
            bcstyle = "Q";
            break;
        case 4:
            bcstyle = "H";
            break;
        default:
            bcstyle = "L";
            break;
    }
    return bcstyle;
}

function drawText(txtObj, type, xpos, ypos, fieldName, id, color, bgColor, fontFamily, fontSize, align, orie, fontStyle, transparent, underline, strike, startChar, maxLen, boxHeight, boxWidth, format) {
    var ID;
    var txtColor, backColor;

    var containerHeight = $(".navbar-default").height();
    if (ypos) {
        containerWidth = $(".navbar-default").width() - 17;
    } else {
        containerWidth = $(".navbar-default").width();
    }


    var pageViewerHeight = $("#abcd").height() + 2;
    var pageViewerWidth = $("#abcd").width() + 2;

    var labelWidth = parseFloat($('#labelWidth').text()) / 15;
    var labelHeight = parseFloat($('#labelHeight').text()) / 15;

    var displayHeight, displayWidth, displayTop, displayLeft, barXPos, barYPos;;

    var labelLeft = $('#abcd').css('left').replace(/[^-\d\.]/g, '');
    labelLeft = parseFloat(labelLeft);

    dRatio = 2;

    if (labelWidth != 0) {
        dRatio = (containerWidth - 4 - (labelLeft * 2)) / labelWidth;
    }
    dRatio = 2;
    if (id) {
        ID = id;
    } else {
        ID = null;
    }

    var oXPos;
    var oYPos;

    var fieldNames;
    if (type == 'T') {
        fieldNames = fieldName;
    } else {
        fieldNames = null;
    }

    //if (!xpos) {
    //  xpos = oXPos = 100;
    //} else if (xpos && !id) {
    oXPos = xpos;
    //} else {
    //  oXPos = xpos / 20; 
    //}

    //if (!ypos) {
    //ypos = oYPos = 100;
    //} else if (ypos && !id) {
    oYPos = ypos;
    //} else {
    //  oYPos = ((pageViewerHeight - ypos) / 2) / dRatio;
    //////  //oYPos = ypos / 20; //((containerHeight - displayHeight) / 2) / dRatio;
    //}

    if (color && !id) {
        txtColor = _HexToAccess(color);
    } else {
        if (!id) {
            txtColor = "0";
        } else {
            color = _AccessToHex(color);
            if (color.length != 7) {
                while (color.length != 7) {
                    color = color + "0";
                }
            }
            txtColor = _HexToAccess(color);
        }
    }

    if (bgColor && !id) {
        backColor = _HexToAccess(bgColor);
    } else {
        if (!id) {
            backColor = "0";
        } else {
            bgColor = _AccessToHex(bgColor);
            if (bgColor.length != 7) {
                while (bgColor.length != 7) {
                    bgColor = bgColor + "0";
                }
            }
            backColor = _HexToAccess(bgColor);
        }
    }

    if (type == 'T') {
        if (txtObj != 0) {
            if (startChar != 0) {
                if (maxLen != 0) {
                    txtObj = txtObj.substring(startChar, maxLen);
                } else {
                    txtObj = txtObj.substring(startChar);
                }
            } else {
                if (maxLen != 0) {
                    txtObj = txtObj.substring(maxLen, startChar);
                }
            }
        }
    }

    if (!fontSize) {
        fontSize = 30;
    }

    var fontPixel = fontSize * dRatio * 1.333333;

    var bold, italic;
    if (fontStyle) {
        if (fontStyle.indexOf("bold") > -1) {
            bold = true;
        } else {
            bold = false;
        }

        if (fontStyle.indexOf("italic") > -1) {
            italic = true;
        } else {
            italic = false;
        }
    }


    var textGroup = new Kinetic.Group({
        x: parseFloat(oXPos.toString()),
        y: parseFloat(oYPos.toString()),
        //draggable: true,
        oX: parseFloat(xpos.toString()),
        oY: parseFloat(ypos.toString()),
        text: txtObj,
        fill: color,
        testing: true,
        id: ID,
        type: type,
        field: fieldNames,
        textColor: txtColor,
        fontFamily: fontFamily,
        fontSize: fontPixel,
        font: fontSize,
        fontStyle: fontStyle,
        align: align,
        orie: orie,
        underline: underline,
        strikethru: strike,
        trans: transparent,
        startChar: startChar,
        maxLen: maxLen,
        bold: bold,
        italic: italic,
        backColor: backColor,
        bColorHex: bgColor,
        boxHeight: boxHeight,
        boxWidth: boxWidth,
        format: format
    });

    var text = new Kinetic.Text({
        //x: parseInt(oXPos.toString()),
        //y: parseInt(oYPos.toString()),
        x: 0,
        y: 0,
        oX: parseInt(xpos.toString()),
        oY: parseInt(ypos.toString()),
        text: txtObj,
        fill: color,
        //draggable: true,
        id: ID,
        type: type,
        field: fieldNames,
        textColor: txtColor,
        fontFamily: fontFamily,
        fontSize: fontPixel,
        font: fontSize,
        fontStyle: fontStyle,
        align: align,
        orie: orie,
        underline: underline,
        strikethru: strike,
        trans: transparent,
        startChar: startChar,
        maxLen: maxLen,
        bold: bold,
        italic: italic,
        backColor: backColor,
        bColorHex: bgColor,
        boxHeight: boxHeight,
        boxWidth: boxWidth,
        format: format
    });

    //text.setListening(true);

    if (orie) {
        var tmpOrie = 360 - orie;
        textGroup.rotate(tmpOrie);
    }

    var textHeight = text.getTextHeight();
    var textWidth = text.getTextWidth();
    var atextHeight = parseInt(oXPos.toString()) - textWidth;
    var atextWidth = parseInt(oYPos.toString()) - textHeight;
    //650,209

    var iXadd = textWidth;
    var iTmpAngle = orie;
    var iSizePix = fontSize * dRatio;
    //iXadd = 204;
    //iTmpAngle = 0;
    //iSizePix = 103;
    textWidth = (iXadd * Math.cos(iTmpAngle * (3.1456927 / 180))) + (iSizePix * Math.sin(iTmpAngle * (3.1456927 / 180)));
    var textWHeight = (iXadd * Math.sin(iTmpAngle * (3.1456927 / 180))) + (iSizePix * Math.cos(iTmpAngle * (3.1456927 / 180)));
    textHeight = (iXadd * Math.sin(iTmpAngle * (3.1456927 / 180)));
    iXadd = (iXadd * Math.cos(iTmpAngle * (3.1456927 / 180))) + (iSizePix * Math.sin(iTmpAngle * (3.1456927 / 180)));

    switch (align) {
        case "Left":
            iXadd = 0;
            break;
        case "Center":
            iXadd = iXadd / 2;
            break;
        case "Right":
            iXadd = iXadd;
            break;
    }

    var tempX, tempY;
    tempX = parseInt(oXPos.toString());
    tempY = parseInt(oYPos.toString());

    var finalX, finalY;

    if ((orie >= 0) && (orie <= 90)) {
        finalX = tempX - iXadd;
        finalY = tempY + textHeight;
    } else if ((orie > 90) && (orie <= 180)) {
        finalX = tempX - iXadd + (iSizePix * Math.cos(orie * (3.1456927 / 180)));
        finalY = tempY + iTextHeight + (iSizePix * Math.cos(orie * (3.1456927 / 180)));
    } else if ((orie > 180) && (orie <= 270)) {
        finalX = tempX - iXadd;
        finalY = tempY + (iSizePix * Math.cos((orie - 180) * (3.1456927 / 180)));
    } else if ((orie > 270) && (orie <= 360)) {
        finalX = tempX - iXadd + (iSizePix * Math.sin(orie * (3.1456927 / 180)));
        finalY = tempY;
    }

    //finalX = 100;
    //finalY = 100;

    //text.x(finalX);
    //text.y(finalY);

    textGroup.x(finalX);
    textGroup.y(finalY);

    
    //text.setStrokeWidth(1);
    //text.setStroke("Red");

    var tHeight = text.getTextHeight();
    var tWidth = text.getTextWidth();

    var box = new Kinetic.Rect({
        //x: finalX,
        //y: finalY,
        x: 0,
        y: 0,
        width: tWidth,
        height: tHeight,
        fill: bgColor
    });

    var ul = new Kinetic.Line({
        points: [0, parseFloat(fontPixel), parseFloat(tWidth), parseFloat(fontPixel)],
        strokeWidth: 1,
        stroke: color
        //draggable: true
    });

    stage.add(layer);

    layer.add(textGroup);

    textGroup.add(box);
    textGroup.add(text);

    if (underline) {
        textGroup.add(ul);
    }

    layer.draw();

    printLabel();
}

function _AccessToHex(color) {
    return "#" + color.toString(16).split("").reverse().join("");
}

function _HexToAccess(color) {
    return parseInt(color.split("").reverse().join(""), 16);
}

function _pixelToPts(num) {
    return num * 0.75; //Point = Pixel * 0.75
}

function _PtsToPixel(num) {
    return num * 1.33; //Pixel = Point * 1.33
}

function RestrictBarcodeXToLabel(xpos, width, dRatio, picWidth) {
    var tempXPos = xpos;

    if ((xpos * dRatio) >= (picWidth - 6.667)) {
        tempXPos = (picWidth - 6.667) / dRatio;
    } else if ((xpos + width) <= 6.667) {
        tempXPos = (width * -1) + 6.667;
    }
    return tempXPos;
}

function RestrictBarcodeYToLabel(ypos, height, dRatio, picHeight) {
    var tempYPos = ypos;

    if ((ypos * dRatio) >= (picHeight - 6.667)) {
        tempYPos = (picHeight - 6.667) / dRatio;
    } else if ((ypos + height) <= 6.667) {
        tempYPos = (height * -1) + 6.667;
    }
    return tempYPos;
}

function RemoveTableNameFromField(sFieldName) {
    var i, tmpField;

    tmpField = sFieldName;
    i = sFieldName.indexOf(".");
    if (i > 1) {
        tmpField = sFieldName.substring(i + 1);
    }
    tmpField = tmpField.trim();
    return tmpField;
}







